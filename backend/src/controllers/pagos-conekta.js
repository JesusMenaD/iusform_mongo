/* eslint-disable camelcase */

const conekta = require('conekta');
const UsuarioModel = require('../models/Usuarios');
const ProductoModel = require('../models/Productos');
const VentasModel = require('../models/Ventas');
const DespachosModel = require('../models/Despachos');

const CONEKTA_API_KEY = process.env.CONEKTA_PRIVATE_KEY;
const DESPACHO_APP = process.env.DESPACHO_APP;

conekta.api_key = CONEKTA_API_KEY;
conekta.locale = 'es';

const createOrder = async (req, res) => {
  const { idProducto = null, usuario = null } = req.body;

  if (!idProducto) {
    return res.status(400).json({ message: 'No se encontró el producto' });
  }

  if (!usuario) {
    return res.status(400).json({ message: 'No se encontró el usuario' });
  }

  try {
    const usuarioFind = await UsuarioModel.findById(usuario);

    if (!usuarioFind) {
      return res.status(400).json({ message: 'No se encontró el usuario' });
    }

    const { conekta: conektaSave, nombre, apellidoPaterno, apellidoMaterno, telefono, email, despacho } = usuarioFind;

    const findProducto = await ProductoModel.findById(idProducto);

    if (!findProducto) {
      return res.status(400).json({ message: 'No se encontró el producto' });
    }

    const { pruebaGratis } = findProducto;

    // verificar si ya tiene una prueba gratis activa y no puede comprar

    if (pruebaGratis) {
      const findVenta = await VentasModel.findOne({
        producto: idProducto,
        despacho
      });

      if (findVenta) {
        return res.status(400).json({ message: 'Ya tienes una prueba gratis activa' });
      }
      const venta = await completarCompra({
        producto: findProducto,
        despacho,
        formaPago: '99',
        estatus: 'Pagado',
        usuario
      });

      return res.status(200).json({ venta, message: 'Prueba gratis activada' });
    }

    const cusomerId = conektaSave?.id || null;

    const customer = await customerFindOrCreate({
      nombre: `${nombre} ${apellidoPaterno} ${apellidoMaterno}`,
      email,
      telefono,
      id: cusomerId
    });

    if (!customer) {
      return res.status(400).json({ message: 'No se pudo crear el cliente' });
    }

    saveUsuarioConekta(usuario, customer);

    const hoy = new Date();
    const fecha = new Date(`${hoy.getFullYear()}-${hoy.getMonth() + 1}-${hoy.getDate()}`);
    fecha.setDate(fecha.getDate() + 1);
    const expiresAt = fecha.getTime() / 1000;

    const order = await conekta.Order.create({
      currency: 'MXN',
      customer_info: {
        customer_id: customer.id
      },
      line_items: await getItems({ idProducto }),
      checkout: {
        type: 'HostedPayment',
        success_url: `${DESPACHO_APP}/pago-exitoso`,
        failure_url: `${DESPACHO_APP}}/pago-fallido`,
        allowed_payment_methods: ['cash', 'card', 'bank_transfer'],
        multifactor_authentication: false,
        monthly_installments_enabled: false,
        expires_at: expiresAt,
        redirection_time: 4,
        name: findProducto?.tipo_producto || 'Producto'
      },
      shipping_contact: {
        phone: '+522213425514',
        receiver: 'psd',
        address: {
          street1: '102 poniente',
          country: 'MX',
          postal_code: '72200'
        }
      }
    });

    const ordernObj = order.toObject();
    const venta = await completarCompra({
      producto: findProducto,
      despacho,
      formaPago: '',
      idOrden: ordernObj.id,
      estatus: 'Pendiente',
      usuario
    });

    res.status(200).json({ orden: ordernObj, venta, message: 'Orden creada' });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const createCustomer = async ({ nombre, email, telefono }) => {
  const customer = await conekta.Customer.create({
    name: nombre,
    email,
    phone: telefono
  });

  return customer.toObject();
};

const getCustomer = async (id) => {
  try {
    const customer = await conekta.Customer.find(id);
    return customer.toObject();
  } catch (error) {
    return null;
  }
};

const customerFindOrCreate = async ({ nombre, email, telefono, id = null }) => {
  try {
    if (id) {
      return getCustomer(id);
    }

    return createCustomer({ nombre, email, telefono });
  } catch (error) {
    return null;
  }
};

const saveUsuarioConekta = async (usuario, customer) => {
  try {
    const usuarioFind = await UsuarioModel.findById(usuario);

    if (!usuarioFind) {
      return null;
    }

    usuarioFind.conekta.id = customer.id;
    await usuarioFind.save();

    return usuarioFind;
  } catch (error) {
    return null;
  }
};

const getItems = async ({ idProducto }) => {
  const producto = await ProductoModel.findById(idProducto);

  if (!producto) {
    return [];
  }

  const { nombre, precio, tasa } = producto;

  const nuevoPrecio = (precio + (precio * tasa)) * 100;

  return [{
    name: nombre,
    unit_price: nuevoPrecio,
    quantity: 1
  }];
};

const completarCompra = async ({ producto, despacho, formaPago = '99', idOrden = '', estatus = 'Pendiente', usuario }) => {
  try {
    const fecha = new Date();
    const { pruebaGratis = false, tiempo, cantidad } = producto;

    let importe = 0;

    if (!pruebaGratis) {
      importe = (producto.precio) + (producto.precio * producto.tasa);
    }

    const venta = {
      despacho,
      fechaVenta: fecha,
      producto: producto._id,
      importe,
      formaPago,
      estatus,
      referencia: idOrden,
      tipoReferencia: 'Conekta'
    };

    const ventaCreate = await VentasModel.create(venta);

    if (estatus === 'Pagado') {
      const { tipo_producto } = producto;

      if (tipo_producto === 'Paquete') { // paquete expedientes
        // enviar correo de confirmación

        const findDespacho = await DespachosModel.findById(despacho);

        const vigenciaExpedientes = new Date(findDespacho.contadorExp.vigencia);

        let nuevaVigencia = null;

        // si ya caduco tomar la fecha de hoy
        if (vigenciaExpedientes < fecha) {
          const fehaActual = new Date();

          nuevaVigencia = fehaActual;
        } else {
          nuevaVigencia = vigenciaExpedientes;
        }

        nuevaVigencia.setDate(nuevaVigencia.getDate() + tiempo); // sumarle el tiempo del paquete a la fecha de vigencia

        findDespacho.contadorExp.vigencia = nuevaVigencia;
        findDespacho.contadorExp.limite = cantidad;
        console.log(despacho.contadorTimbres);

        await findDespacho.save();

        // si aun no caduca tomar la fecha de vigencia y sumarle el tiempo del paquete
      } else if (tipo_producto === 'Plantilla') { // plantilla

        // enviar correo de confirmación

      } else if (tipo_producto === 'Timbres') { // timbres
        // enviar correo de confirmación

        const findDespacho = await DespachosModel.findById(despacho);

        const vigenciaTimbres = new Date(findDespacho.contadorTimbres.vigencia);

        let nuevaVigencia = null;

        // si ya caduco tomar la fecha de hoy
        if (vigenciaTimbres < fecha) {
          nuevaVigencia = fecha;
        } else {
          nuevaVigencia = vigenciaTimbres;
        }

        nuevaVigencia.setDate(nuevaVigencia.getDate() + tiempo); // sumarle el tiempo del paquete a la fecha de vigencia

        findDespacho.contadorTimbres.vigencia = nuevaVigencia;
        findDespacho.contadorTimbres.limite = cantidad;
        await findDespacho.save();
      }
    }

    return ventaCreate;
  } catch (error) {
    return null;
  }
};

const pagoFind = async (req, res) => {
  const { order_id, payment_status } = req.query;

  // if (!checkout_id) {
  //   return res.status(400).json({ message: 'No se encontró el checkout_id' });
  // }

  try {
    if (payment_status === 'paid') {
      const find = await VentasModel.findOne({ referencia: order_id, tipoReferencia: 'Conekta' });

      if (!find) {
        return res.status(400).json({ message: 'No se encontró la venta' });
      }

      if (find.estatus === 'Pagado') {
        const depachoFind = await DespachosModel.findById(find.despacho);

        return res.status(200).json({ message: 'Ya se ha pagado', despacho: depachoFind });
      }

      const { despacho } = find;

      find.estatus = 'Pagado';
      find.fecha_pago = new Date();
      await find.save();

      const despachoFind = await DespachosModel.findById(despacho);

      if (!despachoFind) {
        return res.status(400).json({ message: 'No se encontró el despacho' });
      }

      const productoFind = await ProductoModel.findById(find.producto);

      if (productoFind.tipo_producto === 'Paquete') { // paquete expedientes
        // enviar correo de confirmación

        const vigenciaExpedientes = new Date(despachoFind.contadorExp.vigencia);

        let nuevaVigencia = null;

        // si ya caduco tomar la fecha de hoy
        if (vigenciaExpedientes < find.fecha_pago) {
          const fehaActual = new Date();

          nuevaVigencia = fehaActual;
        } else {
          nuevaVigencia = vigenciaExpedientes;
        }

        nuevaVigencia.setDate(nuevaVigencia.getDate() + productoFind.tiempo); // sumarle el tiempo del paquete a la fecha de vigencia

        despachoFind.contadorExp.vigencia = nuevaVigencia;
        despachoFind.contadorExp.limite = productoFind.cantidad;
        console.log(despacho.contadorTimbres);

        await despachoFind.save();

        // si aun no caduca tomar la fecha de vigencia y sumarle el tiempo del paquete
      } else if (productoFind.tipo_producto === 'Plantilla') { // plantilla

        // enviar correo de confirmación

      } else if (productoFind.tipo_producto === 'Timbres') { // timbres
        // enviar correo de confirmación

        const vigenciaTimbres = new Date(despachoFind.contadorTimbres.vigencia);

        let nuevaVigencia = null;

        // si ya caduco tomar la fecha de hoy
        if (vigenciaTimbres < find.fecha_pago) {
          nuevaVigencia = find.fecha_pago;
        } else {
          nuevaVigencia = vigenciaTimbres;
        }

        nuevaVigencia.setDate(nuevaVigencia.getDate() + productoFind.tiempo); // sumarle el tiempo del paquete a la fecha de vigencia

        despachoFind.contadorTimbres.vigencia = nuevaVigencia;
        despachoFind.contadorTimbres.limite = productoFind.cantidad;
        console.log(despachoFind.contadorTimbres);
        await despachoFind.save();
      }
      return res.status(200).json({ payment_status, order_id, message: 'Pago encontrado', despacho: despachoFind });
    }
    return res.status(200).json({ payment_status, order_id, message: 'Pago no encontrado' });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  createOrder,
  pagoFind
};

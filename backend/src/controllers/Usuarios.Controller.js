import UsuariosModel from '../models/Usuarios.js';
import TipoUsuarioModel from '../models/TipoUsuarios.js';
import DespachoModel from '../models/Despachos.js';
import productoModel from '../models/Productos.js';
import SuscripcionesModel from '../models/Suscripciones.js';
import VentasSchema from '../models/Ventas.js';
import fs from 'fs';
import path from 'path';
import { validarPassword, generatePassword, encriptar, desencriptar, deleteFile } from '../config/FuntionGlobal.js';
import { sendMail } from '../config/mail.js';
import { RegistroUsuarioHTML } from '../Mail/RegistroUsuarioHTML.js';
const APP_URL = process.env.APP_URL;

export const login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    const userFind = await UsuariosModel.findOne({ email: correo, estatus: 'Activo' }).populate('despacho');

    if (!userFind) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const passwordValid = validarPassword(password, userFind.password);

    if (!passwordValid) {
      return res.status(404).json({ message: 'Contraseña incorrecta' });
    }

    userFind.password = desencriptar(userFind.password);

    if (userFind.foto !== '' && fs.existsSync(path.join('src/uploads/usuarios', userFind.foto))) {
      userFind.foto = `${APP_URL}/uploads/usuarios/${userFind.foto}`;
    } else {
      userFind.foto = `${APP_URL}/uploads/default/icono_usuario_100x100_04.jpg`;
    }

    res.status(200).json({ message: 'Usuario logeado', data: userFind });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const fecha = new Date();
    const {
      nombre,
      apellidoPaterno = '',
      apellidoMaterno = '',
      telefono = '',
      email = '',
      tipoUsuario = '',
      producto,
      formaPago
    } = req.body;

    if (tipoUsuario === 'despacho') {
      if (!producto || !formaPago) {
        return res.status(400).json({ message: 'Falta el producto o forma de pago' });
      }
    }

    let objDespacho = {}; // ? objeto para guardar los datos del despacho
    let precioProducto = 0; // ? precio del producto

    const objUser = {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      telefono,
      email
    };

    if (!nombre || !email || !tipoUsuario) {
      return res.status(400).json({ message: 'Faltan datos' });
    }

    const findEmailExist = await UsuariosModel.findOne({
      email
    });

    if (findEmailExist) {
      return res.status(400).json({ message: 'El correo ya existe' });
    }
    // ? buscamos el id del tipo de usuario que se esta registrando
    if (tipoUsuario === 'admin') {
      objUser.tipo = 'admin';
      const findTipoUsuarioAdmin = await TipoUsuarioModel.findOne({ tipo: 'admin' });
      // ? si no existe el tipo de usuario admin lo creamos

      if (!findTipoUsuarioAdmin) {
        return res.status(400).json({ message: 'No existe el tipo de usuario admin' });
      } else {
        objUser.tipoUsuario = findTipoUsuarioAdmin._id;
      }
    } else if (tipoUsuario === 'despacho') {
      // ? buscamos el id del tipo de usuario que se esta registrando
      objUser.tipo = 'despacho';

      const findTipoUsuarioDespacho = await TipoUsuarioModel.findOne({ tipo: 'despacho' });

      if (!findTipoUsuarioDespacho) {
        return res.status(400).json({ message: 'No existe el tipo de usuario despacho' });
      } else {
        const findProducto = await productoModel.findById(producto);

        if (!findProducto) {
          return res.status(400).json({ message: 'No existe el producto' });
        }

        const { precio, cantidad } = findProducto; // ? obtenemos el precio y la cantidad del producto
        precioProducto = precio;
        // ? Vigencia de la cuenta un mes mas a la fecha actual
        const vigencia = fecha.setMonth(fecha.getMonth() + 1);

        const contadorExp = {
          contador: 0,
          limite: cantidad,
          vigencia
        };

        objDespacho = {
          contadorExp,
          correo: email,
          telefono
        };

        objUser.tipoUsuario = findTipoUsuarioDespacho._id;
      }
    }

    const passwordGenerate = generatePassword();

    const passwordEncrypt = encriptar(passwordGenerate);

    objUser.password = passwordEncrypt;

    const userSave = await UsuariosModel.create(objUser);

    const htmlRegistro = RegistroUsuarioHTML(nombre, email, passwordGenerate);

    sendMail(htmlRegistro, 'Registro de usuario', email);

    if (tipoUsuario === 'despacho') { // ? si el usuario es de tipo despacho guardamos los datos del despacho
      objDespacho.creadoPor = userSave._id;

      const despachoCreate = await DespachoModel.create(objDespacho);

      const suscripcion = { // ? creamos el objeto de la suscripción
        despacho: despachoCreate._id,
        fechaFin: fecha.setMonth(fecha.getMonth() + 1),
        fechaInicio: fecha,
        estatus: 'Vigente',
        creadoPor: userSave._id,
        producto, // ? id del producto
        precio: precioProducto,
        observaciones: 'Se adquirió el producto por primera vez'
      };

      await SuscripcionesModel.create(suscripcion);

      const userDespacho = await UsuariosModel.findByIdAndUpdate(userSave._id, { despacho: despachoCreate._id });

      const venta = {
        despacho: despachoCreate._id,
        fechaVenta: fecha,
        producto,
        importe: precioProducto,
        fecha_pago: fecha,
        formaPago,
        estatus: 'Pagado'
      };

      await VentasSchema.create(venta);

      res.status(201).json({ message: 'Usuario creado', data: userDespacho, despacho: despachoCreate });
    } else {
      res.status(201).json({ message: 'Usuario creado', data: userSave });
    }
  } catch (error) {
    res.status(404).json({ message: error.message, line_error: error.stack });
  }
};

export const rememberPassword = async (req, res) => {
  try {
    const { correo } = req.body;

    if (!correo) {
      return res.status(400).json({ message: 'Falta el correo' });
    }

    const findUser = await UsuariosModel.findOne({ email: correo, estatus: 'Activo' });

    if (!findUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const password = desencriptar(findUser.password);

    const nombreCompleto = `${findUser.nombre} ${findUser.apellidoPaterno} ${findUser.apellidoMaterno}`;

    const htmlRegistro = RegistroUsuarioHTML(nombreCompleto, correo, password);

    sendMail(htmlRegistro, 'Recordatorio de contraseña', correo);

    res.status(200).json({ message: 'Correo enviado' });

    if (!findUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(404).json({ message: error.message, line_error: error.stack });
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const { filename } = req.file;
    const {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      telefono,
      email,
      password
    } = req.body;

    const objUser = {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      telefono,
      email
    };

    if (password) {
      const passwordEncrypt = encriptar(password);
      objUser.password = passwordEncrypt;
    }

    // Si se sube una foto, se guarda el nombre de la foto en el objeto
    if (filename) {
      objUser.foto = filename;
    }

    // Actualizar el usuario sin devolver el objeto actualizado
    const objAntes = await UsuariosModel.findByIdAndUpdate(id, objUser);

    if (!objAntes) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (objAntes.foto !== '') {
      const folderPath = path.join('src/uploads/usuarios', objAntes.foto);
      deleteFile(folderPath);
    }

    // Buscar y devolver el objeto actualizado
    const userUpdate = await UsuariosModel.findById(id).populate('despacho');

    if (!userUpdate) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (userUpdate.foto !== '') {
      userUpdate.foto = `${APP_URL}/uploads/usuarios/${userUpdate.foto}`;
    } else {
      userUpdate.foto = `${APP_URL}/uploads/default/icono_usuario_100x100_04.jpg`;
    }

    userUpdate.password = desencriptar(userUpdate.password);

    res.status(200).json({ message: 'Usuario actualizado', data: userUpdate });
  } catch (error) {
    res.status(404).json({ message: error.message, line_error: error.stack });
  }
};

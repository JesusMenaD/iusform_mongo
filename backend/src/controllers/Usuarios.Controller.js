const UsuariosModel = require('../models/Usuarios.js');
const TipoUsuarioModel = require('../models/TipoUsuarios.js');
const DespachoModel = require('../models/Despachos.js');
const productoModel = require('../models/Productos.js');
const SuscripcionesModel = require('../models/Suscripciones.js');
const VentasSchema = require('../models/Ventas.js');
const ModulosSchema = require('../models/Modulos.js');
const TipoUsuario = require('../models/TipoUsuarios.js');

const fs = require('fs');
const path = require('path');
const { validarPassword, generatePassword, encriptar, desencriptar, deleteFile } = require('../config/FuntionGlobal.js');
const { sendMail } = require('../config/mail.js');
const { RegistroUsuarioHTML } = require('../Mail/RegistroUsuarioHTML.js');
const APP_URL = process.env.APP_URL;
const DESPACHO_APP = process.env.DESPACHO_APP;

const login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    const userFind = await UsuariosModel.findOne({ email: correo, estatus: 'Activo' }).populate('despacho');

    if (!userFind) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    console.log(desencriptar(userFind.password));

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

    if (userFind.despacho && userFind.despacho.logo) {
      userFind.despacho.logo = `${APP_URL}/uploads/despachos/${userFind.despacho.logo}`;
    }

    res.status(200).json({ message: 'Usuario logeado', data: userFind });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const register = async (req, res) => {
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
      formaPago,
      clave,
      estado
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
      email,
      clave
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
          telefono,
          estado
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

      const findModulos = await ModulosSchema.find({ estatus: 'Activo', tipo: 'despacho' });

      const objTipoUsuario = {
        nombre: 'Administrador',
        tipo: 'despacho',
        despacho: despachoCreate._id,
        modulos: findModulos.map(modulo => {
          return {
            modulo: modulo._id,
            permisos: {
              create: true,
              read: true,
              update: true,
              delete: true,
              download: true
            }
          };
        })
      };

      await TipoUsuario.create(objTipoUsuario);

      // generar modulos para el despacho

      res.status(201).json({ message: 'Usuario creado', data: userDespacho, despacho: despachoCreate });
    } else {
      res.status(201).json({ message: 'Usuario creado', data: userSave });
    }
  } catch (error) {
    res.status(404).json({ message: error.message, line_error: error.stack });
  }
};

const rememberPassword = async (req, res) => {
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

const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const filename = req?.file?.filename ?? null;

    const {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      telefono,
      email,
      password
    } = req.body;

    const passwordEncrypt = encriptar(password);

    // Actualizar el usuario sin devolver el objeto actualizado
    const objAntes = await UsuariosModel.findById(id);

    if (!objAntes) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (filename !== null && objAntes.foto !== '') {
      const folderPath = path.join('src/uploads/usuarios', objAntes.foto);
      deleteFile(folderPath);
    }

    objAntes.nombre = nombre ?? objAntes.nombre;
    objAntes.apellidoPaterno = apellidoPaterno ?? objAntes.apellidoPaterno;
    objAntes.apellidoMaterno = apellidoMaterno ?? objAntes.apellidoMaterno;
    objAntes.telefono = telefono ?? objAntes.telefono;
    objAntes.email = email ?? objAntes.email;
    objAntes.password = passwordEncrypt ?? objAntes.password;
    objAntes.foto = filename ?? objAntes.foto;

    await objAntes.save();

    // Buscar y devolver el objeto actualizado
    const userUpdate = await UsuariosModel.findById(id).populate('despacho');

    if (userUpdate.foto !== '') {
      userUpdate.foto = `${APP_URL}/uploads/usuarios/${userUpdate.foto}`;
    } else {
      userUpdate.foto = `${APP_URL}/uploads/default/icono_usuario_100x100_04.jpg`;
    }

    if (userUpdate.despacho && userUpdate.despacho.logo) {
      userUpdate.despacho.logo = `${APP_URL}/uploads/despachos/${userUpdate.despacho.logo}`;
    }

    userUpdate.password = desencriptar(userUpdate.password);

    res.status(200).json({ message: 'Usuario actualizado', data: userUpdate });
  } catch (error) {
    res.status(404).json({ message: error.message, line_error: error.stack });
  }
};

const obtenerUsuarios = async (req, res) => {
  try {
    const { page = 1, search = '', estatus = '' } = req.query;
    const { despacho } = req.params;

    if (!despacho) {
      return res.status(400).json({ message: 'Falta el despacho' });
    }

    const limit = 10;

    const options = {
      page,
      limit,
      sort: {
        estatus: 1,
        nombre: 1
      },
      populate: 'tipoUsuario'

    };

    const query = {
      despacho,
      tipo: 'despacho'
    };

    if (estatus) {
      query.estatus = estatus;
    }

    if (search) {
      query.$or = [
        { nombre: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { telefono: { $regex: search, $options: 'i' } },
        { apellidoPaterno: { $regex: search, $options: 'i' } },
        { apellidoMaterno: { $regex: search, $options: 'i' } }
      ];
    }

    const usuarios = await UsuariosModel.paginate(query, options);

    usuarios.docs = usuarios.docs.map(user => {
      if (user.foto !== '' && fs.existsSync(path.join('src/uploads/usuarios', user.foto))) {
        user.foto = `${APP_URL}/uploads/usuarios/${user.foto}`;
      } else {
        user.foto = `${APP_URL}/uploads/default/icono_usuario_100x100_04.jpg`;
      }

      return user;
    });

    res.status(200).json({ usuarios });
  } catch (error) {
    res.status(404).json({ message: error.message, line_error: error.stack });
  }
};

const createUsuarioDespacho = async (req, res) => {
  try {
    const { despacho } = req.params;
    const { nombre, apellidoPaterno, apellidoMaterno, telefono, email, tipoUsuario, clave } = req.body;

    if (!despacho) {
      return res.status(400).json({ message: 'Falta el despacho' });
    }

    if (!nombre || !email || !tipoUsuario || !clave) {
      return res.status(400).json({ message: 'Faltan datos' });
    }

    const objUser = {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      telefono,
      email,
      tipo: 'despacho',
      despacho,
      clave,
      estatus: 'Activo',
      tipoUsuario
    };

    const findEmailExist = await UsuariosModel.findOne({
      email
    });

    if (findEmailExist) {
      return res.status(400).json({ message: 'El correo ya existe' });
    }

    const passwordSin = generatePassword();
    const passwordEncrypt = encriptar(passwordSin);
    objUser.password = passwordEncrypt;
    const userSave = await UsuariosModel.create(objUser);

    // enviar correo con la contraseña
    const htmlRegistro = RegistroUsuarioHTML(nombre, email.trim(), passwordSin, `${DESPACHO_APP}/login`);
    sendMail(htmlRegistro, 'Registro de usuario', email);
    res.status(201).json({ message: 'Usuario creado', data: userSave });
  } catch (error) {
    res.status(404).json({ message: error.message, line_error: error.stack });
  }
};

const obtenerUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UsuariosModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    // if (user.foto !== '' && fs.existsSync(path.join('src/uploads/usuarios', user.foto))) {
    //   user.foto = `${APP_URL}/uploads/usuarios/${user.foto}`;
    // } else {
    //   user.foto = `${APP_URL}/uploads/default/icono_usuario_100x100_04.jpg`;
    // }

    // if (user.despacho && user.despacho.logo) {
    //   user.despacho.logo = `${APP_URL}/uploads/despachos/${user.despacho.logo}`;
    // }

    user.password = desencriptar(user.password);

    res.status(200).json({ message: 'Usuario encontrado', data: user });
  } catch (error) {
    res.status(404).json({ message: error.message, line_error: error.stack });
  }
};

const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      telefono,
      email,
      tipoUsuario,
      estatus
    } = req.body;

    const objUser = {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      telefono,
      email,
      tipoUsuario,
      estatus
    };

    const objAntes = await UsuariosModel.findByIdAndUpdate(id, objUser);

    if (!objAntes) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario actualizado' });
  } catch (error) {
    res.status(404).json({ message: error.message, line_error: error.stack });
  }
};

const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UsuariosModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    user.estatus = 'Inactivo';
    await user.save();
    // if (!user) {
    //   return res.status(404).json({ message: 'Usuario no encontrado' });
    // }
    // if (user.foto !== '' && fs.existsSync(path.join('src/uploads/usuarios', user.foto))) {
    //   const folderPath = path.join('src/uploads/usuarios', user.foto);
    //   deleteFile(folderPath);
    // }

    // await UsuariosModel.findByIdAndDelete(id);
    res.status(200).json({ message: 'Se modifico el estatus del usuario' });
  } catch (error) {
    res.status(404).json({ message: error.message, line_error: error.stack });
  }
};

const cargaUsuario = async (req, res) => {
  try {
    const { usuario } = req.params;

    if (!usuario) {
      return res.status(400).json({ message: 'Falta el usuario' });
    }

    const userFind = await UsuariosModel.findOne({ _id: usuario, estatus: 'Activo' }).populate('despacho');

    if (!userFind) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    userFind.password = desencriptar(userFind.password);

    if (userFind.foto !== '' && fs.existsSync(path.join('src/uploads/usuarios', userFind.foto))) {
      userFind.foto = `${APP_URL}/uploads/usuarios/${userFind.foto}`;
    } else {
      userFind.foto = `${APP_URL}/uploads/default/icono_usuario_100x100_04.jpg`;
    }

    if (userFind.despacho && userFind.despacho.logo) {
      userFind.despacho.logo = `${APP_URL}/uploads/despachos/${userFind.despacho.logo}`;
    }

    res.status(200).json({ message: 'Usuario logeado', data: userFind });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  login,
  register,
  rememberPassword,
  actualizarUsuario,
  obtenerUsuarios,
  createUsuarioDespacho,
  obtenerUsuario,
  updateUsuario,
  deleteUsuario,
  cargaUsuario
};

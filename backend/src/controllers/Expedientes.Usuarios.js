import ExpedientesUsuariosModel from '../models/ExpedientesUsuarios.js';
import UsuarioModel from '../models/Usuarios.js';
import ExpedienteModel from '../models/Expedientes.js';
import { InvitacionExpedienteHTML } from '../Mail/InvitacionExpedienteHTML.js';
import { sendMail } from '../config/mail.js';

import fs from 'fs';
import path from 'path';
const APP_URL = process.env.APP_URL;

export const getUsuarios = async (req, res) => {
  const { despacho, expediente } = req.params;
  const { page = 1 } = req.query;

  const options = {
    page,
    limit: 20,
    populate: {
      path: 'usuario',
      select: 'nombre apellidoPaterno apellidoMaterno email foto'
    },
    sort: {
      rol: 1
    },
    select: 'usuario rol notificaciones'
  };

  if (!despacho) {
    return res.status(400).json({ message: 'El despacho es requerido' });
  }

  if (!expediente) {
    return res.status(400).json({ message: 'El expediente es requerido' });
  }

  const query = { despacho, expediente };

  try {
    const usuarios = await ExpedientesUsuariosModel.paginate(query, options);

    usuarios.docs.forEach(usuario => {
      if (usuario.usuario.foto !== '' && fs.existsSync(path.join('src/uploads/usuarios', usuario.usuario.foto))) {
        usuario.usuario.foto = `${APP_URL}/uploads/usuarios/${usuario.usuario.foto}`;
      } else {
        usuario.usuario.foto = `${APP_URL}/uploads/default/icono_usuario_100x100_04.jpg`;
      }
    });

    res.status(200).json({ usuarios });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUsuarioExpedienteSinAsignar = async (req, res) => {
  const { despacho, expediente } = req.params;

  if (!despacho) {
    return res.status(400).json({ message: 'El despacho es requerido' });
  }

  if (!expediente) {
    return res.status(400).json({ message: 'El expediente es requerido' });
  }

  const query = {
    estatus: 'Activo',
    despacho
  };

  try {
    const findUsuariosActivos = await UsuarioModel.find(query)
      .select(['_id', 'nombre', 'apellidoPaterno', 'apellidoMaterno', 'email']).sort({ nombre: 1 });

    const queryEU = {
      despacho,
      expediente
    };
    const findUsuariosAsignados = await ExpedientesUsuariosModel.find(queryEU);

    const usuarios = findUsuariosActivos.filter(usuario => {
      return !findUsuariosAsignados.some(usuarioAsignado => usuarioAsignado.usuario.equals(usuario._id));
    });

    res.status(200).json({ usuarios });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteUsuarioExpediente = async (req, res) => {
  try {
    const { _id } = req.params;

    const usuarioExpediente = await ExpedientesUsuariosModel.findByIdAndDelete(_id);

    if (!usuarioExpediente) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUsuariosExpediente = async (req, res) => {
  try {
    const { despacho, expediente } = req.params;

    const { usuarios: usuariosIDS = [], rol = 'Editor', notificaciones = true } = req.body;

    if (!despacho) {
      return res.status(400).json({ message: 'El despacho es requerido' });
    }

    if (!expediente) {
      return res.status(400).json({ message: 'El expediente es requerido' });
    }

    if (!usuariosIDS.length) {
      return res.status(400).json({ message: 'Los usuarios son requeridos' });
    }

    const usuariosObjExpedientes = usuariosIDS.map(usuario => {
      return {
        despacho,
        expediente,
        usuario,
        rol,
        notificaciones
      };
    });

    const usuariosExpedientes = await ExpedientesUsuariosModel.insertMany(usuariosObjExpedientes);

    const findUsuarios = await UsuarioModel.find({ _id: { $in: usuariosIDS } }).select('email nombre apellidoPaterno apellidoMaterno, clave');
    const findExpediente = await ExpedienteModel.findById(expediente).select('titulo');

    if (!findExpediente) {
      return res.status(404).json({ message: 'Expediente no encontrado' });
    }

    const { titulo: nombreExpediente } = findExpediente;

    findUsuarios.forEach(usuario => {
      const { email, nombre = '', apellidoPaterno = '', apellidoMaterno = '', clave } = usuario;

      const html = InvitacionExpedienteHTML({
        nombreDestinatario: `${nombre} ${apellidoPaterno} ${apellidoMaterno}`,
        nombreExpediente,
        enlaceExpediente: `${APP_URL}/${clave}/expedientes/${expediente}/editar`
      });

      sendMail(html, 'Invitación a expediente', email);
    });

    res.status(201).json({ usuariosExpedientes });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getUsuariosExpedienteSinPaginar = async (req, res) => {
  const { despacho, expediente } = req.params;
  const { sin } = req.query;

  if (!despacho) {
    return res.status(400).json({ message: 'El despacho es requerido' });
  }

  if (!expediente) {
    return res.status(400).json({ message: 'El expediente es requerido' });
  }

  const query = { despacho, expediente };

  if (sin) {
    query.usuario = { $ne: sin };
  }
  try {
    const usuarios = await ExpedientesUsuariosModel.find(query).populate('usuario', 'nombre apellidoPaterno apellidoMaterno email foto');

    usuarios.forEach(usuario => {
      if (usuario.usuario.foto !== '' && fs.existsSync(path.join('src/uploads/usuarios', usuario.usuario.foto))) {
        usuario.usuario.foto = `${APP_URL}/uploads/usuarios/${usuario.usuario.foto}`;
      } else {
        usuario.usuario.foto = `${APP_URL}/uploads/default/icono_usuario_100x100_04.jpg`;
      }
    });

    res.status(200).json({ usuarios });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

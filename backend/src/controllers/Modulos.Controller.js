const UsuarioModel = require('../models/Usuarios.js');
const TipoUsuarioModel = require('../models/TipoUsuarios.js');
const APP_URL = process.env.APP_URL;

const getModulos = async (req, res) => {
  try {
    // const { tipo, estatus = 'Activo' } = req.query;
    const { usuario } = req.params;

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const findUsuario = await UsuarioModel.findById(usuario);

    if (!findUsuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const { clave, tipoUsuario } = findUsuario;

    const tipoUsuarioModulos = await TipoUsuarioModel.findById(tipoUsuario).populate({
      path: 'modulos.modulo',
      sort: { orden: 1 },
      model: 'modulos',
      // match: { estatus: 'Activo' },
      select: 'nombre imagen enlace padre estatus'
    });

    // return res.status(200).json({ data: tipoUsuarioModulos.modulos });

    const data = tipoUsuarioModulos.modulos.map((modulo) => {
      if (modulo === null || modulo?.modulo === null || modulo?.modulo?.estatus === 'Inactivo') return null;

      return {
        _id: modulo.modulo._id,
        nombre: modulo.modulo.nombre,
        orden: modulo.modulo.orden,
        estatus: modulo.modulo.estatus,
        tipo: modulo.modulo.tipo,
        imagen: modulo.modulo.imagen,
        enlace: modulo.modulo.enlace,
        padre: modulo.modulo.padre,
        permisos: modulo.permisos
      };
    }).filter((modulo) => modulo !== null);

    const modulosPadre = data.filter((modulo) => modulo.padre === '');

    const modulos = modulosPadre.map((modulo) => {
      return {
        ...modulo,
        child: data.filter((hijo) => {
          return hijo.padre === modulo.enlace;
        })
      };
    });

    modulos.forEach((modulo) => {
      modulo.imagen = `${APP_URL}/uploads/modules/white/${modulo.imagen}`;
      modulo.enlace = `/${clave}${modulo.enlace}`;
      modulo.padre = modulo.padre === '' ? '' : `/${clave}${modulo.padre}`;
      modulo.child.forEach((hijo) => {
        hijo.imagen = `${APP_URL}/uploads/modules/white/${hijo.imagen}`;
        hijo.enlace = `/${clave}${hijo.enlace}`;
        hijo.padre = `/${clave}${hijo.padre}`;
      });
    });

    res.status(200).json({ data: modulos });
  } catch (error) {
    console.log(error.message, error.stack);
    res.status(404).json({ message: error.message, line_error: error.stack });
  }
};

module.exports = {
  getModulos
};

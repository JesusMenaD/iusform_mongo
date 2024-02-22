import UsuarioModel from '../models/Usuarios.js';

const APP_URL = process.env.APP_URL;
export const getModulos = async (req, res) => {
  try {
    const { tipo, estatus = 'Activo' } = req.query;
    const { usuario } = req.params;

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Establecer el valor por defecto para estatus
    const query = { estatus };

    // Agregar tipo a la consulta si está presente
    if (tipo) {
      query.tipo = tipo.trim();
    }

    const findUsuario = await UsuarioModel.findById(usuario).populate({
      path: 'tipoUsuario',
      populate: {
        path: 'modulos.modulo',
        model: 'modulos',
        // ahora ordenar de forma ascendente campo orden
        sort: { orden: 1 }
      }
    });

    if (!findUsuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const { clave, tipoUsuario: moduloUsuario } = findUsuario;

    const findModulos = moduloUsuario.modulos;

    const newModulos = findModulos.map((modulo) => {
      return {
        _id: modulo.modulo._id,
        nombre: modulo.modulo.nombre,
        orden: modulo.modulo.orden,
        estatus: modulo.modulo.estatus,
        tipo: modulo.modulo.tipo,
        imagen: `${APP_URL}/uploads/modules/white/${modulo.modulo.imagen}`,
        enlace: `/${clave}${modulo.modulo.enlace}`,
        padre: modulo.modulo.padre === '' ? '' : `/${clave}${modulo.modulo.padre}`,
        permisos: modulo.permisos
      };
    });

    const modulosPadre = newModulos.filter((modulo) => modulo.padre === '');

    const modulos = modulosPadre.map((modulo) => {
      return {
        ...modulo,
        child: newModulos.filter((hijo) => hijo.padre === modulo.enlace)
      };
    });

    res.status(200).json({ data: modulos });
  } catch (error) {
    res.status(404).json({ message: error.message, line_error: error.stack });
  }
};

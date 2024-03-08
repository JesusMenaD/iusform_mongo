import UsuarioModel from '../models/Usuarios.js';
import TipoUsuarioModel from '../models/TipoUsuarios.js';

const APP_URL = process.env.APP_URL;

export const getModulos = async (req, res) => {
  try {
    const { tipo, estatus = 'Activo' } = req.query;
    const { usuario, despacho } = req.params;

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Establecer el valor por defecto para estatus
    const query = {
      estatus,
      despacho
    };

    // Agregar tipo a la consulta si está presente
    if (tipo) {
      query.tipo = tipo.trim();
    }

    const findUsuario = await UsuarioModel.findById(usuario);
    const { clave } = findUsuario;

    const tipoUsuarioModulos = await TipoUsuarioModel.findOne(query).populate({
      path: 'modulos.modulo',
      // ahora ordenar de forma ascendente campo orden
      sort: { orden: 1 },
      model: 'modulos',
      select: 'nombre imagen enlace padre'
    });

    const data = tipoUsuarioModulos.modulos.map((modulo) => {
      if (modulo.modulo === null) {
        return null;
      }
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

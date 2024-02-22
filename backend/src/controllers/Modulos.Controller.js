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

    findModulos.forEach((modulo) => {
      modulo.modulo.imagen = `${APP_URL}/uploads/modules/white/${modulo.modulo.imagen}`;
      modulo.modulo.enlace = `/${clave}${modulo.modulo.enlace}`;
      modulo.modulo.padre = modulo.modulo.padre !== '' ? `/${clave}${modulo.modulo.padre}` : '';
    });

    const modulos = findModulos.map((modulo) => {
      if (modulo.modulo.padre === '') {
        return modulo.modulo;
      } else {
        return null;
      }
    }).filter(modulo => modulo !== null); // Eliminar los elementos nulos del array

    const modulosConHijos = modulos.map((modulo) => {
      const child2 = findModulos.filter((hijo) => {
        return hijo.modulo.padre === modulo.enlace;
      });

      const child = [];

      if (child2.length > 0) {
        child2.forEach((hijo) => {
          child.push(hijo.modulo);
        });
      }

      return { ...modulo._doc, child };
    });

    res.status(200).json({ data: modulosConHijos });
  } catch (error) {
    res.status(404).json({ message: error.message, line_error: error.stack });
  }
};

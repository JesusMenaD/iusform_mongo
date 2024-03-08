import TipoUsuarios from '../models/TipoUsuarios.js';
const APP_URL = process.env.APP_URL;
export const getTipoUsuarios = async (req, res) => {
  const { despacho } = req.params;
  const { page = 1 } = req.query;

  const options = {
    page,
    limit: 20,
    populate: 'modulos.modulo'
    // sort: { nombre: 1 }
  };

  if (!despacho) {
    return res.status(400).json({ message: 'El despacho es requerido' });
  }

  const query = {
    despacho
  };

  try {
    const findTipoUsuarios = await TipoUsuarios.paginate(query, options);
    findTipoUsuarios.docs.forEach(tipoUsuario => {
      tipoUsuario.modulos.forEach(modulo => {
        if (modulo?.modulo?.imagen == null || modulo?.modulo?.imagen === undefined) {
          console.log('no existe imagen');
        } else {
          modulo.modulo.imagen = `${APP_URL}/uploads/modules/white/${modulo.modulo.imagen}`;
        }
        // modulo.modulo.imagen = `${APP_URL}/uploads/modules/white/${modulo.modulo.imagen}`;
      });
    });

    res.status(200).json({ tipoUsuarios: findTipoUsuarios });
  } catch (error) {
    console.log('error', error);
    res.status(404).json({ message: error.message });
  }
};

export const getTipoUsuarioById = async (req, res) => {
  const { _id } = req.params;
  try {
    const tipoUsuario = await TipoUsuarios.findById(_id).populate('modulos.modulo');
    if (!tipoUsuario) return res.status(404).json({ message: 'No se encontró el tipo de usuario' });

    res.status(200).json({ tipoUsuario });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

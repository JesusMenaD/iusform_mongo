import Juzgados from '../models/Juzgados.js';

export const getJuzgados = async (req, res) => {
  try {
    const { estatus, estado, page = 1 } = req.query;

    const options = {
      page,
      limit: 10,
      sort: { nombre: 1 }
    };

    const query = {};

    if (estatus) {
      query.estatus = estatus;
    }

    if (estado) {
      query.estado = estado;
    }

    const juzgados = await Juzgados.paginate(query, options);

    res.status(200).json({ juzgados });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const Juzgados = require('../models/Juzgados.js');

const getJuzgados = async (req, res) => {
  try {
    const { estatus, estado, page = 1 } = req.query;

    const options = {
      page,
      limit: 40,
      sort: { nombre: 1 },
      populate: {
        path: 'estado',
        select: 'nombre'
      }
    };

    const query = {};

    if (estatus) {
      query.estatus = estatus;
    }

    if (estado) {
      query.estado = estado;
    } else {
      // puebla
      query.estado = '65d3c9132141bccfaefbd2c7';
    }

    const juzgados = await Juzgados.paginate(query, options);

    res.status(200).json({ juzgados });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getJuzgados
};

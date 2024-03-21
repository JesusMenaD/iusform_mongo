const LegislacionesModel = require('../models/LegislacionesReglamentos.js');

const getLegislaciones = async (req, res) => {
  const { page = 1, search, estado } = req.query;
  const options = {
    page,
    limit: 20,
    sort: { nombre: 1 },
    populate: 'estado'
  };

  const query = {
    estatus: 'Activo'
  };

  if (search) {
    query.$or = [
      { nombre: { $regex: search, $options: 'i' } }
    ];
  }

  if (estado) {
    query.estado = estado;
  }

  try {
    const findLegislaciones = await LegislacionesModel.paginate(query, options);
    res.status(200).json({ legislaciones: findLegislaciones });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getLegislaciones
};

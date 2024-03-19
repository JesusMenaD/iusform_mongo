const etapasProcesalesModel = require('../models/EtapasProcesales.js');

const getEtapasProcesales = async (req, res) => {
  const { estatus, page = 1, materia } = req.query;

  const options = {
    page,
    limit: 50,
    sort: { nombre: 1 }
  };

  try {
    const query = {};

    if (estatus) query.estatus = estatus;

    if (materia) query.materia = materia;

    const etapasProcesales = await etapasProcesalesModel.paginate(query, options);
    res.status(200).json({ etapasProcesales });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getEtapasProcesalesSinPagina = async (req, res) => {
  const { estatus, materia } = req.query;

  try {
    const query = {};

    if (estatus) query.estatus = estatus;

    if (materia) query.materia = materia;

    const etapasProcesales = await etapasProcesalesModel.find(query);
    res.status(200).json({ etapasProcesales });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getEtapasProcesales,
  getEtapasProcesalesSinPagina
};

import etapasProcesalesModel from '../models/EtapasProcesales.js';

export const getEtapasProcesales = async (req, res) => {
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

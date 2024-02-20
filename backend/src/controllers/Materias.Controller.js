import MateriasModel from '../models/Materias.js';

export const getMaterias = async (req, res) => {
  const { estatus, page = 1 } = req.query;

  const options = {
    page,
    limit: 50,
    sort: { nombre: 1 }
  };

  try {
    const query = {};

    if (estatus) {
      query.estatus = estatus;
    }

    const materias = await MateriasModel.paginate(query, options);
    res.status(200).json(materias);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

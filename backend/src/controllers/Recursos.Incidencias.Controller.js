const RecursosIncidenciasModel = require('../models/RecursosIncidencias.js');

const getRecursosIncidenciasMateria = async (req, res) => {
  const { materia } = req.params;
  // const { tipo } = req.query;

  if (!materia) {
    return res.status(400).json({ message: 'No se ha enviado la materia' });
  }

  try {
    const query = {
      materia,
      estatus: 'Activo'
    };

    const recursosIncidencias = await RecursosIncidenciasModel.find(query);

    res.status(201).json({
      message: 'Recursos incidencias encontrados',
      data: recursosIncidencias
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

module.exports = {
  getRecursosIncidenciasMateria
};

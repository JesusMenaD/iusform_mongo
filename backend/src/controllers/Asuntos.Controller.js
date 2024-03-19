const AsuntosModel = require('../models/Asuntos.js');

const createAsuntos = async (req, res) => {
  try {
    const { despacho } = req.params;
    const { nombre, descripcion } = req.body;

    if (!despacho) {
      return res.status(400).json({ message: 'El despacho es requerido' });
    }

    if (!nombre) {
      return res.status(400).json({ message: 'El nombre del asunto es requerido' });
    }

    const objAsunto = {
      nombre,
      descripcion,
      despacho
    };

    const newAsunto = await AsuntosModel.create(objAsunto);

    res.status(201).json({
      message: 'Asunto creado correctamente',
      asunto: newAsunto
    });
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};

const getAsuntos = async (req, res) => {
  const { despacho } = req.params;
  const { estatus, page = 1 } = req.query;
  // El estatus es opcional, por lo que no es requerido.

  const options = {
    page,
    limit: 10,
    sort: { nombre: 1 }
  };

  if (!despacho) {
    return res.status(400).json({ message: 'El despacho es requerido' });
  }

  const query = {
    despacho
  };

  if (estatus) {
    query.estatus = estatus;
  }

  try {
    const findAsuntos = await AsuntosModel.paginate(query, options);
    res.status(200).json({ asuntos: findAsuntos });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  createAsuntos,
  getAsuntos
};

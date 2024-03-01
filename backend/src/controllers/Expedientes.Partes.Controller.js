import PartesInvolucradasodel from '../models/ExpedientesPartesInvolucradas.js';

export const createPartes = async (req, res) => {
  const { despacho, expediente } = req.params;
  const {
    tipo,
    nombre,
    sujeto,
    correo,
    telefono,
    comentario
  } = req.body;

  if (!despacho) {
    return res.status(400).json({ message: 'El despacho es requerido' });
  }

  if (!expediente) {
    return res.status(400).json({ message: 'El expediente es requerido' });
  }

  if (!nombre) {
    return res.status(400).json({ message: 'El nombre es requerido' });
  }

  if (!tipo) {
    return res.status(400).json({ message: 'El tipo es requerido' });
  }

  try {
    const objPartes = {
      despacho,
      expediente,
      tipo,
      sujeto,
      nombre,
      correo,
      telefono,
      comentario
    };

    const newPartes = await PartesInvolucradasodel.create(objPartes);

    res.status(201).json({ newPartes });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getPartes = async (req, res) => {
  const { despacho, expediente } = req.params;
  const { page = 1 } = req.query;

  const options = {
    page,
    limit: 10,
    sort: { nombre: 1 }
  };
  const query = { despacho, expediente };

  try {
    const partes = await PartesInvolucradasodel.paginate(query, options);

    res.status(200).json({ partes });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deletePartes = async (req, res) => {
  const { _id } = req.params;

  if (!_id) {
    return res.status(400).json({ message: 'El id es requerido' });
  }

  try {
    await PartesInvolucradasodel.findByIdAndDelete(_id);

    res.status(200).json({ message: 'Parte eliminada' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updatePartes = async (req, res) => {
  const { _id } = req.params;
  const {
    tipo,
    nombre,
    sujeto,
    correo,
    telefono,
    comentario
  } = req.body;

  if (!_id) {
    return res.status(400).json({ message: 'El id es requerido' });
  }

  if (!nombre) {
    return res.status(400).json({ message: 'El nombre es requerido' });
  }

  if (!tipo) {
    return res.status(400).json({ message: 'El tipo es requerido' });
  }

  try {
    const objPartes = {
      tipo,
      sujeto,
      nombre,
      correo,
      telefono,
      comentario
    };

    await PartesInvolucradasodel.findByIdAndUpdate(_id, objPartes);

    res.status(200).json({ message: 'Parte actualizada' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

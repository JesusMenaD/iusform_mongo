const ClienteModel = require('../models/Clientes.js');

const getClientes = async (req, res) => {
  const { despacho } = req.params;
  const { estatus, page = 1, search } = req.query;

  const options = {
    page,
    limit: 20,
    sort: { nombre: 1 },
    populate: 'estado'

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

  if (search) {
    // query.nombre = { $regex: search, $options: 'i' };
    query.$or = [
      { nombre: { $regex: search, $options: 'i' } },
      { rfc: { $regex: search, $options: 'i' } },
      { correo: { $regex: search, $options: 'i' } },
      { telefono: { $regex: search, $options: 'i' } }
    ];
  }

  try {
    const findClientes = await ClienteModel.paginate(query, options);
    res.status(200).json({ clientes: findClientes });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createCliente = async (req, res) => {
  const { despacho } = req.params;
  const { nombre, creadoPor } = req.body;

  if (!despacho) {
    return res.status(400).json({ message: 'El despacho es requerido' });
  }

  if (!nombre) {
    return res.status(400).json({ message: 'El nombre del cliente es requerido' });
  }

  if (!creadoPor) {
    return res.status(400).json({ message: 'El usuario que crea el cliente es requerido' });
  }

  try {
    const objCliente = {
      despacho,
      creadoPor,
      ...req.body
    };

    const newCliente = await ClienteModel.create(objCliente);

    res.status(201).json({
      message: 'Cliente creado correctamente',
      cliente: newCliente
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const getCliente = async (req, res) => {
  const { id } = req.params;

  try {
    const cliente = await ClienteModel.findById(id);

    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    res.status(200).json({ cliente });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateCliente = async (req, res) => {
  const { id } = req.params;
  const { nombre, creadoPor } = req.body;

  if (!nombre) {
    return res.status(400).json({ message: 'El nombre del cliente es requerido' });
  }

  if (!creadoPor) {
    return res.status(400).json({ message: 'El usuario que crea el cliente es requerido' });
  }

  try {
    const objCliente = {
      ...req.body
    };

    const updatedCliente = await ClienteModel.findByIdAndUpdate(id, objCliente, { new: true });

    res.status(200).json({
      message: 'Cliente actualizado correctamente',
      cliente: updatedCliente
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const deleteCliente = async (req, res) => {
  const { id } = req.params;

  try {
    await ClienteModel.findByIdAndRemove(id);
    res.status(200).json({ message: 'Cliente eliminado correctamente' });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

module.exports = {
  getClientes,
  createCliente,
  getCliente,
  updateCliente,
  deleteCliente
};

import ClienteModel from '../models/Clientes.js';

export const getClientes = async (req, res) => {
  const { despacho } = req.params;
  const { estatus, page = 1 } = req.query;
  // El estatus es opcional, por lo que no es requerido.
  const options = {
    page,
    limit: 20,
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
    const findClientes = await ClienteModel.paginate(query, options);
    res.status(200).json({ clientes: findClientes });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createCliente = async (req, res) => {
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

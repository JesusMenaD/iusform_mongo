import ExpedientesMovimientosModel from '../models/ExpedientesMovimientos.js';

export const getMovimientosExpediente = async (req, res) => {
  const { despacho, expediente } = req.params;
  const { page = 1 } = req.query;

  const options = {
    page,
    limit: 20,
    sort: { fecha: -1 },
    populate: 'creadoPor'
  };

  if (!despacho) {
    return res.status(400).json({ message: 'El despacho es requerido' });
  }

  if (!expediente) {
    return res.status(400).json({ message: 'El expediente es requerido' });
  }

  const query = {
    despacho,
    expediente
  };

  try {
    const findMovimientos = await ExpedientesMovimientosModel.paginate(query, options);
    res.status(200).json({ movimientos: findMovimientos });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

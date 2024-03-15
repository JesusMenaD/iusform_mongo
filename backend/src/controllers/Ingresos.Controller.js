import IngresosModel from '../models//Ingresos.js';
import ExpedientesModel from '../models/Expedientes.js';
import ClientesModel from '../models/Clientes.js';
import MovimientosBancos from '../models/MovimientosBancos.js';

export const getIngresos = async (req, res) => {
  const { despacho } = req.params;
  const { page = 1, limit = 10, estatus, search } = req.query;

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    populate: ['cuentaBancaria', 'cliente', 'referencia.expediente'],
    sort: { fecha: -1 }
  };

  const query = {
    despacho
  };

  if (estatus) {
    query.estatus = estatus;
  }

  if (search) {
    query.$or = [
      { referencia: { $regex: search, $options: 'i' } },
      { comentario: { $regex: search, $options: 'i' } }
    ];
  }

  try {
    const ingresos = await IngresosModel.paginate(query, options);
    res.status(200).json({ ingresos });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createIngresos = async (req, res) => {
  const { despacho } = req.params;
  const { concepto, importe, fecha, referencia, estatus, cuentaBancaria, cliente } = req.body;

  if (!concepto || !importe || !referencia || !cliente) {
    return res.status(400).json({ message: 'Faltan campos por llenar' });
  }

  try {
    const obj = {
      despacho,
      concepto,
      importe,
      fecha,
      referencia,
      estatus,
      cliente
    };

    if (cuentaBancaria) {
      obj.cuentaBancaria = cuentaBancaria;
    }

    const newIngresos = await IngresosModel.create(obj);

    const mov = {
      despacho,
      afectacion: 'Abono',
      ligadoa: 'Ingreso',
      folioLiga: { ingreso: newIngresos._id },
      concepto,
      importe,
      estatus: 'Aplicado'
    };

    if (cuentaBancaria) {
      mov.cuentaBancaria = cuentaBancaria;
    }

    await MovimientosBancos.create(mov);
    res.status(201).json({ newIngresos });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getExpedientesSinPaginar = async (req, res) => {
  const { despacho } = req.params;
  const { cliente } = req.query;
  try {
    const expedientes = await ExpedientesModel.find({
      despacho,
      estatus: 'Activo',
      cliente
    }, '_id titulo').sort({ titulo: 1 });
    res.status(200).json({ expedientes });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getClientes = async (req, res) => {
  const { despacho } = req.params;
  try {
    const clientes = await ClientesModel.find({ despacho, estatus: 'Activo' }, '_id nombre').sort({ nombre: 1 });
    res.status(200).json({ clientes });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteIngresos = async (req, res) => {
  const { id } = req.params;
  try {
    const ingreso = await IngresosModel.findByIdAndRemove(id);

    if (!ingreso) {
      return res.status(404).json({ message: 'No se encontró el ingreso' });
    }

    if (ingreso.estatus === 'Facturado') {
      return res.status(400).json({ message: 'No se puede eliminar un ingreso facturado' });
    }

    const mov = await MovimientosBancos.findOneAndRemove({ 'folioLiga.ingreso': id });

    if (mov) {
      await mov.remove();
    }

    ingreso.delete();
    res.status(200).json({ message: 'Ingreso eliminado' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

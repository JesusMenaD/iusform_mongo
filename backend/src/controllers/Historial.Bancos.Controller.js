const HistorialBancos = require('../models/MovimientosBancos.js');

const getHistorialBancos = async (req, res) => {
  const { despacho } = req.params;
  const { estatus, banco, page = 1, search } = req.query;

  const options = {
    page,
    limit: 20,
    sort: {
      fecha: -1,
      estatus: 1
    },
    populate: [{
      path: 'cuentaBancaria',
      select: 'nombre',
      populate: {
        path: 'banco',
        select: 'banco'
      }
    }]
  };

  const query = {
    despacho
  };

  if (estatus) {
    query.estatus = estatus;
  }

  if (banco) {
    query.cuentaBancaria = banco;
  }

  if (search) {
    query.$or = [
      { concepto: new RegExp(search, 'i') }
    ];
  }

  try {
    const historial = await HistorialBancos.paginate(query, options);
    let abono = 0;
    let cargo = 0;
    let saldo = 0;
    let cancelado = 0;
    let pendiente = 0;
    const historialEdo = historial.docs.map((mov) => {
      let saldoMov = 0;
      let abonoMov = 0;
      let cargoMov = 0;
      if (mov.afectacion === 'Abono' && mov.estatus === 'Aplicado') {
        abono += mov.importe;
        abonoMov = mov.importe;
      }

      if (mov.afectacion === 'Cargo' && mov.estatus === 'Aplicado') {
        cargo += mov.importe;
        cargoMov = mov.importe;
      }

      if (mov.estatus === 'Cancelado') {
        cancelado += mov.importe;
      }

      if (mov.estatus === 'Pendiente') {
        pendiente += mov.importe;
      }

      saldo = abono - cargo;

      if (mov.estatus === 'Aplicado') {
        saldoMov = saldo;
      }

      return {
        ...mov._doc,
        saldo: saldoMov,
        abono: abonoMov,
        cargo: cargoMov
      };
    });

    historial.docs = historialEdo;
    historial.cancelado = cancelado;
    historial.pendiente = pendiente;
    historial.abono = abono;
    historial.cargo = cargo;
    historial.saldo = saldo;
    res.status(200).json(historial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMovimientoBanco = async (req, res) => {
  const { despacho } = req.params;

  const { tipo, concepto, importe, banco, liga, estatus, fecha } = req.body;
  const tipos = ['Cargo', 'Abono']; // cargo = egreso = gasto, abono = ingreso = ingreso

  if (!tipos.includes(tipo)) {
    return res.status(400).json({ message: 'Tipo de movimiento no válido' });
  }

  if (!concepto || !importe) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  const obj = {
    despacho,
    concepto,
    importe,
    estatus,
    fecha
  };

  if (tipo === 'Cargo') {
    obj.afectacion = 'Cargo';
    obj.ligadoa = 'Egreso';

    if (!liga) {
      obj.folioLiga = { gasto: liga };
    }
  }

  if (tipo === 'Abono') {
    obj.afectacion = 'Abono';
    obj.ligadoa = 'Ingreso';

    if (!liga) {
      obj.folioLiga = { ingreso: liga };
    }
  }

  if (banco) {
    obj.cuentaBancaria = banco;
  }

  try {
    const newMovimiento = await HistorialBancos.create(obj);
    await newMovimiento.save();
    res.status(201).json(newMovimiento);
  } catch (error) {
    res.status(500).json({ message: 'No se pudo crear el movimiento' });
  }
};

const deleteMovimientoBanco = async (req, res) => {
  const { id } = req.params;
  try {
    const movimiento = await HistorialBancos.findById(id);
    if (!movimiento) {
      return res.status(404).json({ message: 'Movimiento no encontrado' });
    }

    movimiento.estatus = 'Cancelado';
    await movimiento.save();
    res.status(200).json(movimiento);
  } catch (error) {
    res.status(500).json({ message: 'No se pudo eliminar el movimiento' });
  }
};

const getMovimientoById = async (req, res) => {
  const { id } = req.params;
  try {
    const movimiento = await HistorialBancos.findById(id);
    if (!movimiento) {
      return res.status(404).json({ message: 'Movimiento no encontrado' });
    }
    res.status(200).json(movimiento);
  } catch (error) {
    res.status(500).json({ message: 'No se pudo obtener el movimiento' });
  }
};

const updateMovimientoBanco = async (req, res) => {
  const { id } = req.params;
  const { tipo, concepto, importe, banco, liga, estatus, fecha } = req.body;
  const tipos = ['Cargo', 'Abono']; // cargo = egreso = gasto, abono = ingreso = ingreso

  if (!tipos.includes(tipo)) {
    return res.status(400).json({ message: 'Tipo de movimiento no válido' });
  }

  if (!concepto || !importe) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  const obj = {
    concepto,
    importe,
    estatus,
    fecha
  };

  if (tipo === 'Cargo') {
    obj.afectacion = 'Cargo';
    obj.ligadoa = 'Egreso';

    if (!liga) {
      obj.folioLiga = { gasto: liga };
    }
  }

  if (tipo === 'Abono') {
    obj.afectacion = 'Abono';
    obj.ligadoa = 'Ingreso';

    if (!liga) {
      obj.folioLiga = { ingreso: liga };
    }
  }

  if (banco) {
    obj.cuentaBancaria = banco;
  }

  try {
    const movimiento = await HistorialBancos.findByIdAndUpdate(id, obj, { new: true });
    res.status(200).json(movimiento);
  } catch (error) {
    res.status(500).json({ message: 'No se pudo actualizar el movimiento' });
  }
};

module.exports = {
  getHistorialBancos,
  createMovimientoBanco,
  deleteMovimientoBanco,
  getMovimientoById,
  updateMovimientoBanco
};

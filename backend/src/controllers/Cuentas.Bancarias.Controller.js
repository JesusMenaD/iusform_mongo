const CuentasBancariaSchema = require('../models/CuentsaBancaria.js');
const Moivimientos = require('../models/MovimientosBancos.js');

const getCuentasBancarias = async (req, res) => {
  const { despacho } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    populate: ['banco'],
    sort: { nombre: 1 }
  };

  const query = {
    despacho
  };

  try {
    const cuentasBancarias = await CuentasBancariaSchema.paginate(query, options);
    res.status(200).json({ cuentas: cuentasBancarias });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createCuentasBancarias = async (req, res) => {
  const { despacho } = req.params;

  const {
    nombre,
    banco,
    numeroCuenta,
    clave,
    saldoInicial
  } = req.body;

  if (!despacho) {
    return res.status(400).json({ message: 'Falta el despacho' });
  }

  if (!nombre) {
    return res.status(400).json({ message: 'Falta el nombre' });
  }

  if (!banco) {
    return res.status(400).json({ message: 'Falta el banco' });
  }

  try {
    const obj = {
      despacho,
      nombre,
      banco,
      numeroCuenta,
      clave,
      saldoInicial
    };

    const newCuentaBancaria = await CuentasBancariaSchema.create(obj);

    if (saldoInicial > 0) {
      const objMov = {
        despacho,
        cuentaBancaria: newCuentaBancaria._id,
        afectacion: 'Abono',
        ligadoa: 'Otro',
        concepto: 'Saldo inicial',
        conste: saldoInicial,
        estatus: 'Aplicado'
      };
      await Moivimientos.create(objMov);
    }

    res.status(201).json({ cuenta: newCuentaBancaria });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const deleteCuentasBancarias = async (req, res) => {
  const { id } = req.params;
  try {
    await CuentasBancariaSchema.findByIdAndRemove(id);
    res.status(200).json({ message: 'Cuenta Bancaria eliminada' });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const cuenta = await CuentasBancariaSchema.findById(id);

    if (!cuenta) {
      return res.status(404).json({ message: 'No se encontró la cuenta' });
    }

    res.status(200).json({ cuenta });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateCuentasBancarias = async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    banco,
    numeroCuenta,
    clave
  } = req.body;

  if (!nombre) {
    return res.status(400).json({ message: 'Falta el nombre' });
  }

  if (!banco) {
    return res.status(400).json({ message: 'Falta el banco' });
  }

  try {
    const obj = {
      nombre,
      banco,
      numeroCuenta,
      clave
    };

    const cuenta = await CuentasBancariaSchema.findByIdAndUpdate(id, obj, { new: true });

    res.status(200).json({ cuenta });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const geyBancosSinPaginar = async (req, res) => {
  try {
    const { despacho } = req.params;
    const bancos = await CuentasBancariaSchema.find({ despacho, estatus: 'Activo' }).populate('banco');
    res.status(200).json({ bancos });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getCuentasBancarias,
  createCuentasBancarias,
  deleteCuentasBancarias,
  getById,
  updateCuentasBancarias,
  geyBancosSinPaginar
};

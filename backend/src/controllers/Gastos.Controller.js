
const GastosModel = require('../models/Gastos.js');
const MovimientosBancos = require('../models/MovimientosBancos.js');

const getGastos = async (req, res) => {
  const { despacho } = req.params;
  const { page = 1, limit = 10, estatus, search } = req.query;

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    populate: ['cuentaBancaria'],
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
    const gastos = await GastosModel.paginate(query, options);
    res.status(200).json({ gastos });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createGastos = async (req, res) => {
  const { despacho } = req.params;

  const {
    cuentaBancaria,
    conceptos,
    fecha = new Date(),
    total,
    referencia,
    creadoPor,
    comentario,
    estatus
  } = req.body;

  if (!despacho) {
    return res.status(400).json({ message: 'Falta el despacho' });
  }

  try {
    // conseptos en string '[{concepto: 'concepto', importe: 1000}]'
    const conceptos2 = JSON.parse(conceptos) || [];
    const obj = {
      despacho,
      // cuentaBancaria,
      conceptos: conceptos2,
      fecha,
      total,
      referencia,
      creadoPor,
      comentario,
      estatus
    };

    if (cuentaBancaria) {
      obj.cuentaBancaria = cuentaBancaria;
    }

    if (conceptos2.length === 0) {
      return res.status(400).json({ message: 'Falta los detalles' });
    }

    const newGasto = await GastosModel.create(obj);

    if (cuentaBancaria) {
      const mov = {
        despacho,
        afectacion: 'Cargo',
        ligadoa: 'Egreso',
        folioLiga: { gasto: newGasto._id },
        concepto: referencia,
        importe: total,
        estatus: 'Aplicado'
      };

      if (cuentaBancaria) {
        mov.cuentaBancaria = cuentaBancaria;
      }

      await MovimientosBancos.create(mov);
    }

    res.status(201).json(newGasto);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const getGasto = async (req, res) => {
  const { id } = req.params;

  try {
    const gasto = await GastosModel.findById(id);
    res.status(200).json(gasto);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteGasto = async (req, res) => {
  const { id } = req.params;

  try {
    const gastos = await GastosModel.findById(id);

    if (gastos) {
      const query = { folioLiga: { gasto: gastos._id } };
      const mov = await MovimientosBancos.findOne(query);

      if (mov) {
        await mov.remove();
      }
      await gastos.remove();
    }

    res.status(200).json({ message: 'Gasto eliminado' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateGasto = async (req, res) => {
  const { id } = req.params;
  const {
    cuentaBancaria,
    conceptos = [],
    fecha = new Date(),
    total,
    referencia,
    comentario,
    estatus
  } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'Falta el id' });
  }

  try {
    const obj = {
      conceptos,
      fecha,
      total,
      referencia,
      comentario,
      estatus
    };

    if (cuentaBancaria) {
      obj.cuentaBancaria = cuentaBancaria;
    }

    const updatedGasto = await GastosModel.findByIdAndUpdate(id, obj, { new: true });

    const query = { folioLiga: { gasto: updatedGasto._id } };

    const mov = await MovimientosBancos.findOne(query);

    if (mov) {
      mov.importe = total;
      mov.concepto = referencia;
      if (estatus === 'Cancelado') {
        mov.estatus = 'Cancelado';
      }

      if (estatus === 'Vigente') {
        mov.estatus = 'Aplicado';
      }

      if (estatus === 'Pendiente') {
        mov.estatus = 'Pendiente';
      }

      if (cuentaBancaria) {
        mov.cuentaBancaria = cuentaBancaria;
      }
      await mov.save();
    }

    res.status(200).json(updatedGasto);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

module.exports = {
  getGastos,
  createGastos,
  getGasto,
  deleteGasto,
  updateGasto
};

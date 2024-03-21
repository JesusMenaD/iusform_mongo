
const GastosModel = require('../models/Gastos.js');
const MovimientosBancos = require('../models/MovimientosBancos.js');
const fs = require('fs');
const path = require('path');
const APP_URL = process.env.APP_URL;

const getGastos = async (req, res) => {
  const { despacho } = req.params;
  const { page = 1, limit = 10, estatus, search } = req.query;

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    populate: ['cuentaBancaria'],
    sort: {
      estatus: -1,
      fecha: -1,
      _id: -1 // Note: This is a duplicate sort, it should be removed
    }
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

  if (!despacho) {
    return res.status(400).json({ message: 'Falta el despacho' });
  }

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

  try {
    const conceptos2 = JSON.parse(conceptos) || [];
    const documentos = req?.files ?? [];
    const comprobantes = documentos.map((doc) => {
      return {
        nombre: doc.originalname,
        archivo: doc.filename
      };
    });

    if (conceptos2.length === 0) {
      return res.status(400).json({ message: 'Faltan los detalles' });
    }

    const obj = {
      despacho,
      conceptos: conceptos2,
      fecha,
      total,
      referencia,
      creadoPor,
      comentario,
      estatus,
      comprobantes,
      cuntaBancaria: cuentaBancaria || null // Note: There's a typo here, it should be "cuentaBancaria"
    };

    console.log(obj);
    const newGasto = await GastosModel.create(obj);

    if (cuentaBancaria) {
      const mov = {
        despacho,
        afectacion: 'Cargo',
        ligadoa: 'Egreso',
        folioLiga: { gasto: newGasto._id },
        concepto: referencia,
        importe: total,
        estatus: 'Aplicado',
        cuentaBancaria
      };

      await MovimientosBancos.create(mov);
    }

    return res.status(201).json(newGasto);
  } catch (error) {
    console.log(error);
    return res.status(409).json({ message: error.message }); // Ensure we return to avoid attempting to set headers after they're already sent
  }
};

const getGasto = async (req, res) => {
  const { id } = req.params;

  try {
    const gasto = await GastosModel.findById(id);

    if (!gasto) {
      return res.status(404).json({ message: 'Gasto no encontrado' });
    }

    gasto.comprobantes = gasto.comprobantes.map((doc) => {
      if (doc?.archivo !== '' && fs.existsSync(path.join('src/uploads/gastos', doc?.archivo))) {
        doc.archivo = `${APP_URL}/uploads/gastos/${doc.archivo}`;
      }
      return doc;
    });

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

  console.log(req.body);

  if (!id) {
    return res.status(400).json({ message: 'Falta el id' });
  }

  try {
    const gasto = await GastosModel.findById(id);

    if (!gasto) {
      return res.status(404).json({ message: 'Gasto no encontrado' });
    }

    const conceptos2 = JSON.parse(conceptos) || [];

    if (conceptos2.length === 0) {
      return res.status(400).json({ message: 'Faltan los detalles' });
    }

    const documentos = req?.files ?? [];

    if (documentos.length > 0) {
      const comprobantes = documentos.map((doc) => {
        return {
          nombre: doc.originalname,
          archivo: doc.filename
        };
      });

      gasto.comprobantes = gasto.comprobantes.concat(comprobantes);
    }

    gasto.conceptos = conceptos2;
    gasto.fecha = fecha;
    gasto.total = total;
    gasto.referencia = referencia;
    gasto.comentario = comentario;
    gasto.estatus = estatus;

    if (cuentaBancaria !== 'null' && cuentaBancaria) {
      gasto.cuentaBancaria = cuentaBancaria;
    }

    await gasto.save();

    if (cuentaBancaria !== 'null' && cuentaBancaria) {
      const findMov = await MovimientosBancos.findOne({ 'folioLiga.gasto': gasto._id });

      if (findMov) {
        findMov.importe = total;
        findMov.concepto = referencia;
        findMov.cuentaBancaria = cuentaBancaria;
        findMov.estatus = estatus === 'Vigente' ? 'Aplicado' : estatus;
        findMov.save();
      } else {
        const mov = {
          despacho: gasto.despacho,
          afectacion: 'Cargo',
          ligadoa: 'Egreso',
          folioLiga: { gasto: gasto._id },
          concepto: gasto.referencia,
          importe: gasto.total,
          estatus: estatus === 'Vigente' ? 'Aplicado' : estatus,
          cuentaBancaria
        };

        await MovimientosBancos.create(mov);
      }
    } else {
      const mov = await MovimientosBancos.findOne({ 'folioLiga.gasto': gasto._id });

      if (mov) {
        await mov.remove();
      }
    }

    res.status(200).json(gasto);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};

const deleteComprobante = async (req, res) => {
  const { id } = req.params;

  try {
    const gasto = await GastosModel.findOne({ 'comprobantes._id': id });

    if (!gasto) {
      return res.status(404).json({ message: 'Gasto no encontrado' });
    }

    const comprobante = gasto.comprobantes.id(id);

    if (comprobante) {
      const filePath = path.join('src/uploads/gastos', comprobante.archivo);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      comprobante.remove();
      await gasto.save();
    }

    res.status(200).json({ message: 'Comprobante eliminado' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getGastos,
  createGastos,
  getGasto,
  deleteGasto,
  updateGasto,
  deleteComprobante
};

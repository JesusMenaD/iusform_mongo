import ExpedienteGastosModel from '../models/ExpedientesGastos.js';
import fs from 'fs';
import path from 'path';
const APP_URL = process.env.APP_URL;
export const create = async (req, res) => {
  const { despacho, expediente, usuario } = req.params;
  const { tipo, fecha, concepto, importe } = req.body;

  const comprobante = req?.file ?? null;

  if (!despacho) {
    return res.status(400).json({ message: 'El despacho es requerido' });
  }

  if (!expediente) {
    return res.status(400).json({ message: 'El expediente es requerido' });
  }

  if (!usuario) {
    return res.status(400).json({ message: 'El usuario es requerido' });
  }

  if (!concepto) {
    return res.status(400).json({ message: 'El concepto es requerido' });
  }

  if (!importe) {
    return res.status(400).json({ message: 'El importe es requerido' });
  }

  if (!tipo) {
    return res.status(400).json({ message: 'El tipo es requerido' });
  }

  const importeNumber = parseFloat(importe) || 0;
  const obj = {
    despacho,
    expediente,
    usuario,
    tipo,
    fecha,
    concepto,
    importe: importeNumber

  };

  if (comprobante) {
    obj.adjunto = {
      nombre: comprobante.originalname,
      archivo: comprobante.filename
    };
  }

  try {
    await ExpedienteGastosModel.create(obj);

    res.status(201).json({ message: 'Gasto creado correctamente' });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const get = async (req, res) => {
  const { despacho, expediente } = req.params;
  const { tipo = 'Gasto' } = req.query;
  const { page = 1 } = req.query;

  const options = {
    page,
    limit: 10,
    sort: { fecha: -1 }
  };

  if (!despacho) {
    return res.status(400).json({ message: 'El despacho es requerido' });
  }

  if (!expediente) {
    return res.status(400).json({ message: 'El expediente es requerido' });
  }

  try {
    const gastos = await ExpedienteGastosModel.paginate({ despacho, expediente, tipo }, options);

    gastos.docs.forEach(gasto => {
      if (gasto.adjunto?.archivo !== '' && fs.existsSync(path.join('src/uploads/expedientes-gastos', gasto.adjunto.archivo))) {
        gasto.adjunto.archivo = `${APP_URL}/uploads/expedientes-gastos/${gasto.adjunto.archivo}`;
      }
    });

    res.status(200).json({ gastos });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteGasto = async (req, res) => {
  const { id } = req.params;
  try {
    const gasto = await ExpedienteGastosModel.findById(id);
    if (gasto.adjunto?.archivo !== '' && fs.existsSync(path.join('src/uploads/expedientes-gastos', gasto.adjunto.archivo))) {
      fs.unlinkSync(path.join('src/uploads/expedientes-gastos', gasto.adjunto.archivo));
    }
    await ExpedienteGastosModel.findByIdAndDelete(id);
    res.status(200).json({ message: 'Gasto eliminado correctamente' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const balance = async (req, res) => {
  const { despacho, expediente } = req.params;
  try {
    const gastos = await ExpedienteGastosModel.find({ despacho, expediente, tipo: 'Gasto' });
    const ingresos = await ExpedienteGastosModel.find({ despacho, expediente, tipo: 'Ingreso' });

    const gastoTotal = gastos.reduce((acc, gasto) => acc + gasto.importe, 0);
    const ingresoTotal = ingresos.reduce((acc, ingreso) => acc + ingreso.importe, 0);
    const total = ingresoTotal - gastoTotal;

    res.status(200).json({ total, gastos: gastoTotal, ingresos: ingresoTotal });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

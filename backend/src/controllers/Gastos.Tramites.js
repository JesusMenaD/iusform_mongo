import ExpedientesGastos from '../models/ExpedientesGastos.js';
import fs from 'fs';
import path from 'path';
const APP_URL = process.env.APP_URL;

export const getGastosTramites = async (req, res) => {
  const { despacho } = req.params;
  const { search, estatus, expediente, fechaInicio, fechaFinal, page } = req.query;

  try {
    const limit = 10;
    const options = {
      page: page || 1,
      limit,
      sort: { fecha: -1 },
      populate: {
        path: 'expediente',
        select: 'titulo estatus'
      }
    };
    const query = {
      despacho,
      tipo: 'Gasto'
    };

    if (search) {
      query.$or = [
        { concepto: { $regex: search, $options: 'i' } }
      ];
    }

    if (estatus) {
      query.estatus = estatus;
    }

    if (expediente) {
      query.expediente = expediente;
    }

    if (fechaInicio && fechaFinal) {
      query.fecha = {
        $gte: new Date(fechaInicio),
        $lte: new Date(fechaFinal)
      };
    }

    const gastos = await ExpedientesGastos.paginate(query, options);

    gastos.docs.forEach(gasto => {
      if (gasto.adjunto?.archivo !== '' && fs.existsSync(path.join('src/uploads/expedientes-gastos', gasto.adjunto.archivo))) {
        gasto.adjunto.archivo = `${APP_URL}/uploads/expedientes-gastos/${gasto.adjunto.archivo}`;
      }
    });

    res.status(200).json({ gastos });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

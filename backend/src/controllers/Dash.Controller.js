const ExpedientesMovimientos = require('../models/ExpedientesMovimientos.js');
const ExpedientesUsuarios = require('../models/ExpedientesUsuarios.js');
const usuarios = require('../models/Usuarios.js');
const MovimientosBancos = require('../models/MovimientosBancos.js');
const Materias = require('../models/Materias.js');
const Expedientes = require('../models/Expedientes.js');
const mongoose = require('mongoose');
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const getMovimientos = async (req, res) => {
  const { despacho, page = 1 } = req.query;
  const limit = 10;
  const options = {
    page,
    limit,
    sort: { fecha: -1 },
    populate: [
      {
        path: 'expediente',
        select: 'titulo estatus'
      }
      // {
      //   path: 'creadoPor',
      //   select: 'nombre apellidoPaterno apellidoMaterno'
      // }
    ]
  };

  try {
    const query = { despacho };
    const movimientos = await ExpedientesMovimientos.paginate(query, options);
    res.status(200).json(movimientos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener los movimientos' });
  }
};

const getUsuariosExpedientesAsignados = async (req, res) => {
  const { despacho } = req.query;

  try {
    const findUsuarios = await usuarios.find({ despacho, estatus: 'Activo' }).select('nombre').sort({ nombre: 1 });

    const usuariosExpedientes = await Promise.all(findUsuarios.map(async (usuario) => {
      const findExpedientes = await ExpedientesUsuarios.countDocuments({ usuario: usuario._id });
      return {
        ...usuario._doc,
        expedientesAsignados: findExpedientes
      };
    }));

    res.status(200).json(usuariosExpedientes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener los movimientos' });
  }
};

const getCargo = async (req, res) => {
  const { despacho } = req.query;

  try {
    const fecha = new Date();
    const fechaInicioMes = new Date(fecha.getFullYear(), fecha.getMonth(), 1);
    const fechaFinMes = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0);

    const resultado = await MovimientosBancos.aggregate([
      {
        $match: {
          despacho: mongoose.Types.ObjectId(despacho),
          estatus: 'Aplicado',
          afectacion: 'Cargo',
          fecha: {
            $gte: fechaInicioMes,
            $lt: fechaFinMes
          }
        }
      },
      {
        $group: {
          _id: '$despacho', // Agrupa por despacho
          totalImporte: { $sum: '$importe' } // Suma el importe
        }
      }
    ]);

    if (resultado.length > 0) {
      // Si se obtienen resultados, se devuelve el total de importe
      res.status(200).json({ totalImporte: resultado[0].totalImporte, mes: months[fecha.getMonth()] });
    } else {
      // Si no hay resultados, se devuelve un total de importe como 0
      res.status(200).json({ totalImporte: 0, mes: months[fecha.getMonth()] });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener los movimientos' });
  }
};

const getAbono = async (req, res) => {
  const { despacho } = req.query;

  const fecha = new Date();

  const fechaInicioMes = new Date(fecha.getFullYear(), fecha.getMonth(), 1);
  const fechaFinMes = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0);

  try {
    const resultado = await MovimientosBancos.aggregate([
      {
        $match: {
          despacho: mongoose.Types.ObjectId(despacho),
          estatus: 'Aplicado',
          afectacion: 'Abono',
          fecha: {
            $gte: fechaInicioMes,
            $lt: fechaFinMes
          }
        }
      },
      {
        $group: {
          _id: '$despacho', // Agrupa por despacho
          totalImporte: { $sum: '$importe' } // Suma el importe
        }
      }
    ]);

    if (resultado.length > 0) {
      // Si se obtienen resultados, se devuelve el total de importe
      res.status(200).json({ totalImporte: resultado[0].totalImporte, mes: months[fecha.getMonth()] });
    } else {
      // Si no hay resultados, se devuelve un total de importe como 0
      res.status(200).json({ totalImporte: 0, mes: months[fecha.getMonth()] });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener los movimientos' });
  }
};

const getCancelados = async (req, res) => {
  const { despacho } = req.query;

  try {
    const fecha = new Date();
    const fechaInicioMes = new Date(fecha.getFullYear(), fecha.getMonth(), 1);
    const fechaFinMes = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0);

    const resultado = await MovimientosBancos.aggregate([
      {
        $match: {
          despacho: mongoose.Types.ObjectId(despacho),
          estatus: 'Cancelado',
          fecha: {
            $gte: fechaInicioMes,
            $lt: fechaFinMes
          }
        }
      },
      {
        $group: {
          _id: '$despacho', // Agrupa por despacho
          totalImporte: { $sum: '$importe' } // Suma el importe
        }
      }
    ]);

    if (resultado.length > 0) {
      // Si se obtienen resultados, se devuelve el total de importe
      res.status(200).json({ totalImporte: resultado[0].totalImporte, mes: months[fecha.getMonth()] });
    } else {
      // Si no hay resultados, se devuelve un total de importe como 0
      res.status(200).json({ totalImporte: 0, mes: months[fecha.getMonth()] });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener los movimientos' });
  }
};

const getPendientes = async (req, res) => {
  const { despacho } = req.query;

  try {
    const fecha = new Date();
    const fechaInicioMes = new Date(fecha.getFullYear(), fecha.getMonth(), 1);
    const fechaFinMes = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0);
    const resultado = await MovimientosBancos.aggregate([
      {
        $match: {
          despacho: mongoose.Types.ObjectId(despacho),
          estatus: 'Pendiente',
          fecha: {
            $gte: fechaInicioMes,
            $lt: fechaFinMes
          }
        }
      },
      {
        $group: {
          _id: '$despacho', // Agrupa por despacho
          totalImporte: { $sum: '$importe' } // Suma el importe
        }
      }
    ]);

    if (resultado.length > 0) {
      // Si se obtienen resultados, se devuelve el total de importe
      res.status(200).json({ totalImporte: resultado[0].totalImporte, mes: months[fecha.getMonth()] });
    } else {
      // Si no hay resultados, se devuelve un total de importe como 0
      res.status(200).json({ totalImporte: 0, mes: months[fecha.getMonth()] });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener los movimientos' });
  }
};

const getBalance = async (req, res) => {
  const { despacho } = req.query;

  try {
    const fecha = new Date();
    const fechaInicioMes = new Date(fecha.getFullYear(), fecha.getMonth(), 1);
    const fechaFinMes = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0);
    const resultado = await MovimientosBancos.aggregate([
      {
        $match: {
          despacho: mongoose.Types.ObjectId(despacho),
          estatus: 'Aplicado',
          fecha: {
            $gte: fechaInicioMes,
            $lt: fechaFinMes
          }
        }
      },
      {
        $group: {
          _id: '$despacho',
          abonos: {
            $sum: {
              $cond: [{ $eq: ['$afectacion', 'Abono'] }, '$importe', 0]
            }
          },
          cargos: {
            $sum: {
              $cond: [{ $eq: ['$afectacion', 'Cargo'] }, '$importe', 0]
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          balance: { $subtract: ['$abonos', '$cargos'] }
        }
      }
    ]);

    if (resultado.length > 0) {
      // Si se obtienen resultados, se devuelve el balance
      res.status(200).json({ balance: resultado[0].balance, mes: months[fecha.getMonth()] });
    } else {
      // Si no hay resultados, se devuelve un balance como 0
      res.status(200).json({ balance: 0, mes: months[fecha.getMonth()] });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener el balance' });
  }
};

const getMateriasExpedientes = async (req, res) => {
  const { despacho } = req.query;

  try {
    const findMaterias = await Materias.find({ estatus: 'Activo' }).select('nombre').sort({ nombre: 1 });

    const materiasExpedientes = await Promise.all(findMaterias.map(async (materia) => {
      const { _id } = materia;
      const query = {
        despacho: mongoose.Types.ObjectId(despacho),
        // estatus: 'Activo',
        'materia.materia': mongoose.Types.ObjectId(_id)
      };

      const findExpedientes = await Expedientes.countDocuments(query);

      return {
        ...materia._doc,
        expedientes: findExpedientes
      };
    }));

    res.status(200).json(materiasExpedientes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener los movimientos' });
  }
};

const getExpedientesEstatus = async (req, res) => {
  const { despacho } = req.query;
  try {
    const estatus = ['Activo', 'Inactivo', 'Concluido', 'Suspendido'];

    const resultado = await Promise.all(estatus.map(async (estatus) => {
      const query = { despacho, estatus };
      const total = await Expedientes.countDocuments(query);
      return { estatus, total };
    }));

    res.status(200).json(resultado);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener los movimientos' });
  }
};

const getExpedientesSinMovimientos30Dias = async (req, res) => {
  const { despacho } = req.query;
  try {
    const fecha = new Date();
    const fecha30DiasAtras = new Date(fecha);
    fecha30DiasAtras.setDate(fecha.getDate() - 30);

    const expedientesFind = await Expedientes.find({
      despacho,
      estatus: 'Activo',
      ultimoMovimiento: { $lt: fecha30DiasAtras }
    }).select('titulo ultimoMovimiento').sort({ titulo: 1 });

    const calculoDias = expedientesFind.map((expediente) => {
      const fechaUltimoCambio = new Date(expediente.ultimoMovimiento);
      const diferenciaMilisegundos = fecha - fechaUltimoCambio;

      // Convertir la diferencia en días
      const diferenciaDias = diferenciaMilisegundos / (1000 * 60 * 60 * 24);

      const dias = Math.floor(diferenciaDias);
      return {
        ...expediente._doc,
        dias
      };
    });

    res.status(200).json(calculoDias);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener los movimientos' });
  }
};

const getExpedientesMovimientos = async (req, res) => {
  const { despacho } = req.query;
  try {
    const expedientes = await Expedientes.find({ despacho }).select('_id titulo').sort({ titulo: 1 });

    // Paso 2: Contar los movimientos para cada expediente y añadir el total a cada objeto de expediente
    const expedientesConMovimientos = await Promise.all(expedientes.map(async (expediente) => {
      const { _id, titulo } = expediente;
      const total = await ExpedientesMovimientos.countDocuments({ expediente: _id });
      return { _id, titulo, total };
    }));

    // Paso 3:  limitar a los primeros 10
    const expedientesLimitados = expedientesConMovimientos.slice(0, 10);

    res.status(200).json(expedientesLimitados);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener los movimientos' });
  }
};

module.exports = {
  getMovimientos,
  getUsuariosExpedientesAsignados,
  getCargo,
  getAbono,
  getCancelados,
  getPendientes,
  getBalance,
  getMateriasExpedientes,
  getExpedientesEstatus,
  getExpedientesSinMovimientos30Dias,
  getExpedientesMovimientos
};

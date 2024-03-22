const ExpedientesMovimientos = require('../models/ExpedientesMovimientos.js');
const ExpedientesUsuarios = require('../models/ExpedientesUsuarios.js');
const usuarios = require('../models/Usuarios.js');
const MovimientosBancos = require('../models/MovimientosBancos.js');
const mongoose = require('mongoose');

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
    const findUsuarios = await usuarios.find({ despacho, estatus: 'Activo' }).select('nombre');

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
    const resultado = await MovimientosBancos.aggregate([
      {
        $match: {
          despacho: mongoose.Types.ObjectId(despacho),
          estatus: 'Aplicado',
          afectacion: 'Cargo'
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
      res.status(200).json({ totalImporte: resultado[0].totalImporte });
    } else {
      // Si no hay resultados, se devuelve un total de importe como 0
      res.status(200).json({ totalImporte: 0 });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener los movimientos' });
  }
};

const getAbono = async (req, res) => {
  const { despacho } = req.query;

  try {
    const resultado = await MovimientosBancos.aggregate([
      {
        $match: {
          despacho: mongoose.Types.ObjectId(despacho),
          estatus: 'Aplicado',
          afectacion: 'Abono'
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
      res.status(200).json({ totalImporte: resultado[0].totalImporte });
    } else {
      // Si no hay resultados, se devuelve un total de importe como 0
      res.status(200).json({ totalImporte: 0 });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener los movimientos' });
  }
};

const getCancelados = async (req, res) => {
  const { despacho } = req.query;

  try {
    const resultado = await MovimientosBancos.aggregate([
      {
        $match: {
          despacho: mongoose.Types.ObjectId(despacho),
          estatus: 'Cancelado'
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
      res.status(200).json({ totalImporte: resultado[0].totalImporte });
    } else {
      // Si no hay resultados, se devuelve un total de importe como 0
      res.status(200).json({ totalImporte: 0 });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener los movimientos' });
  }
};

const getPendientes = async (req, res) => {
  const { despacho } = req.query;

  try {
    const resultado = await MovimientosBancos.aggregate([
      {
        $match: {
          despacho: mongoose.Types.ObjectId(despacho),
          estatus: 'Pendiente'
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
      res.status(200).json({ totalImporte: resultado[0].totalImporte });
    } else {
      // Si no hay resultados, se devuelve un total de importe como 0
      res.status(200).json({ totalImporte: 0 });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener los movimientos' });
  }
};

const getBalance = async (req, res) => {
  const { despacho } = req.query;

  try {
    const resultado = await MovimientosBancos.aggregate([
      {
        $match: {
          despacho: mongoose.Types.ObjectId(despacho),
          estatus: 'Aplicado'
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
      res.status(200).json({ balance: resultado[0].balance });
    } else {
      // Si no hay resultados, se devuelve un balance como 0
      res.status(200).json({ balance: 0 });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener el balance' });
  }
};

module.exports = {
  getMovimientos,
  getUsuariosExpedientesAsignados,
  getCargo,
  getAbono,
  getCancelados,
  getPendientes,
  getBalance
};

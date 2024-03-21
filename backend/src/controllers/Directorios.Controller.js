const DependenciasModel = require('../models/Dependencias');
const LegislacionesModel = require('../models/LegislacionesReglamentos');
const FiscaliasModel = require('../models/Fiscalias');
const JuzgadosModel = require('../models/Juzgados');

const getDirectorios = async (req, res) => {
  const { page = 1, search, tipo, estado } = req.query;
  const options = {
    page,
    limit: 20,
    sort: { nombre: 1 },
    populate: 'estado'
  };

  const query = {
    estatus: 'Activo'
  };

  if (search) {
    query.$or = [
      { nombre: { $regex: search, $options: 'i' } }
    ];
  }

  if (estado) {
    query.estado = estado;
  }

  let directorios = [];

  try {
    switch (tipo) {
      case 'dependencias':
        directorios = await DependenciasModel.paginate(query, options);
        break;
      case 'fiscalias':
        directorios = await FiscaliasModel.paginate(query, options);
        break;
      case 'legislaciones':
        directorios = await LegislacionesModel.paginate(query, options);
        break;
      case 'reglamentos':
        directorios = await DependenciasModel.paginate(query, options);
        break;
      case 'juzgados':
        directorios = await JuzgadosModel.paginate(query, options);
        break;
      default:
        break;
    }

    res.status(200).json({ directorios });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getDirectorios
};

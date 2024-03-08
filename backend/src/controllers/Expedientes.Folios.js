
import FoliosModel from '../models/ExpedientesFolios.js';
import MaterialModel from '../models/Materias.js';

export const getFolios = async (req, res) => {
  const { despacho } = req.params;
  const { page = 1 } = req.query;
  const options = {
    page,
    limit: 20,
    sort: { folio: 1 },
    populate: 'materia'
  };

  if (!despacho) {
    return res.status(400).json({ message: 'El despacho es requerido' });
  }

  const query = {
    despacho
  };

  try {
    const folios = await FoliosModel.paginate(query, options);

    res.status(200).json({ folios });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const createFolio = async (req, res) => {
  const { despacho } = req.params;
  const { materia, clave, folio, creadoPor } = req.body;

  try {
    const newFolio = {
      despacho,
      materia,
      clave,
      folio,
      creadoPor
    };

    const nuevoFolio = await FoliosModel.create(newFolio);

    res.status(201).json(nuevoFolio);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getMateriaNoAsignadas = async (req, res) => {
  const { despacho } = req.params;

  try {
    const materias = await MaterialModel.find({ estatus: 'Activo' });

    const folios = await FoliosModel.find({ despacho });

    const materiasSinAsigarFolio = materias.filter((materia) => {
      const materiaNoAsignada = folios.every((folio) => folio.materia.toString() !== materia._id.toString());
      return materiaNoAsignada;
    }
    );

    res.status(200).json(materiasSinAsigarFolio);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteFolio = async (req, res) => {
  const { id } = req.params;
  try {
    await FoliosModel.findByIdAndRemove(id);
    res.status(200).json({ message: 'Folio eliminado' });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

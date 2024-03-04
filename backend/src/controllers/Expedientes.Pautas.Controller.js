import PautasModel from '../models/ExpedientesPautas.js';
import fs from 'fs';
import path from 'path';
const APP_URL = process.env.APP_URL;
export const create = async (req, res) => {
  const { despacho, expediente } = req.params;
  const { nombre, usuario } = req.body;
  try {
    if (!nombre) return res.status(400).json({ message: 'El nombre de la pauta es requerido' });

    if (!usuario) return res.status(400).json({ message: 'El usuario es requerido' });

    const pauta = {
      nombre,
      creadoPor: usuario,
      expediente,
      despacho
    };

    const newPauta = await PautasModel.create(pauta);

    res.status(201).json(newPauta);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getPautas = async (req, res) => {
  const { despacho, expediente } = req.params;
  const { page = 1 } = req.query;

  const options = {
    page,
    limit: 20,
    sort: { nombre: 1 },
    populate: [
      { path: 'creadoPor', select: 'nombre apellidoPaterno apellidoMaterno foto' },
      { path: 'editadoPor', select: 'nombre apellidoPaterno apellidoMaterno foto' }
    ],
    select: 'nombre ultimoMovimiento fechaCreacion creadoPor editadoPor'
  };

  const query = {
    despacho,
    expediente
  };

  try {
    const pautas = await PautasModel.paginate(query, options);

    pautas.docs.forEach(pauta => {
      if (pauta.creadoPor.foto !== '' && fs.existsSync(path.join('src/uploads/usuarios', pauta.creadoPor.foto))) {
        pauta.creadoPor.foto = `${APP_URL}/uploads/usuarios/${pauta.creadoPor.foto}`;
      }

      if (pauta.editadoPor && pauta.editadoPor.foto !== '' && fs.existsSync(path.join('src/uploads/usuarios', pauta.editadoPor.foto))) {
        pauta.editadoPor.foto = `${APP_URL}/uploads/usuarios/${pauta.editadoPor.foto}`;
      }
    });

    res.status(200).json({ pautas });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPautaById = async (req, res) => {
  const { id } = req.params;
  try {
    const pauta = await PautasModel.findById(id);
    if (!pauta) return res.status(404).json({ message: 'Pauta no encontrada' });

    res.status(200).json(pauta);
  } catch (error) {
    res.status(404).json({ message: 'No se pudo encontrar la pauta' });
  }
};

export const updatePauta = async (req, res) => {
  const { id } = req.params;
  const { documento = '' } = req.body;

  if (!documento) return res.status(400).json({ message: 'El documento es requerido' });

  try {
    const pauta = await PautasModel.findByIdAndUpdate(id, { documento, ultimoMovimiento: new Date() }, { new: true });

    res.status(200).json(pauta);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deletePauta = async (req, res) => {
  const { id } = req.params;
  try {
    await PautasModel.findByIdAndRemove(id);

    res.status(200).json({ message: 'Pauta eliminada' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

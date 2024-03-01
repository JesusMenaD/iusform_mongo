import ExpedientesNotasModel from '../models/ExpedientesNotas.js';
import fs from 'fs';
import path from 'path';
const APP_URL = process.env.APP_URL;

export const getNotas = async (req, res) => {
  const { despacho, expediente } = req.params;
  const { page = 1 } = req.query;

  if (!despacho) {
    return res.status(400).json({ message: 'El despacho es requerido' });
  }

  if (!expediente) {
    return res.status(400).json({ message: 'El expediente es requerido' });
  }

  const query = {
    despacho,
    expediente
  };

  const options = {
    page,
    limit: 20,
    sort: { fecha: -1 },
    populate: {
      path: 'creadoPor',
      select: 'nombre apellidoPaterno apellidoMaterno foto'
    }
  };

  try {
    const notas = await ExpedientesNotasModel.paginate(query, options);

    const notasConFoto = notas.docs.map(nota => {
      return {
        ...nota._doc,
        creadoPor: {
          ...nota.creadoPor._doc,
          foto: nota.creadoPor.foto !== '' && fs.existsSync(path.join('src/uploads/usuarios', nota.creadoPor.foto)) ? `${APP_URL}/uploads/usuarios/${nota.creadoPor.foto}` : `${APP_URL}/uploads/default/icono_usuario_100x100_04.jpg`
        }
      };
    });

    const notasPaginadas = {
      ...notas,
      docs: notasConFoto
    };

    res.status(200).json({ notas: notasPaginadas });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createNotas = async (req, res) => {
  const { despacho, expediente, usuario } = req.params;
  const { nota } = req.body;

  if (!despacho) {
    return res.status(400).json({ message: 'El despacho es requerido' });
  }

  if (!expediente) {
    return res.status(400).json({ message: 'El expediente es requerido' });
  }

  if (!nota) {
    return res.status(400).json({ message: 'La nota es requerida' });
  }

  if (!usuario) {
    return res.status(400).json({ message: 'El usuario es requerido' });
  }

  const newNota = new ExpedientesNotasModel({
    despacho,
    expediente,
    comentario: nota,
    creadoPor: usuario
  });

  try {
    await newNota.save();

    res.status(201).json(newNota);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteNotas = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'El id es requerido' });
  }
  try {
    await ExpedientesNotasModel.findByIdAndRemove(id);
    res.status(200).json({ message: 'Nota eliminada' });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateNotas = async (req, res) => {
  const { id } = req.params;
  const { nota } = req.body;
  if (!id) {
    return res.status(400).json({ message: 'El id es requerido' });
  }
  if (!nota) {
    return res.status(400).json({ message: 'La nota es requerida' });
  }
  try {
    const updatedNota = await ExpedientesNotasModel.findByIdAndUpdate(id, {
      comentario: nota,
      fecha: Date.now(),
      editado: true
    }, { new: true });
    res.status(200).json(updatedNota);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

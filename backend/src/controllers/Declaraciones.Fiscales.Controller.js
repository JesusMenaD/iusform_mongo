import DeclaracionesFiscales from '../models/DeclaracionesFiscales.js';
import fs from 'fs';
import path from 'path';
const APP_URL = process.env.APP_URL;

export const getDeclaracionFiscal = async (req, res) => {
  const { despacho } = req.params;
  const { estatus, page = 1, search } = req.query;

  const options = {
    page,
    limit: 20,
    sort: { fecha: -1 },
    populate: [
      {
        path: 'creadoPor',
        select: 'nombre apellidoPaterno apellidoMaterno'
      }
    ]
  };

  if (!despacho) {
    return res.status(400).json({ message: 'El despacho es requerido' });
  }

  const query = {
    despacho
  };

  if (estatus) {
    query.estatus = estatus;
  }

  if (search) {
    // query.nombre = { $regex: search, $options: 'i' };
    query.$or = [
      { nombre: { $regex: search, $options: 'i' } }
    ];
  }

  try {
    const findDeclaraciones = await DeclaracionesFiscales.paginate(query, options);

    findDeclaraciones.docs.forEach(declaracion => {
      if (declaracion.adjunto.archivo !== '' && fs.existsSync(path.join('src/uploads/declaraciones-fiscales', declaracion.adjunto.archivo))) {
        declaracion.adjunto.archivo = `${APP_URL}/uploads/declaraciones-fiscales/${declaracion.adjunto.archivo}`;
      }
    });
    res.status(200).json({ declaraciones: findDeclaraciones });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const creteDeclaracionFiscal = async (req, res) => {
  const { despacho } = req.params;
  const { nombre, tipo, creadoPor, estatus = 'Pendiente' } = req.body;

  const archivo = req?.file ?? null;

  const tipos = ['Anual', 'Mensual'];

  if (!despacho) {
    return res.status(400).json({ message: 'El despacho es requerido' });
  }

  if (!nombre) {
    return res.status(400).json({ message: 'El nombre es requerido' });
  }

  if (!tipo) {
    return res.status(400).json({ message: 'El tipo es requerido' });
  }

  if (!tipos.includes(tipo)) {
    return res.status(400).json({ message: 'El tipo es inválido' });
  }

  try {
    const adjunto = {
      nombre: '',
      archivo: ''
    };

    if (archivo) {
      adjunto.nombre = archivo.originalname;
      adjunto.archivo = archivo.filename;
    }

    const newDeclaraciones = {
      despacho,
      nombre,
      tipo,
      creadoPor,
      adjunto,
      estatus
    };

    const declaraciones = await DeclaracionesFiscales.create(newDeclaraciones);

    res.status(201).json({ declaraciones });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteDeclaracionFiscal = async (req, res) => {
  const { id } = req.params;
  try {
    const declaracion = await DeclaracionesFiscales.findByIdAndDelete(id);
    if (declaracion.adjunto.archivo !== '' && fs.existsSync(path.join('src/uploads/declaraciones-fiscales', declaracion.adjunto.archivo))) {
      fs.unlinkSync(path.join('src/uploads/declaraciones-fiscales', declaracion.adjunto.archivo));
    }
    res.status(200).json({ message: 'Declaración eliminada' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDeclaracionFiscalById = async (req, res) => {
  const { id } = req.params;
  try {
    const declaracion = await DeclaracionesFiscales.findById(id);
    if (declaracion.adjunto.archivo !== '' && fs.existsSync(path.join('src/uploads/declaraciones-fiscales', declaracion.adjunto.archivo))) {
      declaracion.adjunto.archivo = `${APP_URL}/uploads/declaraciones-fiscales/${declaracion.adjunto.archivo}`;
    }
    res.status(200).json({ declaracion });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateDeclaracionFiscal = async (req, res) => {
  const { id } = req.params;
  const { nombre, tipo, creadoPor, estatus = 'Pendiente' } = req.body;
  const archivo = req?.file ?? null;
  const tipos = ['Anual', 'Mensual'];
  if (!nombre) {
    return res.status(400).json({ message: 'El nombre es requerido' });
  }
  if (!tipo) {
    return res.status(400).json({ message: 'El tipo es requerido' });
  }
  if (!tipos.includes(tipo)) {
    return res.status(400).json({ message: 'El tipo es inválido' });
  }
  try {
    if (archivo) {
      const declaracion = await DeclaracionesFiscales.findById(id);
      if (declaracion.adjunto.archivo !== '' && fs.existsSync(path.join('src/uploads/declaraciones-fiscales', declaracion.adjunto.archivo))) {
        fs.unlinkSync(path.join('src/uploads/declaraciones-fiscales', declaracion.adjunto.archivo));
      }

      const adjunto = {
        nombre: '',
        archivo: ''
      };
      adjunto.nombre = archivo.originalname;
      adjunto.archivo = archivo.filename;

      declaracion.adjunto = adjunto;
      await declaracion.save();

      // Eliminar archivo anterior
    }
    const newDeclaraciones = {
      nombre,
      tipo,
      creadoPor,
      estatus
    };
    const declaraciones = await DeclaracionesFiscales.findByIdAndUpdate(id, newDeclaraciones, { new: true });
    res.status(201).json({ declaraciones });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

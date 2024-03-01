import ExpedientesDocumentosModel from '../models/ExpedientesAdjuntos.js';
import fs from 'fs';
import path from 'path';
const APP_URL = process.env.APP_URL;

export const getDocumetnos = async (req, res) => {
  const { despacho, expediente } = req.params;
  const { page = 1 } = req.query;

  const options = {
    page,
    limit: 20,
    sort: { fecha: -1 },
    populate: 'creadoPor'

  };

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

  try {
    const documentos = await ExpedientesDocumentosModel.paginate(query, options);

    documentos.docs.forEach(documento => {
      // if (documento.creadoPor.foto !== '' && fs.existsSync(path.join('src/uploads/usuarios', documento.creadoPor.foto))) {
      //   documento.creadoPor.foto = `${APP_URL}/uploads/usuarios/${documento.creadoPor.foto}`;
      // } else {
      //   documento.creadoPor.foto = `${APP_URL}/uploads/default/icono_usuario_100x100_04.jpg`;
      // }

      if (documento.archivo) {
        documento.archivo = `${APP_URL}/uploads/documentos/${documento.archivo}`;
      }
    });

    res.status(200).json({ documentos });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createDocumentos = async (req, res) => {
  const { despacho, usuario, expediente } = req.params;

  const documentos = req?.files ?? [];

  if (!despacho) {
    return res.status(400).json({ message: 'El despacho es requerido' });
  }

  if (!usuario) {
    return res.status(400).json({ message: 'El usuario es requerido' });
  }

  if (!expediente) {
    return res.status(400).json({ message: 'El expediente es requerido' });
  }

  if (documentos.length === 0) {
    return res.status(400).json({ message: 'Los documentos son requeridos' });
  }

  const expedientesDocumentos = documentos.map(documento => {
    return {
      despacho,
      expediente,
      nombre: documento.originalname,
      archivo: documento.filename,
      fecha: new Date(),
      creadoPor: usuario
    };
  });

  try {
    await ExpedientesDocumentosModel.insertMany(expedientesDocumentos);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  res.status(200).json({ message: 'Documentos creados' });
};

export const deleteDocumento = async (req, res) => {
  const { _id } = req.params;
  try {
    const documento = await ExpedientesDocumentosModel.findById(_id);
    if (documento.archivo && fs.existsSync(path.join('src/uploads/documentos', documento.archivo))) {
      fs.unlinkSync(path.join('src/uploads/documentos', documento.archivo));
    }
    await ExpedientesDocumentosModel.findByIdAndRemove(_id);
    res.status(200).json({ message: 'Documento eliminado' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

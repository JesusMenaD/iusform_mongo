const Despacho = require('../models/Despachos.js');
const path = require('path');
const { deleteFile } = require('../config/FuntionGlobal.js');
const APP_URL = process.env.APP_URL;

const ConfiguracionesDespacho = async (req, res) => {
  const { despacho } = req.params;

  if (!despacho) return res.status(404).json({ message: 'Despacho no encontrado' });

  try {
    const findDespacho = await Despacho.findById(despacho);

    if (!findDespacho) return res.status(404).json({ message: 'Despacho no encontrado' });

    if (findDespacho.logo) {
      findDespacho.logo = `${APP_URL}/uploads/despachos/${findDespacho.logo}`;
    }

    res.status(200).json({ despacho: findDespacho });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const actualizarDespacho = async (req, res) => {
  const { despacho } = req.params;
  const { nombre, correo, direccion, telefono, razonSocial, rfc, cRegimenFiscal, lugarExpedicion, serie, numeroCertificado, clavePrivada, estado } = req.body;

  if (!despacho) return res.status(404).json({ message: 'Despacho no encontrado' });

  const logo = req.files?.logo ?? null;
  const certificado = req.files?.certificado ?? null;
  const llave = req.files?.llave ?? null;

  try {
    const findDespacho = await Despacho.findById(despacho);

    if (!findDespacho) return res.status(404).json({ message: 'Despacho no encontrado' });

    const updateDespacho = await Despacho.findByIdAndUpdate(despacho, {
      nombre,
      correo,
      direccion,
      telefono,
      razonSocial,
      rfc,
      cRegimenFiscal,
      lugarExpedicion,
      serie,
      numeroCertificado,
      clavePrivada,
      estado
    }, { new: true });

    if (logo !== null || certificado !== null || llave !== null) {
      if (logo !== null) {
        // Delete previous logo
        if (findDespacho.logo) {
          const folderPath = path.join('src/uploads/despachos', findDespacho.logo);
          deleteFile(folderPath);
        }
        updateDespacho.logo = logo[0].filename;
      }

      if (certificado !== null) {
        updateDespacho.certificado = certificado[0].filename;
      }

      if (llave !== null) {
        updateDespacho.llave = llave[0].filename;
      }

      await updateDespacho.save();
    }

    if (updateDespacho.logo) {
      updateDespacho.logo = `${APP_URL}/uploads/despachos/${updateDespacho.logo}`;
    }
    res.status(200).json({
      despacho: updateDespacho,
      message: 'Despacho actualizado con éxito'
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const planActual = async (req, res) => {
  const { despacho } = req.params;

  if (!despacho) return res.status(404).json({ message: 'Despacho no encontrado' });

  try {
    const findDespacho = await Despacho.findById(despacho);

    if (!findDespacho) return res.status(404).json({ message: 'Despacho no encontrado' });

    const { vigencia } = findDespacho;

    const fechaActual = new Date();

    const alerta = {
      planActual: '',
      diasRestantes: 0,
      fechaVigencia: ''
    };
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  ConfiguracionesDespacho,
  actualizarDespacho
};

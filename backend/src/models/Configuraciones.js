import { Schema, model } from 'mongoose';

const ConfiguracionesSchema = new Schema({
  RazonSocial: {
    type: String,
    required: true
  },
  rfc: {
    type: String,
    required: true
  },
  regimenFiscal: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  lugarExpedicion: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  serie: {
    type: String,
    required: true
  },
  numeroCertificado: {
    type: String,
    required: true
  },
  archivoKey: {
    type: String,
    required: true
  },
  clavePrivada: {
    type: String,
    required: true
  },
  archivoCerPem: {
    type: String,
    required: true
  },
  archivoKeyPem: {
    type: String,
    required: true
  }
}, {
  versionKey: false
});

export default model('configuraciones', ConfiguracionesSchema);

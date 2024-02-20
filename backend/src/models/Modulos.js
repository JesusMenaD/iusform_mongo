import { Schema, model } from 'mongoose';

const ModulosSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  enlace: {
    type: String,
    required: true,
    index: true
  },
  imagen: {
    type: String,
    required: true
  },
  orden: {
    type: Number,
    required: true
  },
  padre: {
    type: String,
    default: ''
  },
  estatus: {
    type: String,
    enum: ['Activo', 'Inactivo'],
    required: true,
    index: true,
    default: 'Activo'
  },
  tipo: {
    type: String,
    enum: ['admin', 'despacho'],
    default: 'admin',
    index: true
  }
}, {
  versionKey: false
});

export default model('modulos', ModulosSchema);

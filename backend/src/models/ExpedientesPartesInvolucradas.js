import { Schema, model } from 'mongoose';

const ExpedientesPartesInvolucradas = new Schema({
  despacho: {
    type: Schema.Types.ObjectId,
    ref: 'despachos',
    required: true
  },
  expediente: {
    type: Schema.Types.ObjectId,
    ref: 'expedientes',
    required: true
  },
  tipo: {
    type: String,
    required: true
  },
  sujeto: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    required: true
  },
  telefono: {
    type: String,
    required: true
  },
  comentario: {
    type: String,
    required: true
  }

}, {
  versionKey: false
});

export default model('expedientesPartesInvolucradas', ExpedientesPartesInvolucradas);

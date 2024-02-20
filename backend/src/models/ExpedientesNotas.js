import { Schema, model } from 'mongoose';

const ExpedientesNotas = new Schema({
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
  creadoPor: {
    type: Schema.Types.ObjectId,
    ref: 'usuarios',
    required: true
  },
  fecha: {
    type: Date,
    required: true
  },
  comentario: {
    type: String,
    required: true
  }

}, {
  versionKey: false
});

export default model('expedientesGastos', ExpedientesNotas);

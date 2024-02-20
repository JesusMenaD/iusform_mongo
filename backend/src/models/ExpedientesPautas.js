import { Schema, model } from 'mongoose';

const ExpedientesPautasSchema = new Schema({
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
  nombre: {
    type: String,
    required: true
  },
  documento: {
    type: String,
    required: true
  }
}, {
  versionKey: false
});

export default model('expedientesPautas', ExpedientesPautasSchema);

import { Schema, model } from 'mongoose';

const ExpedientesAdjuntosSchema = new Schema({
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
  archivo: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    required: true
  }
}, {
  versionKey: false
});

export default model('expedientesAdjuntos', ExpedientesAdjuntosSchema);

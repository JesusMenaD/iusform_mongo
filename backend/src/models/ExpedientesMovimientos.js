import { Schema, model } from 'mongoose';

const ExpedientesMovimientos = new Schema({
  despacho: {
    type: Schema.Types.ObjectId,
    ref: 'despachos',
    required: true,
    index: true
  },
  expediente: {
    type: Schema.Types.ObjectId,
    ref: 'expedientes',
    required: true,
    index: true
  },
  creadoPor: {
    type: Schema.Types.ObjectId,
    ref: 'usuarios',
    required: true,
    index: true
  },
  fecha: {
    type: Date,
    required: true
  },
  titulo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  }
}, {
  versionKey: false
});

export default model('expedientesMovimientos', ExpedientesMovimientos);

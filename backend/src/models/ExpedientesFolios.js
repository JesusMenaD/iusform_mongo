import { Schema, model } from 'mongoose';

const FoliosSchema = new Schema({
  despacho: {
    type: Schema.Types.ObjectId,
    ref: 'despachos',
    required: true
  },
  materia: {
    nombre: {
      type: String,
      required: false,
      default: ''
    },
    materia: {
      type: Schema.Types.ObjectId,
      ref: 'materias',
      required: true,
      index: true
    }
  },
  clave: {
    type: String,
    required: true
  },
  folio: {
    type: Number,
    required: true
  },
  creadoPor: {
    type: Schema.Types.ObjectId,
    ref: 'usuarios',
    required: true
  },
  versionKey: false
});

export default model('folios', FoliosSchema);

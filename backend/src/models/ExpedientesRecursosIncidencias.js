import { Schema, model } from 'mongoose';

const ExpedientesRecursosIncidenciasSchema = new Schema({
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
    enum: ['Recurso', 'Incidencia'],
    required: true,
    index: true
  },
  recursoIncidencia: {
    type: Schema.Types.ObjectId,
    ref: 'recursosIncidencias',
    required: true
  },
  opcional: {
    type: String,
    required: true,
    default: ''
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

export default model('expedienteRecursosIncidencia', ExpedientesRecursosIncidenciasSchema);

import { Schema, model } from 'mongoose';

const RecursosIncidencias = new Schema({
  nombre: {
    type: String,
    required: true
  },
  materia: {
    type: Schema.Types.ObjectId,
    ref: 'materias',
    required: true
  },
  tipo: {
    type: String,
    enum: ['Recurso', 'Incidencia'],
    required: true
  },
  estatus: {
    type: String,
    enum: ['Activo', 'Inactivo'],
    default: 'Activo'
    // required: true
  }
}, {
  versionKey: false
});

export default model('recursosIncidencias', RecursosIncidencias);

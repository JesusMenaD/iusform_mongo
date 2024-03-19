const { Schema, model } = require('mongoose');

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

module.exports = model('recursosIncidencias', RecursosIncidencias);

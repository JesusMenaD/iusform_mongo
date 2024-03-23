const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ExpedientesRecursosIncidenciasSchema = new Schema({
  despacho: {
    type: Schema.Types.ObjectId,
    ref: 'despachos',
    required: true,
    index: true
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
    required: false
  },
  opcional: {
    type: String,
    required: false,
    default: ''
  },
  creadoPor: {
    type: Schema.Types.ObjectId,
    ref: 'usuarios',
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now,
    required: true
  },
  comentario: {
    type: String,
    required: false,
    default: ''
  }

}, {
  versionKey: false
});

ExpedientesRecursosIncidenciasSchema.plugin(mongoosePaginate);

module.exports = model('expedienteRecursosIncidencia', ExpedientesRecursosIncidenciasSchema);

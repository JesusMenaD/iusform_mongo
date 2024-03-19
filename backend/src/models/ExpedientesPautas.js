const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ExpedientesPautasSchema = new Schema({
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
  nombre: {
    type: String,
    required: true
  },
  documento: {
    type: String,
    required: false,
    default: ''
  },
  ultimoMovimiento: {
    type: Date,
    required: false
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  creadoPor: {
    type: Schema.Types.ObjectId,
    ref: 'usuarios',
    required: true
  },
  editadoPor: {
    type: Schema.Types.ObjectId,
    ref: 'usuarios',
    required: false
  }
}, {
  versionKey: false
});

ExpedientesPautasSchema.plugin(mongoosePaginate);
module.exports = model('expedientesPautas', ExpedientesPautasSchema);

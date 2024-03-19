const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ExpedientesPartesInvolucradas = new Schema({
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
  tipo: {
    type: String,
    enum: ['Demandante', 'Demandado'],
    required: true
  },
  sujeto: {
    type: String,
    default: ''
  },
  nombre: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    default: ''
  },
  fecha: {
    type: Date,
    required: true,
    default: Date.now
  },
  telefono: {
    type: String,
    default: ''
  },
  comentario: {
    type: String,
    default: ''
  }
}, {
  versionKey: false
});

ExpedientesPartesInvolucradas.plugin(mongoosePaginate);
module.exports = model('expedientesPartesInvolucradas', ExpedientesPartesInvolucradas);

const { Schema, model } = require('mongoose');

const Suscripciones = new Schema({
  despacho: {
    type: Schema.Types.ObjectId,
    ref: 'despachos',
    required: true
  },
  fechaInicio: {
    type: Date,
    required: true,
    default: Date.now
  },
  fechaFin: {
    type: Date,
    required: true
  },
  estatus: {
    type: String,
    enum: ['Vigente', 'Cancelada'],
    required: true,
    default: 'Vigente'
  },
  creadoPor: {
    type: Schema.Types.ObjectId,
    ref: 'usuarios',
    required: true
  },
  canceladoPor: {
    type: Schema.Types.ObjectId,
    ref: 'usuarios',
    required: false
  },
  observaciones: {
    type: String,
    required: false,
    default: ''
  },
  producto: {
    type: Schema.Types.ObjectId,
    ref: 'productos',
    required: true
  },
  precio: {
    type: Number,
    required: true
  }

}, {
  versionKey: false
});

module.exports = model('suscripciones', Suscripciones);

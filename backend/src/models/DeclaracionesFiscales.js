const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const DeclaracionesFiscales = new Schema({
  despacho: {
    type: Schema.Types.ObjectId,
    ref: 'despachos',
    required: true,
    index: true
  },
  nombre: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    enum: ['Anual', 'Mensual'],
    required: true
  },
  creadoPor: {
    type: Schema.Types.ObjectId,
    ref: 'usuarios',
    required: true,
    index: true
  },
  adjunto: {
    nombre: {
      type: String,
      required: false,
      default: ''
    },
    archivo: {
      type: String,
      required: false,
      default: ''
    }
  },
  fecha: {
    type: Date,
    required: true,
    default: Date.now
  },
  estatus: {
    type: String,
    required: false,
    enum: ['Pendiente', 'Aceptado', 'Rechazado'],
    default: 'Pendiente'
  }
}, {

  versionKey: false
});

DeclaracionesFiscales.plugin(mongoosePaginate);

module.exports = model('declaracionesFiscales', DeclaracionesFiscales);

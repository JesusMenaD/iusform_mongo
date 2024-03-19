const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ExpedientesGastosSchema = new Schema({
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
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'usuarios',
    required: true
  },
  tipo: {
    type: String,
    enum: ['Gasto', 'Ingreso'],
    required: true,
    default: 'Gasto',
    index: true
  },
  fecha: {
    type: Date,
    required: true,
    default: Date.now
  },
  concepto: {
    type: String,
    required: true
  },
  importe: {
    type: Number,
    required: true,
    default: 0
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
  }
}, {
  versionKey: false
});

ExpedientesGastosSchema.plugin(mongoosePaginate);

module.exports = model('expedientesGastos', ExpedientesGastosSchema);

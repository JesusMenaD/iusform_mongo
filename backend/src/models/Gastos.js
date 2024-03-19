const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const GastosSchema = new Schema({
  despacho: {
    type: Schema.Types.ObjectId,
    ref: 'despachos',
    required: true
  },
  cuentaBancaria: {
    type: Schema.Types.ObjectId,
    ref: 'cuentasBancarias',
    required: false
  },
  conceptos: [
    {
      concepto: {
        type: String,
        required: true
      },
      importe: {
        type: Number,
        required: true
      }
    }
  ],
  fecha: {
    type: Date,
    required: false,
    default: Date.now
  },
  total: {
    type: Number,
    required: true
  },
  referencia: {
    type: String,
    required: true

  },
  creadoPor: {
    type: Schema.Types.ObjectId,
    ref: 'usuarios',
    required: true
  },
  comentario: {
    type: String,
    required: false,
    default: ''
  },
  estatus: {
    type: String,
    enum: ['Vigente', 'Cancelado'],
    required: true,
    default: 'Vigente'
  }
}, {
  versionKey: false
});

GastosSchema.plugin(mongoosePaginate);
module.exports = model('gastos', GastosSchema);

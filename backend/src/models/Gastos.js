import { Schema, model } from 'mongoose';

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
      precio: {
        type: Number,
        required: true
      }
    }
  ],
  fecha: {
    type: Date,
    required: true
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
    required: true
  },
  estatus: {
    type: String,
    enum: ['Vigente', 'Cancelado'],
    required: true,
    default: 'Pendiente'
  }
}, {
  versionKey: false
});

export default model('gastos', GastosSchema);

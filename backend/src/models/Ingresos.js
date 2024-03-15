import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const IngresosSchema = new Schema({
  despacho: {
    type: Schema.Types.ObjectId,
    ref: 'despachos',
    required: true
  },
  concepto: {
    type: String,
    required: true
  },
  cuentaBancaria: {
    type: Schema.Types.ObjectId,
    ref: 'cuentasBancarias',
    required: false
  },
  importe: {
    type: Number,
    required: true
  },
  fecha: {
    type: Date,
    required: false,
    default: Date.now
  },
  cliente: {
    type: Schema.Types.ObjectId,
    ref: 'clientes',
    required: false
  },
  referencia: {
    titulo: {
      type: String,
      required: true,
      default: ''
    },
    tipo: {
      type: String,
      enum: ['Ninguno', 'Expediente'],
      required: true,
      default: 'Ninguno'
    },
    expediente: {
      type: Schema.Types.ObjectId,
      ref: 'expedientes',
      required: false
    }
  },
  estatus: {
    type: String,
    enum: ['Vigente', 'Facturado', 'Cancelado'],
    required: true,
    default: 'Vigente'
  },
  observaciones: {
    type: String,
    required: false,
    default: ''
  },
  factura: {
    type: String,
    required: false,
    default: ''
  }
}, {
  versionKey: false
});

IngresosSchema.plugin(mongoosePaginate);

export default model('ingresos', IngresosSchema);

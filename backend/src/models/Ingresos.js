import { Schema, model } from 'mongoose';

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
  precio: {
    type: Number,
    required: true
  },
  fecha: {
    type: Date,
    required: true
  },
  referencia: {
    titulo: {
      type: String,
      required: true,
      default: 'Ingreso'
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
    default: 'Pendiente'
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
  factura: {
    type: String,
    required: false,
    default: ''
  }

}, {
  versionKey: false
});

export default model('ingresos', IngresosSchema);

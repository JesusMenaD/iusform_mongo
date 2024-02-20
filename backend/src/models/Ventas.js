import { Schema, model } from 'mongoose';

const VentasSchema = new Schema({
  despacho: {
    type: Schema.Types.ObjectId,
    ref: 'despachos',
    required: true
  },
  fechaVenta: {
    type: Date,
    required: true,
    default: Date.now
  },
  producto: {
    type: Schema.Types.ObjectId,
    ref: 'productos',
    required: true
  },
  importe: {
    type: Number,
    required: true
  },
  fecha_pago: {
    type: Date,
    required: true
  },
  formaPago: {
    type: String,
    required: false,
    default: ''
  },
  referencia: {
    type: String,
    required: false,
    default: ''
  },
  estatus: {
    type: String,
    enum: ['Pagado', 'Pendiente', 'Facturada'],
    required: true,
    default: 'Pendiente'
  }

}, {
  versionKey: false
});

export default model('ventas', VentasSchema);

const { Schema, model } = require('mongoose');

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
    required: false
  },
  formaPago: {
    type: String,
    required: false,
    default: ''
  },
  referencia: { // order conekta
    type: String,
    required: false,
    default: '',
    index: true
  },
  tipoReferencia: {
    type: String,
    required: false,
    enum: ['Conekta', 'Paypal', 'Oxxo', 'Tarjeta', 'Efectivo']

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

module.exports = model('ventas', VentasSchema);

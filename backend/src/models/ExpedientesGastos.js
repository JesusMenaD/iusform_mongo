import { Schema, model } from 'mongoose';

const ExpedientesGastosSchema = new Schema({
  despacho: {
    type: Schema.Types.ObjectId,
    ref: 'despachos',
    required: true
  },
  expediente: {
    type: Schema.Types.ObjectId,
    ref: 'expedientes',
    required: true
  },
  tipo: {
    type: String,
    enum: ['Gasto', 'Ingreso'],
    required: true
  },
  fecha: {
    type: Date,
    required: true
  },
  concepto: {
    type: String,
    required: true
  },
  importe: {
    type: Number,
    required: true
  },
  adjunto: {
    nombre: {
      type: String,
      required: false
    },
    archivo: {
      type: String,
      required: false
    }
  }
}, {
  versionKey: false
});

export default model('expedientesGastos', ExpedientesGastosSchema);

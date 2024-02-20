import { Schema, model } from 'mongoose';

const MovimientosBancosSchema = new Schema({
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
  afectacion: {
    type: String,
    enum: ['Cargo', 'Abono'],
    required: true
  },
  fecha: {
    type: Date,
    required: true
  },
  ligadoa:
  {
    type: String,
    enum: ['Ingreso', 'Egreso', 'Otro'],
    required: true
  },
  folioLiga: {
    gasto: {
      type: Schema.Types.ObjectId,
      ref: 'gastos',
      required: false
    },
    ingreso: {
      type: Schema.Types.ObjectId,
      ref: 'ingresos',
      required: false
    }
  },
  concepto: {
    type: String,
    required: true
  },
  importe: {
    type: Number,
    required: true
  },
  estatus: {
    type: String,
    enum: ['Aplicado', 'Pendiente', 'Cancelado'],
    required: true,
    default: 'Pendiente'
  }

}, {
  versionKey: false
});

export default model('movimientosBancos', MovimientosBancosSchema);

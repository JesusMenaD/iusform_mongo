import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

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
    required: false,
    default: Date.now
  },
  ligadoa:
  {
    type: String,
    enum: ['Ingreso', 'Egreso', 'Otro'],
    required: true
  },
  folioLiga: {
    gasto: { // cuando ligadoa = egreso = gasto
      type: Schema.Types.ObjectId,
      ref: 'gastos',
      required: false
    },
    ingreso: { // cuando ligadoa = ingreso = ingreso
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

MovimientosBancosSchema.plugin(mongoosePaginate);
export default model('movimientosBancos', MovimientosBancosSchema);

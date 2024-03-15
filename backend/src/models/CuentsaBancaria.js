import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const CuentasBancarias = new Schema({
  despacho: {
    type: Schema.Types.ObjectId,
    ref: 'despachos',
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  banco: {
    type: Schema.Types.ObjectId,
    ref: 'bancos',
    required: true
  },
  numeroCuenta: {
    type: String,
    required: false,
    default: ''

  },
  clave: {
    type: String,
    required: false,
    default: ''
  },
  saldoInicial: {
    type: Number,
    required: false,
    default: 0
  },
  estatus: {
    type: String,
    enum: ['Activo', 'Inactivo'],
    required: true,
    default: 'Activo'
  }
}, {
  versionKey: false
});

CuentasBancarias.plugin(mongoosePaginate);
export default model('cuentasBancarias', CuentasBancarias);

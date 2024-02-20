import { Schema, model } from 'mongoose';

const CuentasBancarias = new Schema({
  despacho: {
    type: Schema.Types.ObjectId,
    ref: 'despachos',
    required: true
  },
  alias: {
    type: String,
    required: true
  },
  banco: {
    type: Schema.Types.ObjectId,
    ref: 'bancos',
    required: true
  },
  numeroCuota: {
    type: Number,
    required: true
  },
  clave: {
    type: String,
    required: true
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

export default model('cuentasBancarias', CuentasBancarias);

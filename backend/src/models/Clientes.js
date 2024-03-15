import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const ClientesSchema = new Schema({
  despacho: {
    type: Schema.Types.ObjectId,
    ref: 'despachos',
    required: true
  },
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  direccion: {
    type: String,
    required: false,
    default: ''
  },
  estado: {
    type: Schema.Types.ObjectId,
    ref: 'estados',
    required: false
  },
  correo: {
    type: String,
    required: false,
    default: ''
  },
  telefono: {
    type: String,
    required: false,
    default: ''
  },
  rfc: {
    type: String,
    required: false,
    default: ''
  },
  razonSocial: {
    type: String,
    required: false,
    default: ''
  },
  regimenFiscal: {
    type: String,
    required: false,
    default: ''
  },
  domicilioFiscal: {
    type: String,
    required: false,
    default: ''
  },
  observaciones: {
    type: String,
    required: false,
    default: ''
  },
  creadoPor: {
    type: Schema.Types.ObjectId,
    ref: 'usuarios',
    required: false
  },
  estatus: {
    type: String,
    enum: ['Activo', 'Inactivo'],
    required: true,
    default: 'Activo',
    index: true
  }
}, {
  versionKey: false
});

ClientesSchema.plugin(mongoosePaginate);

export default model('clientes', ClientesSchema);

import { Schema, model } from 'mongoose';

const UsuariosSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  apellidoPaterno: {
    type: String,
    required: false,
    default: '',
    trim: true
  },
  apellidoMaterno: {
    type: String,
    required: false,
    default: '',
    trim: true
  },
  telefono: {
    type: String,
    required: false,
    default: '',
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  foto: {
    type: String,
    required: false,
    default: ''
  },
  tipoUsuario: {
    type: Schema.Types.ObjectId,
    ref: 'tipoUsuarios',
    required: true,
    index: true
  },
  tipo: {
    type: String,
    required: true,
    enum: ['admin', 'despacho'],
    default: 'admin',
    index: true
  },
  token: {
    type: String,
    required: false,
    default: ''
  },
  despacho: {
    type: Schema.Types.ObjectId,
    ref: 'despachos',
    required: false,
    index: true
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

export default model('usuarios', UsuariosSchema);

const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const UsuariosSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  clave: { // Clave de usuario para el despacho o administrador del sistema
    type: String,
    required: true,
    trim: true,
    index: true,
    default: ''
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
  conekta: {
    id: {
      type: String,
      required: false
    }
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

UsuariosSchema.plugin(mongoosePaginate);
module.exports = model('usuarios', UsuariosSchema);

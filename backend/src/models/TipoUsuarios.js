import { Schema, model } from 'mongoose';

const TipoUsuarioSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    required: true,
    enum: ['admin', 'despacho'],
    default: 'Administrador'
  },
  modulos: [{
    modulo: {
      type: Schema.Types.ObjectId,
      ref: 'modulos',
      required: true
    },
    permisos: {
      create: { type: Boolean, default: false },
      read: { type: Boolean, default: false },
      update: { type: Boolean, default: false },
      delete: { type: Boolean, default: false },
      download: { type: Boolean, default: false }
    }
  }]
}, {
  versionKey: false
});

export default model('tipoUsuarios', TipoUsuarioSchema);

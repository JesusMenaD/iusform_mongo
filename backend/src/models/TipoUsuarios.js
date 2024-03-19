const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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
  despacho: {
    type: Schema.Types.ObjectId,
    ref: 'despachos',
    required: false,
    index: true
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

TipoUsuarioSchema.plugin(mongoosePaginate);
module.exports = model('tipoUsuarios', TipoUsuarioSchema);

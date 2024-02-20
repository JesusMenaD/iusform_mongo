import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const ExpedientesUsuarios = new Schema({
  despacho: {
    type: Schema.Types.ObjectId,
    ref: 'despachos',
    required: true,
    index: true
  },
  expediente: {
    type: Schema.Types.ObjectId,
    ref: 'expedientes',
    required: true,
    index: true
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'usuarios',
    required: true,
    index: true
  },
  rol: {
    type: String,
    enum: ['Creador', 'Editor', 'Lector'],
    required: true
  },
  notificaciones: {
    type: Boolean,
    required: true,
    default: true
  }
}, {
  versionKey: false
});

ExpedientesUsuarios.plugin(mongoosePaginate);
export default model('expedientesUsuarios', ExpedientesUsuarios);

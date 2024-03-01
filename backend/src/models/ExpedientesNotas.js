import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const ExpedientesNotas = new Schema({
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
  creadoPor: {
    type: Schema.Types.ObjectId,
    ref: 'usuarios',
    required: true,
    index: true
  },
  fecha: {
    type: Date,
    required: true,
    default: Date.now,
    index: true
  },
  editado: {
    type: Boolean,
    default: false
  },
  comentario: {
    type: String,
    required: true
  }
}, {
  versionKey: false
});

ExpedientesNotas.plugin(mongoosePaginate);

export default model('expedientesNotas', ExpedientesNotas);

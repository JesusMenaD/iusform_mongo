import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const ExpedientesAdjuntosSchema = new Schema({
  despacho: {
    type: Schema.Types.ObjectId,
    ref: 'despachos',
    required: true
  },
  expediente: {
    type: Schema.Types.ObjectId,
    ref: 'expedientes',
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  archivo: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    required: true
  },
  creadoPor: {
    type: Schema.Types.ObjectId,
    ref: 'usuarios',
    required: true
  }
}, {
  versionKey: false
});

ExpedientesAdjuntosSchema.plugin(mongoosePaginate);

export default model('expedientesAdjuntos', ExpedientesAdjuntosSchema);

import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const FoliosSchema = new Schema({
  despacho: {
    type: Schema.Types.ObjectId,
    ref: 'despachos',
    required: true
  },
  materia: {
    type: Schema.Types.ObjectId,
    ref: 'materias',
    required: true,
    index: true
  },
  clave: {
    type: String,
    required: true
  },
  folio: {
    type: Number,
    required: true
  },
  creadoPor: {
    type: Schema.Types.ObjectId,
    ref: 'usuarios',
    required: true
  },
  versionKey: false
});

FoliosSchema.plugin(mongoosePaginate);
export default model('folios', FoliosSchema);

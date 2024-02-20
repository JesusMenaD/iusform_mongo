import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const JuzgadosSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    required: false,
    default: ''
  },
  direccion: {
    type: String,
    required: false,
    default: ''
  },
  estado: {
    type: Schema.Types.ObjectId,
    ref: 'estados',
    required: true
  },
  telefonos: {
    type: [String],
    required: false,
    default: []
  },
  estatus: {
    type: String,
    enum: ['Activo', 'Inactivo'],
    required: true,
    index: true,
    default: 'Activo'
  }
}, {
  versionKey: false
});

JuzgadosSchema.plugin(mongoosePaginate);

export default model('juzgados', JuzgadosSchema);

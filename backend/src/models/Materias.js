import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const MateriasSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  estatus: {
    type: String,
    enum: ['Activo', 'Inactivo'],
    default: 'Activo',
    required: true,
    index: true
  }
}, {
  versionKey: false
});

MateriasSchema.plugin(mongoosePaginate);
export default model('materias', MateriasSchema);

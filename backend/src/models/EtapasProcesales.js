import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const EtapasProcesalesSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    enum: ['Litigioso', 'No Litigioso'],
    default: 'Litigioso',
    required: true
  },
  materia: {
    type: Schema.Types.ObjectId,
    ref: 'materias',
    required: true
  },
  estatus: {
    type: String,
    enum: ['Activo', 'Inactivo'],
    default: 'Activo',
    required: true
  }
}, {
  versionKey: false
});

EtapasProcesalesSchema.plugin(mongoosePaginate);

export default model('etapasProcesales', EtapasProcesalesSchema);

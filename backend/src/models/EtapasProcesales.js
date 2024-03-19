const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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

module.exports = model('etapasProcesales', EtapasProcesalesSchema);

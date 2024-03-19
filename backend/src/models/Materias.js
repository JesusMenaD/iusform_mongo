const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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
module.exports = model('materias', MateriasSchema);

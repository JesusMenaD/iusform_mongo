const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const DependenciasSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: false,
    default: ''
  },
  liga: {
    type: String,
    required: false,
    default: ''
  },
  estado: {
    type: Schema.Types.ObjectId,
    ref: 'estados',
    required: true
  },
  telefonos: [{
    type: String,
    required: true
  }],
  estatus: {
    type: String,
    enum: ['Activo', 'Inactivo'],
    required: true
  }
}, {
  versionKey: false
});

DependenciasSchema.plugin(mongoosePaginate);
module.exports = model('dependencias', DependenciasSchema);

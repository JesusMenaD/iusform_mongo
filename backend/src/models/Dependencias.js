const { Schema, model } = require('mongoose');

const DependenciasSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
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

module.exports = model('dependencias', DependenciasSchema);

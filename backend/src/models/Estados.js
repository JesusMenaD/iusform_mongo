const { Schema, model } = require('mongoose');
const EstadosSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  clave: {
    type: String,
    required: true
  },
  pais: {
    type: String,
    required: true,
    default: 'México'
  }

}, {
  versionKey: false
});

module.exports = model('estados', EstadosSchema);

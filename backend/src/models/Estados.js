import { Schema, model } from 'mongoose';

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

export default model('estados', EstadosSchema);

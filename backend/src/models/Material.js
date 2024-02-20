import { Schema, model } from 'mongoose';

const MaterialSchema = new Schema({
  Nombre_Mat: {
    type: String,
    MaxLength: 80,
    required: true
  },
  Marca: {
    type: String,
    MaxLength: 80,
    required: true

  },
  Categoria: {
    type: String,
    MaxLength: 50,
    required: true
  },
  UnidadMedida: {
    type: String,
    MaxLength: 50,
    required: true
  }
}, {
  versionKey: false
});
export default model('Material', MaterialSchema);

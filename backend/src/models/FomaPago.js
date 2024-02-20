import { Schema, model } from 'mongoose';

const FormaPagoSchema = new Schema({
  formaPago: {
    type: String,
    required: true,
    trim: true
  },
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  bancarizada: {
    type: String,
    enum: ['Si', 'No', 'Opcional'],
    required: true
  }

}, {
  versionKey: false
});

export default model('formaPago', FormaPagoSchema);

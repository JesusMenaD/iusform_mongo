import { Schema, model } from 'mongoose';

const RegimenFiscales = new Schema({
  regimen: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  fisica: {
    type: String,
    enum: ['Si', 'No'],
    required: true
  },
  moral: {
    type: String,
    enum: ['Si', 'No'],
    required: true
  }
}, {
  versionKey: false
});

export default model('regimenFiscales', RegimenFiscales);

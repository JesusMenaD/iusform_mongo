import { Schema, model } from 'mongoose';

const BancocosSchema = new Schema({
  clave: {
    type: String,
    required: true
  },
  banco: {
    type: String,
    required: true
  }
}, {
  versionKey: false
});

export default model('bancos', BancocosSchema);

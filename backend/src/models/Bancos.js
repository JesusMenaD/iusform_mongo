const { Schema, model } = require('mongoose');

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

module.exports = model('bancos', BancocosSchema);

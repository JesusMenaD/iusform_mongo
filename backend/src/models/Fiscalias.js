const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const FiscaliasSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  liga: {
    type: String,
    required: false,
    default: ''
  },
  direccion: {
    type: String,
    required: false,
    default: ''
  },
  estado: {
    type: Schema.Types.ObjectId,
    ref: 'estados',
    required: true
  },
  estatus: {
    type: String,
    enum: ['Activo', 'Inactivo'],
    required: true
  }

}, {
  versionKey: false
});

FiscaliasSchema.plugin(mongoosePaginate);

module.exports = model('fiscalias', FiscaliasSchema);

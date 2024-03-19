const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const AsuntosSchema = new Schema({
  despacho: {
    type: Schema.Types.ObjectId,
    ref: 'despachos',
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: false,
    default: ''
  },
  estatus: {
    type: String,
    enum: ['Activo', 'Inactivo'],
    required: true,
    index: true,
    default: 'Activo'
  }
}, {
  versionKey: false
});

AsuntosSchema.plugin(mongoosePaginate);

module.exports = model('asuntos', AsuntosSchema);

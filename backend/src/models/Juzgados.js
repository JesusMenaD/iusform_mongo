const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const JuzgadosSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  tipo: {
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
  telefonos: {
    type: [String],
    required: false,
    default: []
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

JuzgadosSchema.plugin(mongoosePaginate);

module.exports = model('juzgados', JuzgadosSchema);

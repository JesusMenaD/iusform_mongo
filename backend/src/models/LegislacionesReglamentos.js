const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const LegislacionesReglamentosSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    index: true
  },
  estado: {
    type: Schema.Types.ObjectId,
    ref: 'estados',
    required: true
  },
  enlace: {
    type: String,
    required: true
  },
  estatus: {
    type: String,
    enum: ['Activo', 'Inactivo'],
    required: true,
    default: 'Activo',
    index: true
  }
}, {
  versionKey: false
});

LegislacionesReglamentosSchema.plugin(mongoosePaginate);
module.exports = model('legislacionesReglamentos', LegislacionesReglamentosSchema);

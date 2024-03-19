const { Schema, model } = require('mongoose');

const LegislacionesReglamentosSchema = new Schema({
  nombre: {
    type: String,
    required: true
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

export default model('legislacionesReglamentos', LegislacionesReglamentosSchema);

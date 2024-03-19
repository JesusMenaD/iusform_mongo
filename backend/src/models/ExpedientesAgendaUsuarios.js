const { Schema, model } = require('mongoose');

const ExpedientesAgendaUsuariosSchema = new Schema({
  despacho: {
    type: Schema.Types.ObjectId,
    ref: 'despachos',
    required: true,
    index: true
  },
  expediente: {
    type: Schema.Types.ObjectId,
    ref: 'expedientes',
    required: false,
    index: true
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'usuarios',
    required: true
  },
  agenda: {
    type: Schema.Types.ObjectId,
    ref: 'expedientesAgenda',
    required: true
  },
  recordar: {
    type: Number,
    required: false,
    default: 0
  },
  fechaRecordatorio: {
    type: Date,
    required: false,
    default: null,
    index: true
  },
  comentario: {
    type: String,
    required: false,
    default: ''
  },
  estatus: {
    type: String,
    enum: ['Pendiente', 'Cancelada', 'Realizada', 'Aceptada', 'Rechazada'],
    required: true,
    default: 'Pendiente'
  }
}, {
  versionKey: false
});

module.exports = model('expedientesAgendaUsuarios', ExpedientesAgendaUsuariosSchema);

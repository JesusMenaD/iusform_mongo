import { Schema, model } from 'mongoose';

const ExpedientesAgendaUsuariosSchema = new Schema({
  despacho: {
    type: Schema.Types.ObjectId,
    ref: 'despachos',
    required: true
  },
  expediente: {
    type: Schema.Types.ObjectId,
    ref: 'expedientes',
    required: true
  },
  usuarios: {
    type: Schema.Types.ObjectId,
    ref: 'usuarios',
    required: true
  },
  fechaRecordatorio: {
    type: Date,
    required: true
  },
  estado: {
    type: String,
    enum: ['Aceptada', 'Rechazada', 'Pendiente'],
    required: true
  }
}, {
  versionKey: false
});

export default model('expedientesAgendaUsuarios', ExpedientesAgendaUsuariosSchema);

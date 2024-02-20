import { Schema, model } from 'mongoose';

const ExpedientesAgendaSchema = new Schema({
  despacho: {
    type: Schema.Types.ObjectId,
    ref: 'despachos',
    required: true
  },
  fecha: {
    type: Date,
    required: true
  },
  hora: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    enum: ['Evento', 'Tarea'],
    required: true
  },
  creadoPor: {
    type: Schema.Types.ObjectId,
    ref: 'usuarios',
    required: true
  },
  asunto: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  fechaCreacion: {
    type: Date,
    required: true,
    default: Date.now
  },
  fechaModificacion: {
    type: Date,
    required: false
  },
  fechaFin: {
    type: Date,
    required: false
  },
  estatus: {
    type: String,
    enum: ['Pendiente', 'Terminada'],
    required: true
  }
}, {
  versionKey: false
});

export default model('expedientesAgenda', ExpedientesAgendaSchema);

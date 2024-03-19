const { Schema, model } = require('mongoose');

const ExpedientesAgendaSchema = new Schema({
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
    default: null,
    index: true
  },
  title: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: false,
    default: ''
  },
  fecha: {
    type: Date,
    required: true,
    index: true
  },
  horaInicio: {
    type: String,
    required: true,
    index: true,
    validate: {
      validator: (v) => {
        const regex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i;
        return regex.test(v);
      },
      message: (props) => `${props.value} no es una hora válida. Formato esperado: "HH:MM AM/PM"`
    }
  },
  horaFin: {
    type: String,
    required: false,
    index: true,
    default: null,
    validate: {
      validator: (v) => {
        if (!v) {
          return true;
        }
        const regex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i;
        return regex.test(v);
      },
      message: (props) => `${props.value} no es una hora válida. Formato esperado: "HH:MM AM/PM"`
    }
  },
  creadoPor: {
    type: Schema.Types.ObjectId,
    ref: 'usuarios',
    required: true
  },
  fechaCreacion: {
    type: Date,
    required: true,
    default: Date.now
  },
  estatus: {
    type: String,
    enum: ['Aceptada', 'Rechazada', 'Pendiente', 'Cancelada', 'Realizada'],
    required: true,
    default: 'Pendiente'
  }
}, {
  versionKey: false
});

module.exports = model('expedientesAgenda', ExpedientesAgendaSchema);

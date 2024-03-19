const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ExpedientesSchema = new Schema({
  despacho: {
    type: Schema.Types.ObjectId,
    ref: 'despachos',
    required: true,
    index: true
  },
  procedimiento: {
    type: String,
    enum: ['Litigioso', 'No litigioso'],
    required: true,
    index: true
  },
  numeroExpediente: {
    type: String,
    required: false,
    default: '',
    index: true
  },
  numeroExpedienteInterno: {
    type: String,
    required: false,
    default: '',
    index: true
  },
  titulo: {
    type: String,
    required: true,
    index: true
  },
  fechaInicio: {
    type: Date,
    required: true,
    default: Date.now,
    index: true
  },
  fechaTermino: {
    type: Date,
    required: false
  },
  cliente: {
    type: Schema.Types.ObjectId,
    ref: 'clientes',
    required: true
  },
  asunto: {
    type: Schema.Types.ObjectId,
    ref: 'asuntos',
    required: true
  },
  juzgado: {
    nombre: {
      type: String,
      required: true
    },
    juzgado: {
      type: Schema.Types.ObjectId,
      ref: 'juzgados',
      required: true,
      index: true
    }
  },
  materia: {
    nombre: {
      type: String,
      required: false,
      default: ''
    },
    materia: {
      type: Schema.Types.ObjectId,
      ref: 'materias',
      required: false,
      index: true
    }
  },
  etapaProcesal: {
    nombre: {
      type: String,
      required: false,
      default: ''
    },
    etapa: {
      type: Schema.Types.ObjectId,
      ref: 'etapasProcesales',
      required: false
    }
  },
  ultimoMovimiento: {
    type: Date,
    required: false,
    default: Date.now
  },
  ultimoCambio: {
    type: Date,
    required: false,
    default: Date.now
  },
  creadoPor: {
    type: Schema.Types.ObjectId,
    ref: 'usuarios',
    required: true
  },
  estatus: {
    type: String,
    enum: ['Activo', 'Inactivo', 'Concluido', 'Suspendido'],
    default: 'Activo',
    required: true,
    index: true
  }
}, {
  versionKey: false
});

ExpedientesSchema.plugin(mongoosePaginate);
module.exports = model('expedientes', ExpedientesSchema);

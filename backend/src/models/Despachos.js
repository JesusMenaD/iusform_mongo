const { Schema, model } = require('mongoose');

const DespachosSchema = new Schema({
  contadorExp: {
    contador: {
      type: Number,
      required: false,
      default: 0
    },
    limite: {
      type: Number,
      required: false,
      default: 0
    },
    vigencia: {
      type: Date,
      required: true
    }
  },
  contadorTimbres: {
    contador: {
      type: Number,
      required: false,
      default: 0
    },
    limite: {
      type: Number,
      required: false,
      default: 0
    },
    vigencia: {
      type: Date,
      required: false,
      default: null
    }
  },
  nombre: {
    type: String,
    required: false,
    default: ''
  },
  direccion: {
    type: String,
    required: false,
    default: ''
  },
  creadoPor: {
    type: Schema.Types.ObjectId,
    ref: 'usuarios',
    required: true
  },
  estado: {
    type: Schema.Types.ObjectId,
    ref: 'estados',
    required: true
  },
  correo: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: false,
    default: ''
  },
  razonSocial: {
    type: String,
    required: false,
    default: ''
  },
  rfc: {
    type: String,
    required: false,
    default: ''
  },
  c_regimenfiscal: {
    type: String,
    required: false,
    default: ''
  },
  lugarExpedicion: {
    type: String,
    required: false,
    default: ''
  },
  logo: {
    type: String,
    required: false,
    default: ''
  },
  serie: {
    type: String,
    required: false,
    default: ''
  },
  numeroCertificado: {
    type: String,
    required: false,
    default: ''
  },
  archivoCer: {
    type: String,
    required: false,
    default: ''
  },
  archivoKey: {
    type: String,
    required: false,
    default: ''
  },
  clavePrivada: {
    type: String,
    required: false,
    default: ''
  },
  archivoCerPem: {
    type: String,
    required: false,
    default: ''
  },
  archivoKeyPem: {
    type: String,
    required: false,
    default: ''
  },
  estatus: {
    type: String,
    enum: ['Activo', 'Inactivo'],
    required: true,
    default: 'Activo'
  }

}, {
  versionKey: false
});

module.exports = model('despachos', DespachosSchema);

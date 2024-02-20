import { Schema, model } from 'mongoose';

const DeclaracionesFiscales = new Schema({
  despacho: {
    type: Schema.Types.ObjectId,
    ref: 'despachos',
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    required: true
  },
  creadoPor: {
    type: Schema.Types.ObjectId,
    ref: 'usuarios',
    required: true
  },

  adjunto: {
    nombre: {
      type: String,
      required: true
    },
    archivo: {
      type: String,
      required: true
    }

  },
  estatus: {
    type: String,
    enum: ['Pendiente', 'Pagada'],
    required: true
  }
}, {

  versionKey: false
});

export default model('declaracionesFiscales', DeclaracionesFiscales);

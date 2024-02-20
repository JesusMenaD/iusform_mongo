import { Schema, model } from 'mongoose';

const ProductosSchema = new Schema({
  tipo_producto: {
    type: String,
    enum: ['Paquete', 'Plantilla', 'Timbres'],
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  imagen: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  cantidad: {
    type: Number,
    required: false,
    default: 0
  },
  descripcion: {
    type: String,
    required: false,
    default: ''

  },
  archivo: {
    type: String,
    required: false,
    default: ''
  },
  claveSAT: {
    type: String,
    required: false,
    default: ''
  },
  claveUMSAT: {
    type: String,
    required: false,
    default: ''
  },
  tasa: {
    type: Number,
    required: false,
    default: 0
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

export default model('productos', ProductosSchema);

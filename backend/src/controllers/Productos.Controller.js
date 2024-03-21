const Producto = require('../models/Productos.js');
const fs = require('fs');
const path = require('path');

const APP_URL = process.env.APP_URL;

const getProductos = async (req, res) => {
  const { tipo } = req.params;

  const query = { estatus: 'Activo' };
  if (tipo) {
    query.tipo_producto = tipo;
  }

  try {
    const sort = { tipo_producto: 1, cantidad: 1, nombre: 1 };

    const productos = await Producto.find(query).sort(sort);

    productos.forEach((producto) => {
      if (producto.imagen !== '' && fs.existsSync(path.join('src/uploads/productos', producto.imagen))) {
        producto.imagen = `${APP_URL}/uploads/productos/${producto.imagen}`;
      }
    });
    return res.status(200).json({
      mensaje: 'Productos obtenidos correctamente',
      productos
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al obtener los productos',
      error
    });
  }
};

const getProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Producto.findById(id);

    if (producto.imagen !== '' && fs.existsSync(path.join('src/uploads/productos', producto.imagen))) {
      producto.imagen = `${APP_URL}/uploads/productos/${producto.imagen}`;
    }

    return res.status(200).json({
      mensaje: 'Producto obtenido correctamente',
      producto
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al obtener el producto',
      error
    });
  }
};

module.exports = {
  getProductos,
  getProducto
};

const { Router } = require('express');
const { getProductos, getProducto } = require('../controllers/Productos.Controller.js');

const router = Router();

router.get('/sin-paginar', getProductos);
router.get('/:id', getProducto);

module.exports = router;

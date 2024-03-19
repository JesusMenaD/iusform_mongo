const { Router } = require('express');
const { getClientes, createCliente, getCliente, updateCliente, deleteCliente } = require('../controllers/Clientes.Controller.js');
const router = Router();

router.get('/:despacho', getClientes);
router.get('/:despacho/:id', getCliente);
router.patch('/:despacho/:id', updateCliente);
router.post('/:despacho', createCliente);
router.delete('/:id', deleteCliente);

module.exports = router;

const { Router } = require('express');
const { createPartes, getPartes, deletePartes, updatePartes } = require('../controllers/Expedientes.Partes.Controller.js');

const router = Router();

router.post('/:despacho/:expediente', createPartes);
router.get('/:despacho/:expediente', getPartes);
router.delete('/:_id', deletePartes);
router.patch('/:_id', updatePartes);

module.exports = router;

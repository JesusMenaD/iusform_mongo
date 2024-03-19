const { Router } = require('express');
const { getNotas, createNotas, updateNotas, deleteNotas } = require('../controllers/Expedientes.Notas.js');

const router = Router();

router.get('/:despacho/:expediente', getNotas);
router.post('/:despacho/:usuario/:expediente', createNotas);
router.patch('/:id', updateNotas);
router.delete('/:id', deleteNotas);

module.exports = router;

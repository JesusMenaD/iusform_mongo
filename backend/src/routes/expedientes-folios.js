const { Router } = require('express');
const { getMateriaNoAsignadas, getFolios, createFolio, deleteFolio } = require('../controllers//Expedientes.Folios.js');

const router = Router();

router.get('/:despacho/sin-asignar', getMateriaNoAsignadas);
router.get('/:despacho', getFolios);
router.post('/:despacho', createFolio);
router.delete('/:id', deleteFolio);

module.exports = router;

const { Router } = require('express');
const { create, getPautas, updatePauta, getPautaById, deletePauta } = require('../controllers/Expedientes.Pautas.Controller.js');

const router = Router();

router.post('/:despacho/:expediente', create);
router.get('/:despacho/:expediente', getPautas);
router.get('/:id', getPautaById);
router.put('/:id', updatePauta);
router.delete('/:id', deletePauta);

module.exports = router;

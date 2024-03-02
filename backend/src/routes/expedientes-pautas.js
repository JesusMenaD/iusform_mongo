import { Router } from 'express';
import { create, getPautas, updatePauta, getPautaById, deletePauta } from '../controllers/Expedientes.Pautas.Controller.js';

const router = Router();

router.post('/:despacho/:expediente', create);
router.get('/:despacho/:expediente', getPautas);
router.get('/:id', getPautaById);
router.put('/:id', updatePauta);
router.delete('/:id', deletePauta);

export default router;

import { Router } from 'express';
import { getMateriaNoAsignadas, getFolios, createFolio, deleteFolio } from '../controllers//Expedientes.Folios.js';

const router = Router();

router.get('/:despacho/sin-asignar', getMateriaNoAsignadas);
router.get('/:despacho', getFolios);
router.post('/:despacho', createFolio);
router.delete('/:id', deleteFolio);

export default router;

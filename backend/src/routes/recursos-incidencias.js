import { Router } from 'express';
import { getRecursosIncidenciasMateria } from '../controllers/Recursos.Incidencias.Controller.js';

const router = Router();

router.get('/:materia', getRecursosIncidenciasMateria);

export default router;

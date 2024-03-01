import { Router } from 'express';
import { createEvent, getEvents, updateEvent } from '../controllers/Expedientes.Agenda.Controller.js';

const router = Router();

router.post('/:despacho/:usuario', createEvent);
router.get('/:despacho/:usuario', getEvents);
router.put('/:_id', updateEvent);

export default router;

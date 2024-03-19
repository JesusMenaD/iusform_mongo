const { Router } = require('express');
const { createEvent, getEvents, updateEvent } = require('../controllers/Expedientes.Agenda.Controller.js');

const router = Router();

router.post('/:despacho/:usuario', createEvent);
router.get('/:despacho/:usuario', getEvents);
router.put('/:_id', updateEvent);

module.exports = router;

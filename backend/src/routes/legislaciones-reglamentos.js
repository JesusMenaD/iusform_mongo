const { Router } = require('express');
const { getLegislaciones } = require('../controllers/Legislaciones.Controller.js');

const router = Router();

router.get('/', getLegislaciones);

module.exports = router;

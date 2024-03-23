const { Router } = require('express');
const { AvisosAgenda } = require('../controllers/Cron.Jobs.Controller.js');

const router = Router();

router.get('/avisos-agenda', AvisosAgenda);

module.exports = router;

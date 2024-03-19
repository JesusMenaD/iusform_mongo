const { Router } = require('express');
const { sendWhatsapp } = require('../config/FuntionGlobal.js');
const router = Router();

router.post('/', (req, res) => {
  const { to, body } = req.body;
  sendWhatsapp({ to, body });
});

module.exports = router;

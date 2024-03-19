const { Router } = require('express');
const { RegistroUsuarioHTML } = require('../Mail/RegistroUsuarioHTML.js');
const { sendMail } = require('../config/mail.js');
const router = Router();

router.get('/', async (req, res) => {
  const mail = await sendMail(RegistroUsuarioHTML('nombre', 'usuario', 'password', 'url'), 'Registro de usuario', 'mcmena636@gmail.com');
  console.log(mail);
  res.send(RegistroUsuarioHTML('nombre', 'usuario', 'password', 'url'));
});

module.exports = router;

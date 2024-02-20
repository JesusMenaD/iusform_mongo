import { Router } from 'express';
import { RegistroUsuarioHTML } from '../Mail/RegistroUsuarioHTML.js';
import { sendMail } from '../config/mail.js';
const router = Router();

router.get('/', async (req, res) => {
  const mail = await sendMail(RegistroUsuarioHTML('nombre', 'usuario', 'password'), 'Registro de usuario', 'mcmena636@gmail.com');
  console.log(mail);
  res.send(RegistroUsuarioHTML('nombre', 'usuario', 'password'));
});

export default router;

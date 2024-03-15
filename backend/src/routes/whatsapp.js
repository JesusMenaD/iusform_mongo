import { Router } from 'express';

import { sendWhatsapp } from '../config/FuntionGlobal.js';

const router = Router();

router.post('/', (req, res) => {
  const { to, body } = req.body;
  sendWhatsapp({ to, body });
});

export default router;

const { Router } = require('express');
const { RegistroUsuarioHTML } = require('../Mail/RegistroUsuarioHTML.js');
const { sendMail } = require('../config/mail.js');
const router = Router();

router.get('/', async (req, res) => {
  const mail = await sendMail(RegistroUsuarioHTML('nombre', 'usuario', 'password', 'url'), 'Registro de usuario', 'mcmena636@gmail.com');
  console.log(mail);
  res.send(RegistroUsuarioHTML('nombre', 'usuario', 'password', 'url'));
});

router.get('/evento', async (req, res) => {
  const html = `

<table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
        <td style="height: 250px; background-color: #c89211; color: white; text-align: center; font-size: 48px; padding: 20px; background-image: url('https://ci3.googleusercontent.com/meips/ADKq_NYwwSEyP0-Zf9iZm2_ArqgxiQPAj2L3ImphGwnvfvf7ByFwCt74U5RKE3IDLMHCPqLWqWC_DKM_sskhY2mZ7f-eMVkMKbvJKQiV56BcY83FCAXNakENFY8Ksg=s0-d-e1-ft#http://iusform.com/administrador/images/banners/banner_540x130_1.jpg'); background-size: cover; background-position: center center;">
        </td>
    </tr>
    <tr>
        <td align="center" style="padding: 40px 0;">
            <table width="90%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #FFFFFF; box-shadow: 0 4px 8px rgba(0,0,0,0.3); border-radius: 8px; overflow: hidden; margin: -60px auto 0;">
                <tr>
                    <td style="padding: 20px; text-align: center;">
                        <img src="https://iusform.com/administrador/images/logo/logo_iusform_300x74_original.png" width="215" title="IUSFORM" alt="IUSFORM" style="max-width: 100%; height: auto; margin-bottom: 20px;">
                        <h1 style="font-size: 24px; margin: 0; color: #333;">Gran Fiesta de Fin de Año</h1>
                        <p style="color: #666;">Únete a nosotros para celebrar el fin de año con música en vivo, comida deliciosa y la mejor compañía.</p>
                        <p style="color: #666;"><strong>Fecha:</strong> 31 de Diciembre, 2024</p>
                        <p style="color: #666;"><strong>Hora:</strong> 20:00 hrs</p>
                        <a href="#" style="background-color: #c89211; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; text-decoration: none; display: inline-block; margin-top: 20px;">Registrarse</a>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
`;

  const mail = await sendMail(html, 'Evento Especial', 'mcmena636@gmail.com');
  res.send(mail);
});

module.exports = router;

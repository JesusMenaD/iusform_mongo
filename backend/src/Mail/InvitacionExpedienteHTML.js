const InvitacionExpedienteHTML = ({
  nombreDestinatario,
  nombreExpediente,
  enlaceExpediente
}) => {
  const year = new Date().getFullYear();

  return `
      <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <style>
            body {
                font-family: 'Helvetica', 'Arial', sans-serif;
                margin: 0;
                padding: 0;
                background-color: #F2F2F2;
                color: #232323;
            }
            table {
                width: 600px;
                margin: 0 auto;
            }
            td {
                padding: 10px;
            }
            .header {
                background-color: #F2F2F2;
                text-align: center;
            }

            .header img {
                width: 200px;
            }

            .banner img {
                width: 100%;
            }

            .content {
                background-color: #FFFFFF;
                padding-right: 20px;
                padding-left: 20px;
                padding-bottom: 20px;
                padding-top: 30px;
            }

            .content p {
                font-size: 14px;
                line-height: 23px;
                margin-bottom: 15px;
            }

            .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #c89211;
                color: #ffffff;
                text-decoration: none;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }

            .button:hover {
                background-color: #a1780b;
            }

            .footer {
                border-bottom-style: dashed;
                border-bottom-width: 1px;
                border-bottom-color: #cccccc;
                margin-top: 20px;
            }

            .footer p {
                font-size: 12px;
                color: #685f5f;
                line-height: 23px;
                text-align: center;
                margin: 0;
            }

            .footer a {
                color: #c89211;
                text-decoration: none;
            }
        </style>
    </head>

    <body>

        <table>
            <tr>
                <td class="header">
                    <img src="http://iusform.com/administrador/images/logo/logo_iusform_300x74_original.png"
                        alt="IUSFORM - Sistema para Abogados" title="IUSFORM - Sistema para Abogados" />
                </td>
            </tr>
            <tr>
                <td class="banner">
                    <img src="http://iusform.com/administrador/images/banners/banner_540x130_1.jpg" alt="Banner" />
                </td>
            </tr>
            <tr>
                <td class="content">
                    <p style="font-size: 18px; font-weight: bold;">¡Estimado ${nombreDestinatario}!</p>
                    <p>Me complace informarte que has sido asignado al expediente <strong>${nombreExpediente}</strong>.
                    </p>
                    <p>Por favor, revisa la información y no dudes en contactarnos si tienes alguna pregunta o necesitas más
                        detalles.</p>
                    <a class="button" href="${enlaceExpediente}">Ver Expediente</a>
                </td>
            </tr>
            <tr>
                <td
                    style="width:100%;font-family: Helvetica, Arial, sans-serif; font-size:14px; color:#232323; line-height:23px; text-align:center; vertical-align:top; width: normal;">
                    Si tienes dudas o comentarios, no dudes en comunicarte con nosotros.<br />
                    <span style="font-weight:600;">
                        <img src="http://iusform.com/administrador/images/notificaciones/icono_contacto_whatsapp.png"
                            width="16" height="16" alt="" />
                        <a href="https://api.whatsapp.com/send?phone=522229299899" target="_blank"
                            title="Envíanos un mensaje de WhatsApp" alt="Envíanos un mensaje de WhatsApp"
                            style="color:#685f5f; text-decoration:none;">22 29 29 98 99</a>&nbsp;&nbsp;&nbsp;
                        <img src="http://iusform.com/administrador/images/notificaciones/icono_contacto_email.png"
                            width="16" height="16" alt="" />
                        <a href="mailto:contacto@iusform.com.mx" target="_blank"
                            title="Escríbenos a nuestro correo electrónico" alt="Escríbenos a nuestro correo electrónico"
                            style="color:#685f5f; text-decoration:none;">contacto@iusform.com.mx</a>
                    </span>
                </td>
            </tr>
            <tr class="footer">
                <td>
                    <p>&copy; ${year} Derechos Reservados | <a href="http://iusform.com/administrador/" target="_blank">IUSFORM
                            - Sistema para Abogados</a></p>
                </td>
            </tr>
        </table>

    </body>

    </html>

  `;
};

module.exports = {
  InvitacionExpedienteHTML
};

export const RegistroUsuarioHTML = (nombre, usuario, password) => {
  const year = new Date().getFullYear();
  const APP_URL = process.env.APP_URL || 'http://localhost:3000';

  return `
      <table border="0" cellspacing="0" cellpadding="0" style="width:100%; background-color:#fffdf9;margin:0px !important;">
      <tr>
        <td style="width:100%; padding:20px;">
          <table style="width:700px;" border="0" align="center" cellpadding="0" cellspacing="0">
            <tr>
              <td style="width:100%;background-color: #FFFFFF !important; padding: 20px;  vertical-align:top;">
                <table style="width:100%;" border="0" align="center" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="width:50%; text-align:left; vertical-align:middle;"><img src="https://iusform.com/administrador/images/logo/logo_iusform_300x74_original.png" width="215" title="IUSFORM" alt="IUSFORM" />
                    </td>
                    <td style="width:50%; text-align:right; vertical-align:middle; font-family: Arial, Helvetica, sans-serif; font-size:18px; color:#0F181F; font-weight:bold;">
                      <table border="0" align="center" cellpadding="0" cellspacing="0" style="width:100%;">
                        <tr>
                          <td style="width:100%;font-family: Arial, Helvetica, sans-serif; font-size:16px; color:#0F181F; font-weight:bold; padding-bottom:5px; text-align:right; text-transform:uppercase;">
                            Bienvenido a IUSFORM</td>
                        </tr>
                        <tr>
                          <td style="width:100%;font-family: Arial, Helvetica, sans-serif; font-size:15px; color:#0F181F; font-weight:normal; text-align:right;">
                            Gracias por registrarse</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <table border="0" align="center" cellpadding="0" cellspacing="0" style="width:100%;">
                  <tr>
                    <td style="width:100%; border-bottom-width:2px; border-bottom-style:solid; border-bottom-color:#CDCDCD;">
                      &nbsp;</td>
                  </tr>
                  <tr>
                    <td style="width:100%;">&nbsp;</td>
                  </tr>
                </table>
                <table border="0" align="center" cellpadding="0" cellspacing="0" style="width:100%;">
                  <tr>
                    <td style="width:100%; font-family: Arial, Helvetica, sans-serif; font-size:14px; color:#0F181F; font-weight:normal; text-align:left;">
                      Hola ${nombre}, A continuación le enviamos sus datos de acceso a nuestra
                      plataforma </td>
                  </tr>
                </table>
                <table border="0" align="center" cellpadding="0" cellspacing="0" style="width:100%;">
                  <tr>
                    <td style="width:100%;">&nbsp;</td>
                  </tr>
                </table>
                <table style="width:100%;" border="0" align="center" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="width:30%; background-color:#C89211; font-family: Arial, Helvetica, sans-serif; font-size:14px; font-weight:bold; color:#FFFFFF; text-align:left; vertical-align:middle; padding:5px; border-right-width:2px; border-right-style:solid; border-right-color:#FFFFFF;border-bottom-width:2px; border-bottom-style:solid; border-bottom-color:#FFFFFF;">
                      URL:</td>
                    <td style="width:70%; background-color:#F2F2F2; font-family: Arial, Helvetica, sans-serif; font-size:14px; font-weight:bold; color:#0F181F; text-align:left; vertical-align:middle; padding:5px;border-right-width:2px; border-right-style:solid; border-right-color:#FFFFFF;border-bottom-width:2px; border-bottom-style:solid; border-bottom-color:#FFFFFF;">
                      <a style="text-decoration:none;color:#0F181F;" href="${APP_URL}}" target="_blank">${APP_URL}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="width:30%; background-color:#C89211; font-family: Arial, Helvetica, sans-serif; font-size:14px; font-weight:bold; color:#FFFFFF; text-align:left; vertical-align:middle; padding:5px; border-right-width:2px; border-right-style:solid; border-right-color:#FFFFFF;border-bottom-width:2px; border-bottom-style:solid; border-bottom-color:#FFFFFF;">
                      Correo:</td>
                    <td style="width:70%; background-color:#F2F2F2; font-family: Arial, Helvetica, sans-serif; font-size:14px; font-weight:bold; color:#0F181F; text-align:left; vertical-align:middle; padding:5px;border-right-width:2px; border-right-style:solid; border-right-color:#FFFFFF;border-bottom-width:2px; border-bottom-style:solid; border-bottom-color:#FFFFFF;">
                      ${usuario}
                    </td>
                  </tr>
                  <tr>
                    <td style="width:30%; background-color:#C89211; font-family: Arial, Helvetica, sans-serif; font-size:14px; font-weight:bold; color:#FFFFFF; text-align:left; vertical-align:middle; padding:5px; border-right-width:2px; border-right-style:solid; border-right-color:#FFFFFF;border-bottom-width:2px; border-bottom-style:solid; border-bottom-color:#FFFFFF;">
                      Contraseña:</td>
                    <td style="width:70%; background-color:#FFFFFF; font-family: Arial, Helvetica, sans-serif; font-size:14px; font-weight:bold; color:#0F181F; text-align:left; vertical-align:middle; padding:5px;border-right-width:2px; border-right-style:solid; border-right-color:#FFFFFF;border-bottom-width:2px; border-bottom-style:solid; border-bottom-color:#FFFFFF;">
                      ${password}
                    </td>
                  </tr>
                  
                </table>
                <table border="0" align="center" cellpadding="0" cellspacing="0" style="width:100%;">
                  <tr>
                    <td style="width:100%;">&nbsp;</td>
                  </tr>
                </table>

                <table border="0" align="center" cellpadding="0" cellspacing="0" style="width:100%;">
                  <tr>
                    <td style="width:100%; border-bottom-width:2px; border-bottom-style:solid; border-bottom-color:#CDCDCD;">
                      &nbsp;</td>
                  </tr>
                  <tr>
                    <td style="width:100%;">&nbsp;</td>
                  </tr>
                </table>
                <table border="0" align="center" cellpadding="0" cellspacing="0" style="width:100%;">
                  <tr>
                    <td style="width:100%;">&nbsp;</td>
                  </tr>
                </table>
                <table border="0" align="center" cellpadding="0" cellspacing="0" style="width:100%;">
                  <tr>
                    <td align="center" style="width:100%; font-family: Arial, Helvetica, sans-serif; font-size:12px; text-align:center; color:#5C5A5B; font-weight:normal;">
                      <a style="color:#5C5A5B; text-decoration:none;" href="https://hank.mx/contacto/" target="_blank" title="Contacto" alt="Contacto">Contacto</a> | <a style="color:#5C5A5B; text-decoration:none;" href="https://hank.mx/aviso_privacidad/" target="_blank" title="Aviso de Privacidad" alt="Aviso de Privacidad">Aviso de Privacidad</a>
                      | <a style="color:#5C5A5B; text-decoration:none;" href="#" target="_blank" title="Políticas de Uso" alt="Políticas de Uso">Políticas de Uso</a>
                    </td>
                  </tr>
                </table>
                <table border="0" align="center" cellpadding="0" cellspacing="0" style="width:100%;">
                  <tr>
                    <td style="width:100%;">&nbsp;</td>
                  </tr>
                </table>
                <table border="0" align="center" cellpadding="0" cellspacing="0" style="width:100%;">
                  <tr>
                    <td align="center" style="width:100%; text-align:center; vertical-align:top; padding-bottom:10px;">
                      <table border="0" align="center" cellpadding="0" cellspacing="0" style="width:15%;">
                        <tr>
                          <td align="center" valign="middle" style="width:33%;"><a href="https://iusform.com/" target="_blank"><img src="https://iusform.com/administrador/images/logo/favicon_48x48.png" width="20" height="20" title="IUSFORM Sistema para Abogados" alt="IUSFORM Sistema para Abogados" /></a></td>
                          <td align="center" valign="middle" style="width:33%;"><a href="https://www.posibilidades.com.mx/" target="_blank"><img src="https://iusform.com/images/icon/icono_footer_25x25_psd.png" width="20" height="20" title="Grupo Posibilidades" alt="Grupo Posibilidades" /></a></td>

                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <table border="0" align="center" cellpadding="0" cellspacing="0" style="width:100%;">
                  <tr>
                    <td align="center" style="width:100%; font-family: Arial, Helvetica, sans-serif; font-size:12px; text-align:center; color:#5C5A5B; font-weight:normal;">
                      © ${year} <a style="color:#C89211; font-weight:normal; text-decoration:none;" href="https://iusform.com" target="_blank" title="IUSFORM" alt="IUSFORM">IUSFORM </a> | Design by:
                      <a style="color:#C89211; font-weight:normal; text-decoration:none;" href="https://www.posibilidades.com.mx/" target="_blank" title="Design by: Posibilidades" alt="Design by: Posibilidades">Posibilidades</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
};

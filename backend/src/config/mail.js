const nodemailer = require('nodemailer');

const host = process.env.MAIL_HOST;
const port = process.env.MAIL_PORT;
const user = process.env.MAIL_USER;
const pass = process.env.MAIL_PASS;

const transporter = nodemailer.createTransport({
  host,
  port,
  secure: true,
  auth: {
    user,
    pass
  },
  tls: {
    rejectUnauthorized: false
  },
  debug: true
});

const sendMail = async (html, subject, correos) => {
  try {
    const info = await transporter.sendMail({
      from: '<envia@iusform.com> "IUSFORM" ', // sender address
      to: correos,
      subject,
      html
    });

    return info;
  } catch (error) {
    console.log('Error al enviar correo', error);
    return error;
  }
};

module.exports = { sendMail };

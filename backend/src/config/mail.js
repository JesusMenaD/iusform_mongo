import nodemailer from 'nodemailer';

const host = process.env.MAIL_HOST;
const port = process.env.MAIL_PORT;
const user = process.env.MAIL_USER;
const pass = process.env.MAIL_PASS;

const transporter = nodemailer.createTransport({
  host: 'v256382.neubox.net',
  port: 465,
  secure: true,
  auth: {
    user: 'envia@iusform.com',
    pass: 'JIYfgK4B73Os'
  },
  tls: {
    rejectUnauthorized: false
  },
  debug: true
});
export const sendMail = async (html, subject, correos) => {
  try {
    const info = await transporter.sendMail({
      from: '<envia@iusform.com> "IUSFORM" ', // sender address
      to: correos,
      subject,
      html
    });
    
    return info;
  } catch (error) {
    console.log('Error al enviar correo', error)
    return error;
  }
};

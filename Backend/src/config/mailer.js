import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verificar la configuración al iniciar
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Error en configuración de email:', error);
  } else {
    console.log('✅ Servidor de email listo para enviar mensajes');
  }
});

export const sendMail = async ({ to, text, html }) => {
  try {
    console.log('📬 Enviando email a:', to);
    const info = await transporter.sendMail({
      from: `"Mi Portafolio" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Nuevo mensaje desde el portafolio",
      text,
      html
    });
    console.log('✅ Email enviado:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Error en sendMail:', error);
    throw new Error(error.message);
  }
};
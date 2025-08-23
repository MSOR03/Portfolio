import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail", // puedes usar outlook, smtp personalizado, etc
  auth: {
    user: process.env.EMAIL_USER, // tu correo
    pass: process.env.EMAIL_PASS  // tu contraseña o app password
  }
});

// Función para enviar email
export const sendMail = async ({ to, text, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Mi Portafolio" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Nuevo mensaje desde el portafolio",
      text,
      html
    });
    return info;
  } catch (error) {
    throw new Error(error.message);
  }
};


import { sendMail } from "../config/mailer.js";

export const sendEmail = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    await sendMail({
      to: process.env.EMAIL_USER2, // Te llega a tu propio correo
      text: message,
      html: `
        <h3>Nuevo mensaje desde el portafolio</h3>
        <p><b>Nombre:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Mensaje:</b> ${message}</p>
      `
    });

    res.status(200).json({ success: true, message: "Correo enviado con éxito" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export default { sendEmail };

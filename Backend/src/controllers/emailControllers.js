import { sendMail } from "../config/resend.js";

export const sendEmail = async (req, res) => {
  try {
    console.log('📨 Recibiendo petición de email...');
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      console.log('❌ Campos faltantes:', { name, email, message });
      return res.status(400).json({ 
        success: false,
        message: "Todos los campos son requeridos" 
      });
    }

    console.log('📧 Datos recibidos:', { name, email });
    console.log('🔑 EMAIL_USER:', process.env.EMAIL_USER ? '✅ Configurado' : '❌ NO configurado');
    console.log('🔑 EMAIL_USER2:', process.env.EMAIL_USER2 ? '✅ Configurado' : '❌ NO configurado');
    console.log('🔑 EMAIL_PASS:', process.env.EMAIL_PASS ? '✅ Configurado' : '❌ NO configurado');

    await sendMail({
      to: process.env.EMAIL_USER2 || process.env.EMAIL_USER, // Fallback si EMAIL_USER2 no existe
      text: message,
      html: `
        <h3>Nuevo mensaje desde el portafolio</h3>
        <p><b>Nombre:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Mensaje:</b> ${message}</p>
      `
    });

    console.log('✅ Email enviado exitosamente');
    res.status(200).json({ success: true, message: "Correo enviado con éxito" });
  } catch (error) {
    console.error('❌ Error al enviar email:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message,
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

export default { sendEmail };
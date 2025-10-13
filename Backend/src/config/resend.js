import { Resend } from 'resend';
import dotenv from 'dotenv';

// Cargar variables de entorno AQUÍ también
dotenv.config();

// Inicializar Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Verificar configuración
if (process.env.RESEND_API_KEY) {
  console.log('✅ Resend API Key configurada');
} else {
  console.error('❌ RESEND_API_KEY no está configurada');
}

export const sendMail = async ({ to, subject, text, html }) => {
  try {
    console.log('📬 Enviando email a:', to);
    
    const data = await resend.emails.send({
      from: 'Portafolio <onboarding@resend.dev>',
      to,
      subject: subject || "Nuevo mensaje desde el portafolio",
      html,
      text: text || ''
    });
    
    console.log('✅ Email enviado con ID:', data.id);
    return { success: true, messageId: data.id };
  } catch (error) {
    console.error('❌ Error al enviar email con Resend:', error);
    throw new Error(error.message);
  }
};
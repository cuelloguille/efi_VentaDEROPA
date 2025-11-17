const nodemailer = require("nodemailer");

// Configura el transporte usando tu correo
// Ejemplo con Gmail (requiere app password si usas 2FA)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tucorreo@gmail.com",
    pass: "tu_app_password_aqui",
  },
});

const sendPurchaseEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: '"Mi Tienda" <tucorreo@gmail.com>',
      to,       // correo del usuario
      subject,  // asunto del correo
      html,     // contenido en HTML
    });
    console.log("Correo enviado a", to);
  } catch (error) {
    console.error("Error enviando correo:", error);
  }
};

module.exports = sendPurchaseEmail;

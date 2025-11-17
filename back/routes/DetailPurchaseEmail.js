const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// ⛔ Asegurate que esta ruta tenga el middleware de auth
// Ejemplo en server.js: app.use("/enviar-correo", authMiddleware, emailRouter);

router.post("/enviar-correo", async (req, res) => {
  const { items, total } = req.body;

  // Email del usuario logueado
  const correoDestino = req.user.correo;

  const detalle = items
    .map(p => `${p.nombre} - $${p.precio}`)
    .join("\n");

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "TU_CORREO@gmail.com",
        pass: "TU_PASSWORD_DE_APP",
      },
    });

    await transporter.sendMail({
      from: "Tienda <TU_CORREO@gmail.com>",
      to: correoDestino, // 🔥 ahora se envía al usuario
      subject: "Confirmación de compra",
      text: `Gracias por tu compra.\n\nDetalle:\n${detalle}\n\nTotal: $${total}`,
    });

    return res.json({ ok: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, error: "Error enviando correo" });
  }
});

module.exports = router;

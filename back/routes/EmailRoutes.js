const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const auth = require("../midlewares/auth"); // Middleware de autenticación

// ===============================
//      ENVIAR CORREO
// ===============================
router.post("/enviar-correo", auth, async (req, res) => {
  try {
    const { items, total } = req.body;

    // Email del usuario logueado desde el JWT
    const correoDestino = req.user.correo;

    if (!correoDestino) {
      return res
        .status(400)
        .json({ ok: false, error: "No se encontró el correo del usuario" });
    }

    const detalle = items
      .map((p) => `${p.nombre} - $${p.precio}`)
      .join("\n");

    // CONFIG NODMAILER
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "g.cuello@itecriocuarto.org.ar",
        pass: "ykbu nlfb chqz ltof", // NO tu contraseña normal
      },
    });

    // ENVIAR CORREO
    await transporter.sendMail({
      from: "ClotStore <g.cuello@itecriocuarto.org.ar>",
      to: correoDestino,
      subject: "Confirmación de compra",
      text: `Gracias por tu compra.\n\nDetalle:\n${detalle}\n\nTotal: $${total}`,
    });

    return res.json({ ok: true });
  } catch (error) {
    console.log("ERROR EMAIL:", error);
    return res.status(500).json({ ok: false, error: "Error al enviar correo" });
  }
});

module.exports = router;

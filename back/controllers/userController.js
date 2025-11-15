const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");

// ===============================
// REGISTER (solo crea USER)
// ===============================
exports.register = async (req, res) => {
  try {
    const { nombre, correo, contraseña } = req.body;

    
    const rol = "user";

    const hashedPass = await bcrypt.hash(contraseña, 10);

    const user = await User.create({
      nombre,
      correo,
      contraseña: hashedPass,
      rol,
    });

    res.status(201).json({ msg: "Usuario registrado ✔", user });
  } catch (err) {
    res.status(400).json({ msg: "Error en registro", error: err.message });
  }
};

// ===============================
// LOGIN
// ===============================
exports.login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    const user = await User.findOne({ where: { correo } });
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    const validPass = await bcrypt.compare(contraseña, user.contraseña);
    if (!validPass) return res.status(400).json({ msg: "Contraseña incorrecta" });

    // Crear token con id y rol
    const token = jwt.sign(
      { id: user.id, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Responder con token y datos del usuario (sin contraseña)
    res.json({
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        correo: user.correo,
        rol: user.rol
      }
    });
  } catch (err) {
    res.status(500).json({ msg: "Error en login", error: err.message });
  }
};

// ===============================
// PROFILE
// ===============================
exports.profile = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, { // usar req.userId desde auth middleware
      attributes: { exclude: ["contraseña"] }
    });
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener perfil", error: err.message });
  }
};

// ===============================
// FORGOT PASSWORD
// ===============================
exports.forgotPassword = async (req, res) => {
  try {
    const { correo } = req.body;
    const user = await User.findOne({ where: { correo } });

    // Siempre devolvemos OK por seguridad
    if (!user) {
      return res.status(200).json({ msg: "Si el correo existe, recibirás un enlace." });
    }

    const resetToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET_RESET,
      { expiresIn: "1h" }
    );

    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // Para pruebas, devolver la URL
    return res.status(200).json({
      msg: "Correo de restablecimiento enviado con éxito.",
      test_reset_url: resetURL
    });

  } catch (err) {
    res.status(500).json({ msg: "Error al enviar correo", error: err.message });
  }
};

// ===============================
// RESET PASSWORD
// ===============================
exports.resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    let decoded;
    try {
      decoded = jwt.verify(resetToken, process.env.JWT_SECRET_RESET);
    } catch (err) {
      return res.status(400).json({ msg: "El token es inválido o ha expirado." });
    }

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(400).json({ msg: "Solicitud inválida o ya utilizada." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.contraseña = hashedPassword;
    await user.save();

    return res.status(200).json({ msg: "Contraseña restablecida con éxito." });

  } catch (err) {
    res.status(500).json({ msg: "Error al restablecer contraseña", error: err.message });
  }
};

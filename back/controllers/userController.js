const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");

// ===============================
//  REGISTER (solo crea USER)
// ===============================
exports.register = async (req, res) => {
  try {
    const { nombre, correo, contraseña } = req.body;

    // Forzar rol por seguridad
    const rol = "admin";

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
//  LOGIN
// ===============================
exports.login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    const user = await User.findOne({ where: { correo } });
    if (!user)
      return res.status(404).json({ msg: "Usuario no encontrado" });

    const valid = await bcrypt.compare(contraseña, user.contraseña);
    if (!valid)
      return res.status(401).json({ msg: "Credenciales inválidas" });

    const token = jwt.sign(
      { id: user.id, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Error en login", error: err.message });
  }
};

// ===============================
//  PROFILE
// ===============================
exports.profile = async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: { exclude: ["contraseña"] }
  });
  res.json(user);
};

// ===============================
//  FORGOT PASSWORD
// ===============================
exports.forgotPassword = async (req, res) => {
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

  try {
    // Luego agregarás el envío real
    return res.status(200).json({
      msg: "Correo de restablecimiento enviado con éxito.",
      test_reset_url: resetURL // para pruebas
    });
  } catch (error) {
    console.error("Error al enviar email:", error);
    return res.status(500).json({ msg: "Error al enviar correo." });
  }
};

// ===============================
//  RESET PASSWORD
// ===============================
exports.resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;

  let decoded;
  try {
    decoded = jwt.verify(resetToken, process.env.JWT_SECRET_RESET);
  } catch (err) {
    return res.status(400).json({ msg: "El token es inválido o ha expirado." });
  }

  const user = await User.findOne({
    where: { id: decoded.id }
  });

  if (!user) {
    return res.status(400).json({ msg: "Solicitud inválida o ya utilizada." });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.contraseña = hashedPassword;
  await user.save();

  return res.status(200).json({ msg: "Contraseña restablecida con éxito." });
};

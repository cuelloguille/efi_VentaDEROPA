const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");

exports.register = async (req, res) => {
  try {
    const { nombre, correo, contraseña, rol } = req.body;

    const hashedPass = await bcrypt.hash(contraseña, 10);

    const user = await User.create({ nombre, correo, contraseña: hashedPass, rol });
    res.status(201).json({ msg: "Usuario registrado", user });
  } catch (err) {
    res.status(400).json({ msg: "Error en registro", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    const user = await User.findOne({ where: { correo } });
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    const valid = await bcrypt.compare(contraseña, user.contraseña);
    if (!valid) return res.status(401).json({ msg: "Credenciales inválidas" });

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

exports.profile = async (req, res) => {
  const user = await User.findByPk(req.user.id, { attributes: { exclude: ["contraseña"] } });
  res.json(user);
};

exports.forgotPassword = async (req, res) => {
    const { correo } = req.body;
    const user = await User.findOne({ where: { correo } });
    if (!user) {
        return res.status(200).json({ msg: "Si el correo existe, recibirás un enlace." });
    }
    const resetToken = jwt.sign(
        { id: user.id }, 
        process.env.JWT_SECRET_RESET, // Usa una clave SECRETA diferente para este token
        { expiresIn: '1h' }
    );
    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    try {
        // await sendEmail({
        //     to: user.correo,
        //     subject: 'Restablecimiento de Contraseña',
        //     html: `Haz clic en el enlace para restablecer tu contraseña: <a href="${resetURL}">Restablecer Contraseña</a>`
        // }); comentado total es prueba
        
        return res.status(200).json({ msg: "Correo de restablecimiento enviado con éxito." });
    } catch (error) {
        // En caso de error de envío limpiariamos el tojken
        // user.resetToken = null; 
        // user.resetTokenExpires = null;
        // await user.save();
        //por ahora son solo mensajes de exito o errores
        console.error("Error al enviar email:", error);
        return res.status(500).json({ msg: "Error al enviar correo. Intente más tarde." });
    }
};

exports.resetPassword = async (req, res) => {
    const { resetToken, newPassword } = req.body; 
    let decoded;
    try {
        decoded = jwt.verify(resetToken, process.env.JWT_SECRET_RESET); 
    } catch (err) {
        return res.status(400).json({ msg: "El token es inválido o ha expirado." });
    }
    
    const user = await User.findOne({ 
        where: { 
            id: decoded.id,
            // Aca iría la validación de que el token guardado en DB
            // coincida y no haya expirado:
            // resetToken: resetToken, 
            // resetTokenExpires: { [Op.gt]: Date.now() } 
        } 
    });

    if (!user) {
        return res.status(400).json({ msg: "Solicitud de restablecimiento inválida o ya utilizada." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.contraseña = hashedPassword;
    // user.resetToken = null; // Limpiar el token
    // user.resetTokenExpires = null; // Limpiar la expiración
    await user.save();

    return res.status(200).json({ msg: "Contraseña restablecida con éxito." });
};
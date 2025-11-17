const Sale = require("../models/Sales");
const SaleDetail = require("../models/SaleDetails");
const Clothe = require("../models/Clothes");
const sendPurchaseEmail = require("../utils/mailer"); // <-- importamos nuestro mailer

// ===============================
// Crear una venta
// ===============================
exports.createSale = async (req, res) => {
  const { items } = req.body; // [{id_prenda, cantidad}]
  try {
    if (!items || items.length === 0) {
      return res.status(400).json({ msg: "No hay items para procesar" });
    }

    let total = 0;

    // 1️⃣ Crear la venta
    const sale = await Sale.create({
      fecha: new Date(),
      id_usuario: req.user.id,
      total: 0,
    });

    // 2️⃣ Procesar cada item
    for (const item of items) {
      const clothe = await Clothe.findByPk(item.id_prenda);
      if (!clothe) {
        throw new Error(`Prenda ${item.id_prenda} no encontrada`);
      }
      if (clothe.stock < item.cantidad) {
        throw new Error(`Stock insuficiente para prenda ${clothe.nombre}`);
      }

      const precio_unitario = clothe.precio;
      total += item.cantidad * precio_unitario;

      // 3️⃣ Crear detalle de venta
      await SaleDetail.create({
        id_venta: sale.id,
        id_prenda: clothe.id,
        cantidad: item.cantidad,
        precio_unitario,
      });

      // 4️⃣ Decrementar stock
      clothe.stock -= item.cantidad;
      await clothe.save();
    }

    // 5️⃣ Actualizar total de la venta
    sale.total = total;
    await sale.save();

    // 6️⃣ Enviar correo al usuario
    const usuarioEmail = req.user.correo; // asumimos que req.user tiene correo
    const html = `
      <h1>Gracias por tu compra</h1>
      <p>Detalle de tu compra:</p>
      <ul>
        ${items.map(item => `<li>${item.cantidad} x Prenda ID ${item.id_prenda}</li>`).join("")}
      </ul>
      <p>Total: $${total}</p>
    `;
    await sendPurchaseEmail(usuarioEmail, "Confirmación de tu compra", html);

    res.status(201).json({ msg: "Venta registrada y correo enviado", sale });
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: err.message });
  }
};

// ===============================
// Obtener todas las ventas
// ===============================
exports.getSales = async (req, res) => {
  try {
    const where = {};
    if (req.user.rol === "vendedor") {
      where.id_usuario = req.user.id;
    }

    const sales = await Sale.findAll({ where, include: ["User"] });
    res.json(sales);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener las ventas" });
  }
};

// ===============================
// Obtener detalles de una venta
// ===============================
exports.getSaleDetails = async (req, res) => {
  try {
    const { id_venta } = req.params;

    const details = await SaleDetail.findAll({
      where: { id_venta },
      include: [Clothe],
    });

    res.json(details);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener detalles de la venta" });
  }
};

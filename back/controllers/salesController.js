const Sale = require("../models/Sales");
const SaleDetail = require("../models/SaleDetails");
const Clothe = require("../models/Clothes");
const { Op } = require("sequelize");

exports.createSale = async (req, res) => {
  const { items } = req.body; // [{id_prenda, cantidad}]
  try {
    let total = 0;

    const sale = await Sale.create({ fecha: new Date(), id_usuario: req.user.id, total: 0 });

    for (const item of items) {
      const clothe = await Clothe.findByPk(item.id_prenda);
      if (!clothe || clothe.stock < item.cantidad) {
        throw new Error(`Stock insuficiente para prenda ${item.id_prenda}`);
      }

      const precio_unitario = clothe.precio;
      total += item.cantidad * precio_unitario;

      await SaleDetail.create({
        id_venta: sale.id,
        id_prenda: clothe.id,
        cantidad: item.cantidad,
        precio_unitario,
      });

      // decrementa stock
      clothe.stock -= item.cantidad;
      await clothe.save();
    }

    sale.total = total;
    await sale.save();

    res.status(201).json({ msg: "Venta registrada", sale });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

exports.getSales = async (req, res) => {
  const where = {};
  if (req.user.rol === "vendedor") {
    where.id_usuario = req.user.id;
  }
  const sales = await Sale.findAll({ where, include: ["User"] });
  res.json(sales);
};

exports.getSaleDetails = async (req, res) => {
  const { id_venta } = req.params;
  const details = await SaleDetail.findAll({
    where: { id_venta },
    include: [Clothe],
  });
  res.json(details);
};

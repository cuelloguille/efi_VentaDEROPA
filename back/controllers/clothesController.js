const Clothe = require("../models/Clothes");

exports.getAll = async (req, res) => {
  const { talla, color, q } = req.query;
  const where = {};
  if (talla) where.talla = talla;
  if (color) where.color = color;
  if (q) where.nombre = { [Op.like]: `%${q}%` };

  const clothes = await Clothe.findAll({ where });
  res.json(clothes);
};

exports.create = async (req, res) => {
  const clothe = await Clothe.create(req.body);
  res.status(201).json(clothe);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const updated = await Clothe.update(req.body, { where: { id } });
  res.json({ msg: "Prenda actualizada", updated });
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  await Clothe.destroy({ where: { id } });
  res.json({ msg: "Prenda eliminada" });
};

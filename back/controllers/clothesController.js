const Clothe = require("../models/Clothes");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");

// Obtener todas las prendas con filtros
exports.getAll = async (req, res) => {
  try {
    const { talla, color, q } = req.query;
    const where = {};
    if (talla) where.talla = talla;
    if (color) where.color = color;
    if (q) where.nombre = { [Op.like]: `%${q}%` };

    const clothes = await Clothe.findAll({ where });
    res.json(clothes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener prendas", error });
  }
};

// Crear prenda con imagen
exports.create = async (req, res) => {
  try {
    const { nombre, talla, color, precio, stock, id_categoria, id_proveedor } = req.body;
    const imagen = req.file ? req.file.filename : null; // obtener el nombre del archivo

    const clothe = await Clothe.create({
      nombre,
      talla,
      color,
      precio,
      stock,
      id_categoria,
      id_proveedor,
      imagen
    });

    res.status(201).json(clothe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al crear la prenda", error });
  }
};

// Actualizar prenda (incluyendo imagen)
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const clothe = await Clothe.findByPk(id);
    if (!clothe) return res.status(404).json({ msg: "Prenda no encontrada" });

    // Si se envía una nueva imagen, borramos la anterior
    if (req.file) {
      if (clothe.imagen) {
        const oldPath = path.join(__dirname, "..", "uploads", clothe.imagen);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      req.body.imagen = req.file.filename;
    }

    await Clothe.update(req.body, { where: { id } });
    res.json({ msg: "Prenda actualizada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al actualizar la prenda", error });
  }
};

// Eliminar prenda (incluyendo imagen)
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const clothe = await Clothe.findByPk(id);
    if (!clothe) return res.status(404).json({ msg: "Prenda no encontrada" });

    // Borrar imagen si existe
    if (clothe.imagen) {
      const imagePath = path.join(__dirname, "..", "uploads", clothe.imagen);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await Clothe.destroy({ where: { id } });
    res.json({ msg: "Prenda eliminada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al eliminar la prenda", error });
  }
};

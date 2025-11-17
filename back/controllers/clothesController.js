const Clothe = require("../models/Clothes");
const Supplier = require("../models/Supplier");
const Category = require("../models/Category");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");

// ===============================
//  GET ALL
// ===============================
exports.getAll = async (req, res) => {
  try {
    const { talla, color, q } = req.query;

    const where = {};
    if (talla) where.talla = talla;
    if (color) where.color = color;
    if (q) where.nombre = { [Op.like]: `%${q}%` };

    const clothes = await Clothe.findAll({
      where,
      include: [
        { model: Supplier, as: "Supplier", attributes: ["id", "nombre"] },
        { model: Category, as: "Category", attributes: ["id", "nombre"] },
      ]
    });

    res.json(clothes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener prendas", error });
  }
};

// ===============================
//  CREATE
// ===============================
exports.create = async (req, res) => {
  try {
    const { nombre, talla, color, precio, stock, id_categoria, id_proveedor } = req.body;

    const imagen = req.file ? req.file.filename : null;

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

// ===============================
//  UPDATE
// ===============================
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const clothe = await Clothe.findByPk(id);
    if (!clothe) return res.status(404).json({ msg: "Prenda no encontrada" });

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

// ===============================
//  DELETE
// ===============================
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const clothe = await Clothe.findByPk(id);
    if (!clothe) return res.status(404).json({ msg: "Prenda no encontrada" });

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

// ===============================
//  OBTENER PRENDA POR ID
// ===============================
exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;

    const clothe = await Clothe.findByPk(id, {
      include: [
        { model: Category, as: "Category" },
        { model: Supplier, as: "Supplier" }
      ]
    });

    if (!clothe) {
      return res.status(404).json({ message: "Prenda no encontrada" });
    }

    return res.json(clothe);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la prenda" });
  }
};
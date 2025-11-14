const Category = require("../models/Category");
// POST /categories
exports.create = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    if (!nombre) {
      return res.status(400).json({ msg: "El nombre de la categoría es obligatorio." });
    }

    const category = await Category.create({ nombre, descripcion });
    
    res.status(201).json({ 
      msg: "Categoría creada con éxito", 
      category 
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ msg: "Ya existe una categoría con ese nombre." });
    }
    console.error(error);
    res.status(500).json({ msg: "Error interno al crear la categoría." });
  }
};

// GET /categories
exports.getAll = async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [['nombre', 'ASC']]
    });
    
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error interno al obtener las categorías." });
  }
};

// PUT /categories/:id
exports.update = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;
  
  try {
    const [updated] = await Category.update(
      { nombre, descripcion }, 
      { where: { id } }
    );

    if (updated) {
      const updatedCategory = await Category.findByPk(id);
      return res.json({ 
        msg: "Categoría actualizada con éxito", 
        category: updatedCategory 
      });
    }

    res.status(404).json({ msg: "Categoría no encontrada." });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ msg: "Ya existe otra categoría con ese nombre." });
    }
    console.error(error);
    res.status(500).json({ msg: "Error interno al actualizar la categoría." });
  }
};

// DELETE /categories/:id
exports.remove = async (req, res) => {
  const { id } = req.params;
  
  try {
    const deleted = await Category.destroy({ where: { id } });

    if (deleted) {
      return res.json({ msg: "Categoría eliminada con éxito." });
    }

    res.status(404).json({ msg: "Categoría no encontrada." });
  } catch (error) {
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      // Este error ocurre si hay prendas asociadas a esta categoría
      return res.status(400).json({ msg: "No se puede eliminar la categoría. Hay prendas asociadas que dependen de ella." });
    }
    console.error(error);
    res.status(500).json({ msg: "Error interno al eliminar la categoría." });
  }
};
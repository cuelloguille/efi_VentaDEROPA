const Supplier = require("../models/Supplier");
const { Op } = require("sequelize"); 

// POST /suppliers
exports.create = async (req, res) => {
  try {
    const { nombre, contacto, email } = req.body;

    // Validación básica: asegura que al menos el nombre esté presente
    if (!nombre) {
      return res.status(400).json({ msg: "El nombre del proveedor es obligatorio." });
    }

    const supplier = await Supplier.create({ nombre, contacto, email });
    
    res.status(201).json({ 
      msg: "Proveedor creado con éxito", 
      supplier 
    });
  } catch (error) {
    // Si el nombre o el email son duplicados (debido a unique: true en el modelo)
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ msg: "El nombre o email del proveedor ya existe." });
    }
    console.error(error);
    res.status(500).json({ msg: "Error interno al crear el proveedor." });
  }
};

// GET /suppliers
exports.getAll = async (req, res) => {
  try {
    const suppliers = await Supplier.findAll({
      order: [['nombre', 'ASC']] 
    });
    
    res.json(suppliers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error interno al obtener los proveedores." });
  }
};

// PUT /suppliers/:id
exports.update = async (req, res) => {
  const { id } = req.params;
  const { nombre, contacto, email } = req.body;
  
  try {
    const [updated] = await Supplier.update(
      { nombre, contacto, email }, 
      { where: { id } }
    );

    if (updated) {
      const updatedSupplier = await Supplier.findByPk(id);
      return res.json({ 
        msg: "Proveedor actualizado con éxito", 
        supplier: updatedSupplier 
      });
    }

    res.status(404).json({ msg: "Proveedor no encontrado." });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ msg: "El nombre o email del proveedor ya existe." });
    }
    console.error(error);
    res.status(500).json({ msg: "Error interno al actualizar el proveedor." });
  }
};

// DELETE /suppliers/:id
exports.remove = async (req, res) => {
  const { id } = req.params;
  
  try {
    const deleted = await Supplier.destroy({ where: { id } });

    if (deleted) {
      return res.json({ msg: "Proveedor eliminado con éxito." });
    }

    res.status(404).json({ msg: "Proveedor no encontrado." });
  } catch (error) {
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).json({ msg: "No se puede eliminar el proveedor. Hay prendas asociadas." });
    }
    console.error(error);
    res.status(500).json({ msg: "Error interno al eliminar el proveedor." });
  }
};
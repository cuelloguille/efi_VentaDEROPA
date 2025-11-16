// models/Clothe.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Category = require("./Category");
const Supplier = require("./Supplier");

const Clothe = sequelize.define(
  "Clothe",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    talla: {
      type: DataTypes.ENUM("S", "M", "L"),
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    id_categoria: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_proveedor: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "clothes",
    timestamps: true,
  }
);

// ===============================
//     ASOCIACIONES CORRECTAS
// ===============================
Clothe.belongsTo(Category, {
  foreignKey: "id_categoria",
  as: "Category",
});

Category.hasMany(Clothe, {
  foreignKey: "id_categoria",
});

Clothe.belongsTo(Supplier, {
  foreignKey: "id_proveedor",
  as: "Supplier",
});

Supplier.hasMany(Clothe, {
  foreignKey: "id_proveedor",
});

module.exports = Clothe;

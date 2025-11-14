// models/User.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.ENUM("admin", "vendedor"),
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  esetToken: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  resetTokenExpires: {
    type: DataTypes.DATE, 
    allowNull: true,
  },
}, {
  tableName: "users",
  timestamps: true, // Agregar campos de creación y actualización
});

module.exports = User;

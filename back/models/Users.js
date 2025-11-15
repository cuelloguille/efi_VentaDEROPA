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
    type: DataTypes.ENUM("admin", "user"),
    allowNull: false,
    defaultValue: "user"  // Todos los registros nuevos serán user
  },

  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },

  reset_token: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  reset_token_expires: {
    type: DataTypes.DATE,
    allowNull: true,
  }

}, {
  tableName: "users",
  timestamps: true,           // crea created_at y updated_at
  underscored: true,          // created_at en vez de createdAt
  freezeTableName: true,      // evita pluralizar tablas
});

module.exports = User;

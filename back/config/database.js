// config/database.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "tiendaDB",
  process.env.DB_USER || "admin",
  process.env.DB_PASSWORD || "tu_contraseña",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: true,
  }
);

module.exports = sequelize;

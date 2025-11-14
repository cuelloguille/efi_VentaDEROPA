// models/Sale.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./Users");

const Sale = sequelize.define("Sale", {
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  total: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
  },
}, {
  tableName: "sales",
  timestamps: true,
});

Sale.belongsTo(User, { foreignKey: "id_usuario" });
User.hasMany(Sale, { foreignKey: "id_usuario" });

module.exports = Sale;

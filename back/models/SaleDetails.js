// models/SaleDetail.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Sale = require("./Sales");
const Clothe = require("./Clothes");

const SaleDetail = sequelize.define("SaleDetail", {
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  precio_unitario: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
  },
}, {
  tableName: "sales_details",
  timestamps: true,
});

SaleDetail.belongsTo(Sale, { foreignKey: "id_venta" });
Sale.hasMany(SaleDetail, { foreignKey: "id_venta" });

SaleDetail.belongsTo(Clothe, { foreignKey: "id_prenda" });
Clothe.hasMany(SaleDetail, { foreignKey: "id_prenda" });

module.exports = SaleDetail;

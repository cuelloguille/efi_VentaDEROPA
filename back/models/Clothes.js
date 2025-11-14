// models/Clothe.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Category = require("./Category"); 
const Supplier = require("./Supplier");

const Clothe = sequelize.define("Clothes", {
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
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_categoria: { //solo una categoria por prenda
    type: DataTypes.INTEGER,
    allowNull: false, 
  },
  id_proveedor: {
    type: DataTypes.INTEGER,
    allowNull: true, 
  },
}, {
  tableName: "clothes",
  timestamps: true,
});
//relacion a categoria/tipo
Clothe.belongsTo(Category, { foreignKey: "id_categoria" });
Category.hasMany(Clothe, { foreignKey: "id_categoria" });

//relacion a proveedor
Clothe.belongsTo(Supplier, { foreignKey: "id_proveedor" });
Supplier.hasMany(Clothe, { foreignKey: "id_proveedor" });


module.exports = Clothe;

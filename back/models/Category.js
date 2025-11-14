// models/Category.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Category = sequelize.define("Category", {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // No puede haber dos categorías con el mismo nombre
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: "categories",
    timestamps: true,
});

module.exports = Category;
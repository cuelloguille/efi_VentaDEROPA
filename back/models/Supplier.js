// models/Supplier.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Supplier = sequelize.define("Supplier", {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // El nombre del proveedor debe ser único
    },
    contacto: {
        type: DataTypes.STRING, // Teléfono o nombre de contacto
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
}, {
    tableName: "suppliers",
    timestamps: true,
});

module.exports = Supplier;
const { DataTypes } = require('sequelize');
const { db } = require('./../database/config');

const Order = db.define('orders', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    mealId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    totalPrice_order: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: 'total_price',
    },
    quantity_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'quantity',
    },
    status_order: {
        type: DataTypes.ENUM('active', 'cancelled', 'completed'),
        allowNull: false,
        defaultValue: 'active',
        field: 'status',
    },
});

module.exports = Order;
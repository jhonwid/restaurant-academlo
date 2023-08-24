const { DataTypes } = require('sequelize');
const { db } = require('./../database/config');

const Meal = db.define('Meals', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name_meal: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'name',
    },
    price_meal: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: 'price',
    },
    restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status_meal: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'status',
    },
});

module.exports = Meal;
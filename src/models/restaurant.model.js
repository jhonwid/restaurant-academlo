const { DataTypes } = require('sequelize');
const { db } = require('./../database/config');

const Restaurant = db.define('restaurants', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nameRestaurant: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'name',
    },
    addressRestaurant: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'address',
    },
    ratingRestaurant: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'rating',
    },
    statusRestaurant: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'status',
    },
});

module.exports = Restaurant;
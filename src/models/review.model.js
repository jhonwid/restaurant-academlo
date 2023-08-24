const { DataTypes } = require("sequelize");
const { db } = require('./../database/config');

const Review = db.define('reviews', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    commentReview: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    restaurantid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ratingReview: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    statusReview: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
});

module.exports = Review;


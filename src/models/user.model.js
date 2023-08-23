const { DataTypes } = require('sequelize');
const { db } = require('./../database/config');

const User = db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nameUser: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'name_user',
    },
    emailUser: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'email_user',
    },
    passwordUser: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password_user',
    },
    roleUser: {
        type: DataTypes.ENUM('normal', 'admin'),
        allowNull: false,
        defaultValue: 'normal',
        field: 'role_user',
    },
    statusUser: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'status_user',
    },
});

module.exports = User;

const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connexion à la base de données réussie !");
    } catch (error) {
        console.error("Erreur de connexion à la base de données :", error);
    }
};

module.exports = { sequelize, connectDB };
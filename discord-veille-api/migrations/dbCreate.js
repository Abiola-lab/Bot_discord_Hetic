const sequelize = require('../config/db');

sequelize.sync({ force: true }).then(() => {
    console.log("Base de données créée !");
    process.exit();
});
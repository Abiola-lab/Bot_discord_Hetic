const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const moderationRoutes = require('./routes/moderation');
const alertsRoutes = require('./routes/alerts');

app.use(express.json());
app.use('/moderation', moderationRoutes);
app.use('/alerts', alertsRoutes);

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
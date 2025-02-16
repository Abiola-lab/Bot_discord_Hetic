const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

// Charger les variables d'environnement
dotenv.config();

// Initialiser Express
const app = express();
app.use(express.json());
app.use(cors());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("🟢 API connectée à MongoDB"))
  .catch(err => console.error("🔴 Erreur MongoDB :", err));

// Modèle Mongoose pour les tutoriels
const TutoSchema = new mongoose.Schema({
    titre: String,
    url: String,
    description: String
});
const Tuto = mongoose.model("Tuto", TutoSchema);

// Route pour ajouter un tutoriel
app.post('/tutos', async (req, res) => {
    try {
        const { titre, url, description } = req.body;
        if (!titre || !url) {
            return res.status(400).json({ error: "Titre et URL sont obligatoires" });
        }
        const newTuto = new Tuto({ titre, url, description });
        await newTuto.save();
        res.status(201).json(newTuto);
    } catch (error) {
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
});

// Route pour récupérer un tuto aléatoire selon un mot-clé
app.get('/tutos', async (req, res) => {
    try {
        const search = req.query.search || "";
        const tutos = await Tuto.find({ titre: new RegExp(search, "i") });

        if (tutos.length === 0) {
            return res.status(404).json({ error: "Aucun tuto trouvé" });
        }

        res.json(tutos);
    } catch (error) {
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
});

// ✅ Route de test pour vérifier que l'API fonctionne
app.get("/status", (req, res) => {
    res.json({ message: "L'API fonctionne !" });
});

// Lancer l'API
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🟢 API démarrée sur le port ${PORT}`));
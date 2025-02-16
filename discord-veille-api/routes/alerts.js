const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Ajouter une alerte de veille
router.post("/", async (req, res) => {
    try {
        const { source, content } = req.body;

        if (!source || !content) {
            return res.status(400).json({ message: "Champs manquants" });
        }

        await pool.query("INSERT INTO alerts (source, content) VALUES (?, ?)", [source, content]);

        res.status(201).json({ message: "Alerte ajoutée" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// Récupérer toutes les alertes actives
router.get("/", async (req, res) => {
    try {
        const [alerts] = await pool.query("SELECT * FROM alerts ORDER BY timestamp DESC");
        res.json(alerts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

module.exports = router;
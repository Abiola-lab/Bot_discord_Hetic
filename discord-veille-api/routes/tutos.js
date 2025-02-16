const express = require("express");
const router = express.Router();
const tutosService = require("../services/tutos");

// ✅ Route pour ajouter une vidéo (POST /tutos)
router.post("/", async (req, res) => {
    try {
        const { titre, url, description } = req.body;

        if (!titre || !url) {
            return res.status(400).json({ error: "Le titre et l'URL sont obligatoires." });
        }

        const newTuto = await tutosService.ajouterTuto({ titre, url, description });
        res.status(201).json(newTuto);
    } catch (error) {
        console.error("Erreur lors de l'ajout du tutoriel :", error);
        res.status(500).json({ error: "Erreur interne du serveur." });
    }
});

// ✅ Route pour récupérer des vidéos par mot-clé (GET /tutos?search=motclé)
router.get("/", async (req, res) => {
    try {
        const search = req.query.search || "";
        const tutos = await tutosService.rechercherTutos(search);
        res.status(200).json(tutos);
    } catch (error) {
        console.error("Erreur lors de la récupération des tutoriels :", error);
        res.status(500).json({ error: "Erreur interne du serveur." });
    }
});

module.exports = router;
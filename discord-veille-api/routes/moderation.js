const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const pool = require("../config/db");

// Ajouter une action de modération avec validation
router.post(
    "/",
    [
        body("user_id").isString().notEmpty().withMessage("L'ID utilisateur est requis."),
        body("action").isIn(["ban", "mute", "kick"]).withMessage("L'action doit être 'ban', 'mute' ou 'kick'."),
        body("reason").isString().notEmpty().withMessage("La raison est obligatoire."),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { user_id, action, reason } = req.body;
            await pool.query(
                "INSERT INTO moderation_logs (user_id, action, reason) VALUES (?, ?, ?)",
                [user_id, action, reason]
            );

            res.status(201).json({ message: "Action de modération ajoutée" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur serveur" });
        }
    }
);

// Récupérer tous les logs de modération
router.get("/logs", async (req, res) => {
    try {
        const [logs] = await pool.query("SELECT * FROM moderation_logs ORDER BY timestamp DESC");
        res.json(logs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

module.exports = router;
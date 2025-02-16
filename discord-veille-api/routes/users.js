const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Récupérer les infos d'un utilisateur par son ID Discord
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const [user] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);

        if (user.length === 0) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        res.json(user[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

module.exports = router;
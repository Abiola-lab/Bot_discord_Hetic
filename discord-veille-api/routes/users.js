const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: "Liste des utilisateurs" });
});

router.post('/', (req, res) => {
    const { username, email } = req.body;
    if (!username || !email) {
        return res.status(400).json({ message: "Nom d'utilisateur et email requis" });
    }
    res.json({ message: `Utilisateur ${username} ajouté avec succès` });
});

module.exports = router;
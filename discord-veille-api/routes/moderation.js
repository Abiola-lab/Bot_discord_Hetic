const express = require('express');
const router = express.Router();

router.post('/ban', (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        return res.status(400).json({ message: "ID utilisateur requis" });
    }
    res.json({ message: `Utilisateur ${userId} banni` });
});

module.exports = router;
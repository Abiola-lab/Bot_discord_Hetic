const express = require('express');
const router = express.Router();
const tutosService = require('../services/tutos');

router.post('/', async (req, res) => {
    const { titre, url, description } = req.body;
    if (!titre || !url) {
        return res.status(400).json({ message: "Titre et URL obligatoires" });
    }
    const tuto = await tutosService.ajouterTuto(titre, url, description);
    res.json(tuto);
});

module.exports = router;
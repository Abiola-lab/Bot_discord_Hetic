const mongoose = require('mongoose');

const tutoSchema = new mongoose.Schema({
    titre: String,
    url: String,
    description: String,
    date: { type: Date, default: Date.now }
});

const Tuto = mongoose.model('Tuto', tutoSchema);

// Ajouter un tutoriel à la base de données
async function ajouterTuto(data) {
    const tuto = new Tuto(data);
    await tuto.save();
    return tuto;
}

// Rechercher des tutoriels par mot-clé
async function rechercherTutos(keyword) {
    const regex = new RegExp(keyword, 'i');
    return await Tuto.find({
        $or: [{ titre: regex }, { description: regex }]
    });
}

module.exports = { ajouterTuto, rechercherTutos };

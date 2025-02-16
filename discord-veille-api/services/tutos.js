const db = require("./db"); // Importation du service de base de données

const COLLECTION_NAME = "tutos"; // Nom de la collection/table

/**
 * ✅ Ajoute un tutoriel dans la base de données.
 * @param {Object} data - { titre, url, description }
 * @returns {Object} - Le tutoriel ajouté
 */
async function ajouterTuto(data) {
    const { titre, url, description } = data;
    const newTuto = { titre, url, description, date: new Date() };
    await db.insert(COLLECTION_NAME, newTuto);
    return newTuto;
}

/**
 * ✅ Recherche des tutoriels en fonction d’un mot-clé.
 * @param {string} motclé - Mot-clé à rechercher dans le titre ou la description
 * @returns {Array} - Liste des tutoriels trouvés
 */
async function rechercherTutos(motclé) {
    if (!motclé) return await db.getAll(COLLECTION_NAME);

    const regex = new RegExp(motclé, "i"); // Recherche insensible à la casse
    return await db.find(COLLECTION_NAME, {
        $or: [{ titre: regex }, { description: regex }]
    });
}

module.exports = { ajouterTuto, rechercherTutos };
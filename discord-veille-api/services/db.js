const { MongoClient } = require("mongodb");

const DB_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
const DB_NAME = process.env.DB_NAME || "moderationDB";

let db;

/**
 * ✅ Connexion à la base de données MongoDB
 */
async function connectDB() {
    if (!db) {
        const client = new MongoClient(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        db = client.db(DB_NAME);
        console.log("✅ Connecté à la base de données !");
    }
    return db;
}

/**
 * ✅ Insère un document dans une collection.
 * @param {string} collection - Nom de la collection
 * @param {Object} data - Document à insérer
 */
async function insert(collection, data) {
    const database = await connectDB();
    await database.collection(collection).insertOne(data);
}

/**
 * ✅ Récupère tous les documents d’une collection.
 * @param {string} collection - Nom de la collection
 * @returns {Array} - Liste des documents
 */
async function getAll(collection) {
    const database = await connectDB();
    return await database.collection(collection).find().toArray();
}

/**
 * ✅ Recherche des documents dans une collection avec des filtres.
 * @param {string} collection - Nom de la collection
 * @param {Object} query - Filtre de recherche
 * @returns {Array} - Liste des documents correspondants
 */
async function find(collection, query) {
    const database = await connectDB();
    return await database.collection(collection).find(query).toArray();
}

module.exports = { insert, getAll, find };
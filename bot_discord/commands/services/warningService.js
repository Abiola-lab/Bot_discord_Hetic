const mongoose = require('mongoose');

const warningSchema = new mongoose.Schema({
    userId: String,
    guildId: String,
    reason: String,
    count: { type: Number, default: 1 },
    date: { type: Date, default: Date.now }
});

const Warning = mongoose.model('Warning', warningSchema);

async function addWarning(userId, guildId, reason) {
    let warning = await Warning.findOne({ userId, guildId });

    if (warning) {
        warning.count += 1;
    } else {
        warning = new Warning({ userId, guildId, reason });
    }

    await warning.save();
    return warning;
}

// Récupérer le nombre de warnings d’un utilisateur
async function getWarnings(userId, guildId) {
    const warning = await Warning.findOne({ userId, guildId });
    return warning ? warning.count : 0;
}

// Supprimer les warnings d’un utilisateur
async function clearWarnings(userId, guildId) {
    await Warning.deleteOne({ userId, guildId });
}

module.exports = { addWarning, getWarnings, clearWarnings };

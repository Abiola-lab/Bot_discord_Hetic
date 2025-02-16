const { REST, Routes, SlashCommandBuilder } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const commands = [
    new SlashCommandBuilder()
        .setName('ascii')
        .setDescription('Transforme un texte en ASCII')
        .addStringOption(option => 
            option.setName('texte')
                .setDescription('Le texte à convertir')
                .setRequired(true)
        ),
    new SlashCommandBuilder()
        .setName('playlist')
        .setDescription('Affiche la playlist actuelle')
];

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

(async () => {
    try {
        console.log("📡 Enregistrement des commandes...");
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        );
        console.log("✅ Commandes enregistrées !");
    } catch (error) {
        console.error("❌ Erreur lors de l'enregistrement :", error);
    }
})();

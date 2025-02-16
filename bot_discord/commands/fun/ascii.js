const { SlashCommandBuilder } = require('discord.js');
const figlet = require('figlet');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ascii')
        .setDescription('Génère un texte en ASCII')
        .addStringOption(option => 
            option.setName('texte')
                .setDescription('Le texte à convertir en ASCII')
                .setRequired(true)
        ),
    
    async execute(interaction) {
        const inputText = interaction.options.getString('texte');

        if (inputText.length > 40) {
            return interaction.reply("❌ Le texte est trop long ! (Max 40 caractères)");
        }

        figlet(inputText, (err, data) => {
            if (err) {
                console.error("Erreur figlet :", err);
                return interaction.reply("❌ Erreur lors de la génération de l'ASCII Art.");
            }

            interaction.reply(`\`\`\`${data}\`\`\``);
        });
    }
};

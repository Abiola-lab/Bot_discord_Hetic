const { SlashCommandBuilder } = require('@discordjs/builders');
const tutoService = require('../services/tutoService');

module.exports = {
    // Define the slash command with its name and description
    data: new SlashCommandBuilder()
        .setName('tutolist')
        .setDescription('Retrieve all tutorials for a keyword')
        .addStringOption(option =>
            option.setName('keyword')
                .setDescription('Keyword for filtering tutorials')
                .setRequired(true)),
    
    async execute(interaction) {
        // Get the keyword entered by the user
        const keyword = interaction.options.getString('keyword');

        // Fetch tutorials matching the keyword from the service
        const tutos = await tutoService.rechercherTutos(keyword);

        if (tutos.length > 0) {
            // Format the list of tutorials as a string
            const tutoLinks = tutos.map(tuto => `${tuto.titre}: ${tuto.url}`).join('\n');

            // Reply with the list of tutorials
            interaction.reply(`Here are the tutorials for **${keyword}**:\n${tutoLinks}`);
        } else {
            // Reply if no tutorials are found
            interaction.reply(`No tutorials found for **${keyword}**.`);
        }
    },
};

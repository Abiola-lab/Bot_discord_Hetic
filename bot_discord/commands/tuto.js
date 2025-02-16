const { SlashCommandBuilder } = require('@discordjs/builders');
const tutoService = require('../services/tutoService');

module.exports = {
    // Define the slash command with its name and description
    data: new SlashCommandBuilder()
        .setName('tuto')
        .setDescription('Retrieve a specific tutorial by keyword')
        .addStringOption(option =>
            option.setName('keyword')
                .setDescription('Keyword for the tutorial')
                .setRequired(true)),

    async execute(interaction) {
        // Get the keyword entered by the user
        const keyword = interaction.options.getString('keyword');

        // Fetch tutorials matching the keyword from the service
        const tuto = await tutoService.rechercherTutos(keyword);

        if (tuto.length > 0) {
            // Reply with the first tutorial found
            interaction.reply(`Here is a tutorial for **${keyword}**: ${tuto[0].url}`);
        } else {
            // Reply if no tutorial is found
            interaction.reply(`No tutorial found for **${keyword}**.`);
        }
    },
};

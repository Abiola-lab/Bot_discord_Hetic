const { SlashCommandBuilder } = require('@discordjs/builders');
const tutoService = require('../services/tutoService');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tutolist')
        .setDescription('Récupère tous les tutos pour un mot-clé')
        .addStringOption(option =>
            option.setName('keyword')
                .setDescription('Mot-clé des tutoriels')
                .setRequired(true)),
    async execute(interaction) {
        const keyword = interaction.options.getString('keyword');
        const tutos = await tutoService.rechercherTutos(keyword);
        if (tutos.length > 0) {
            const tutoLinks = tutos.map(tuto => `${tuto.titre}: ${tuto.url}`).join('\n');
            interaction.reply(`Voici la liste des tutos pour **${keyword}** :\n${tutoLinks}`);
        } else {
            interaction.reply(`Aucun tuto trouvé pour **${keyword}**.`);
        }
    },
};

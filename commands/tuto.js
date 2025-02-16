const { SlashCommandBuilder } = require('@discordjs/builders');
const tutoService = require('../services/tutoService');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tuto')
        .setDescription('Récupère un tuto spécifique par mot-clé')
        .addStringOption(option =>
            option.setName('keyword')
                .setDescription('Mot-clé du tutoriel')
                .setRequired(true)),
    async execute(interaction) {
        const keyword = interaction.options.getString('keyword');
        const tuto = await tutoService.rechercherTutos(keyword);
        if (tuto.length > 0) {
            interaction.reply(`Voici un tuto pour **${keyword}** : ${tuto[0].url}`);
        } else {
            interaction.reply(`Aucun tuto trouvé pour **${keyword}**.`);
        }
    },
};

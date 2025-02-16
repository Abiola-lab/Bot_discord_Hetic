const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bannit un utilisateur du serveur.')
        .addUserOption(option =>
            option.setName('utilisateur')
                .setDescription("L'utilisateur à bannir")
                .setRequired(true))
        .addStringOption(option =>
            option.setName('raison')
                .setDescription("Raison du bannissement")
                .setRequired(false)),

    async execute(interaction) {
        const user = interaction.options.getUser('utilisateur');
        const reason = interaction.options.getString('raison') || 'Aucune raison spécifiée';

        if (!interaction.member.permissions.has('BAN_MEMBERS')) {
            return interaction.reply({ content: "❌ Vous n'avez pas la permission de bannir un membre.", ephemeral: true });
        }

        const member = interaction.guild.members.cache.get(user.id);
        if (!member) return interaction.reply("❌ Utilisateur introuvable.");

        await member.ban({ reason });
        await interaction.reply(`🚨 **${user.tag}** a été banni pour **${reason}**.`);
    }
};

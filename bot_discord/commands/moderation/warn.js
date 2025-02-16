const { SlashCommandBuilder } = require('discord.js');
const { addWarning, getWarnings } = require('../../services/warningsService');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription("Donne un avertissement à un utilisateur")
        .addUserOption(option =>
            option.setName('utilisateur')
                .setDescription("L'utilisateur à avertir")
                .setRequired(true))
        .addStringOption(option =>
            option.setName('raison')
                .setDescription("Raison de l'avertissement")
                .setRequired(true)),

    async execute(interaction) {
        const user = interaction.options.getUser('utilisateur');
        const reason = interaction.options.getString('raison');
        const guildId = interaction.guild.id;

        if (!interaction.member.permissions.has('KICK_MEMBERS')) {
            return interaction.reply({ content: "❌ Vous n'avez pas la permission d'avertir un membre.", ephemeral: true });
        }

        await addWarning(user.id, guildId, reason);
        const warningCount = await getWarnings(user.id, guildId);

        await interaction.reply(`⚠️ **${user.tag}** a été averti pour : **${reason}** (Total: ${warningCount} warnings)`);
        await user.send(`🚨 **Avertissement sur ${interaction.guild.name}**\nRaison: ${reason}\nTotal warnings: ${warningCount}`);
    }
};

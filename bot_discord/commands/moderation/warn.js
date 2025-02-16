const { SlashCommandBuilder } = require('discord.js');
const { addWarning, getWarnings } = require('../../services/warningsService');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')  // Command name is 'warn'
        .setDescription("Gives a warning to a user")  // Short description of the command
        .addUserOption(option =>
            option.setName('utilisateur')  // Option to select a user to warn
                .setDescription("The user to warn")  // Describes this option
                .setRequired(true))  // Makes this option mandatory
        .addStringOption(option =>
            option.setName('raison')  // Option to add a reason for the warning
                .setDescription("The reason for the warning")  // Describes this option
                .setRequired(true)),  // Makes this option mandatory

    async execute(interaction) {
        const user = interaction.options.getUser('utilisateur');  // Get the selected user
        const reason = interaction.options.getString('raison');  // Get the reason for the warning
        const guildId = interaction.guild.id;  // Get the guild ID (server)

        // Check if the executing member has permission to warn users
        if (!interaction.member.permissions.has('KICK_MEMBERS')) {
            return interaction.reply({ content: "❌ You do not have permission to warn members.", ephemeral: true });
        }

        // Add a warning to the user
        await addWarning(user.id, guildId, reason);

        // Get the total number of warnings for the user
        const warningCount = await getWarnings(user.id, guildId);

        // Respond to the interaction with the details of the warning
        await interaction.reply(`⚠️ **${user.tag}** has been warned for: **${reason}** (Total: ${warningCount} warnings)`);

        // Send a DM to the user notifying them of the warning
        await user.send(`🚨 **Warning on ${interaction.guild.name}**\nReason: ${reason}\nTotal warnings: ${warningCount}`);
    }
};

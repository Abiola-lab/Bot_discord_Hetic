const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    // Definition of the "/ban" slash command
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a user from the server.')
        .addUserOption(option => 
            option.setName('user')
                .setDescription("The user to ban")
                .setRequired(true)) // The user is required
        .addStringOption(option =>
            option.setName('reason')
                .setDescription("Reason for the ban")
                .setRequired(false)), // The reason is optional

    async execute(interaction) {
        // Retrieve the mentioned user
        const user = interaction.options.getUser('user');
        // Retrieve the provided reason or set a default value
        const reason = interaction.options.getString('reason') || 'No reason specified';

        // Check if the user executing the command has the "BAN_MEMBERS" permission
        if (!interaction.member.permissions.has('BAN_MEMBERS')) {
            return interaction.reply({ 
                content: "❌ You don't have permission to ban members.", 
                ephemeral: true // Response is only visible to the user executing the command
            });
        }

        // Retrieve the member from the server
        const member = interaction.guild.members.cache.get(user.id);
        if (!member) return interaction.reply("❌ User not found.");

        // Execute the ban with the specified reason
        await member.ban({ reason });

        // Send a confirmation message
        await interaction.reply(`🚨 **${user.tag}** has been banned for **${reason}**.`);
    }
};

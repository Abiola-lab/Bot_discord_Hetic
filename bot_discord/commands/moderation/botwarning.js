const { getWarnings, clearWarnings } = require('../../services/warningsService');

module.exports = {
    // Function to check if the member has reached enough warnings to be banned
    async checkWarnings(member) {
        // Retrieve the number of warnings the member has received
        const warningCount = await getWarnings(member.id, member.guild.id);

        // If the member has 4 or more warnings, they will be banned
        if (warningCount >= 4) {
            try {
                // Attempt to send a DM to the member informing them of the ban, you can personalize the message
                await member.send(`🚨 You have been banned from **${member.guild.name}** for **too many warnings**.`);
            } catch (err) {
                // If the DM fails (e.g., the member has DMs disabled), log the error
                console.log(`Unable to send a DM to ${member.user.tag}.`);
            }

            // Ban the member with the reason 'Too many warnings'
            await member.ban({ reason: 'Too many warnings' });

            // Clear the warnings after banning the member
            await clearWarnings(member.id, member.guild.id);

            // Log the ban action
            console.log(`🚨 ${member.user.tag} was banned for reaching ${warningCount} warnings.`);
        }
    }
};

const { getWarnings, clearWarnings } = require('../../services/warningsService');

module.exports = {
    async checkWarnings(member) {
        const warningCount = await getWarnings(member.id, member.guild.id);

        if (warningCount >= 4) {
            try {
                await member.send(`🚨 Vous avez été banni de **${member.guild.name}** pour **trop d'avertissements**.`);
            } catch (err) {
                console.log(`Impossible d'envoyer un DM à ${member.user.tag}.`);
            }

            await member.ban({ reason: 'Trop de warnings' });
            await clearWarnings(member.id, member.guild.id);
            console.log(`🚨 ${member.user.tag} a été banni pour avoir atteint ${warningCount} warnings.`);
        }
    }
};

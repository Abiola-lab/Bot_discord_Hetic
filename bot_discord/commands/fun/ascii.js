const { SlashCommandBuilder } = require('discord.js');
const figlet = require('figlet'); // Import the Figlet library to generate ASCII text

module.exports = {
    // Define the slash command with its name and description
    data: new SlashCommandBuilder()
        .setName('ascii')
        .setDescription('Generates ASCII text')
        .addStringOption(option => 
            option.setName('texte')
                .setDescription('The text to convert into ASCII')
                .setRequired(true)
        ),
    
    async execute(interaction) {
        // Get the user-provided text
        const inputText = interaction.options.getString('texte');

        // Check if the text exceeds the character limit
        if (inputText.length > 40) {
            return interaction.reply("❌ The text is too long! (Max 40 characters)");
        }

        // Use Figlet to generate ASCII art from the input text
        figlet(inputText, (err, data) => {
            if (err) {
                console.error("Figlet error:", err); // Log the error if Figlet fails
                return interaction.reply("❌ Error generating ASCII art.");
            }

            // Reply with the generated ASCII text wrapped in a code block
            interaction.reply(`\`\`\`${data}\`\`\``);
        });
    }
};

const { Client, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
const axios = require('axios');

// Load environment variables from .env file
dotenv.config();

// Create a Discord bot client with required intents
const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] 
});

const { checkWarnings } = require('commands/moderation/botwarning');

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    const forbiddenWords = ["ta gueule", "merde", "salope","con"]; //rajouter les autres inultes 
    if (forbiddenWords.some(word => message.content.toLowerCase().includes(word))) {
        await addWarning(message.author.id, message.guild.id, "Utilisation de langage inapproprié");
        await message.delete();
        await message.channel.send(`⚠️ **${message.author.tag}**, attention à votre langage, vous risquez d'être banni !`);

        const member = message.guild.members.cache.get(message.author.id);
        await checkWarnings(member);
    }
});


// Event triggered when the bot is ready and connected
client.once('ready', () => {
    console.log(`✅ Bot connected as ${client.user.tag}`);
});

// Event triggered when a message is sent in a server
client.on('messageCreate', async message => {
    // Ignore messages from other bots
    if (message.author.bot) return;

    // Command to search for a single tutorial
    if (message.content.startsWith('/tuto')) {
        const keyword = message.content.split(' ')[1]; // Extract keyword from command
        if (!keyword) return message.channel.send("❌ Please provide a keyword after `/tuto`.");

        try {
            // Send a request to the API to search for tutorials
            const response = await axios.get(`${process.env.API_URL}/tutos?search=${keyword}`);
            const tuto = response.data[0]; // Select the first tutorial from the results

            // Send the tutorial to the Discord channel
            if (tuto) {
                message.channel.send(`📚 **${tuto.titre}** : ${tuto.url}`);
            } else {
                message.channel.send(`🔍 No tutorials found for **${keyword}**.`);
            }
        } catch (error) {
            console.error("❌ API Error:", error);
            message.channel.send("⚠️ Error retrieving tutorials.");
        }
    }

    // Command to search for a list of tutorials
    if (message.content.startsWith('/tutolist')) {
        const keyword = message.content.split(' ')[1]; // Extract keyword
        if (!keyword) return message.channel.send("❌ Please provide a keyword after `/tutolist`.");

        try {
            // Send a request to the API to search for tutorials
            const response = await axios.get(`${process.env.API_URL}/tutos?search=${keyword}`);
            const tutos = response.data;

            // Send the list of tutorials to the Discord channel
            if (tutos.length > 0) {
                const tutoLinks = tutos.map(tuto => `📌 **${tuto.titre}** : ${tuto.url}`).join('\n');
                message.channel.send(`📂 List of tutorials for **${keyword}** :\n${tutoLinks}`);
            } else {
                message.channel.send(`🔍 No tutorials found for **${keyword}**.`);
            }
        } catch (error) {
            console.error("❌ API Error:", error);
            message.channel.send("⚠️ Error retrieving tutorials.");
        }
    }
});

// Log in the bot using the token from the .env file
client.login(process.env.BOT_TOKEN);
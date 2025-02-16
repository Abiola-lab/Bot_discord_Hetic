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

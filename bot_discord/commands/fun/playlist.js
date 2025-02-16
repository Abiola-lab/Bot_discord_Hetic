const { SlashCommandBuilder } = require('discord.js');

// Predefined playlists categorized by mood or activity, don't forget to change the playlist if you want
const playlists = {
    chill: [
        'https://open.spotify.com/playlist/37i9dQZF1DX4WYpdgoIcn6',
        'https://open.spotify.com/playlist/37i9dQZF1DWVFeEut75IAL',
    ],
    gaming: [
        'https://open.spotify.com/playlist/37i9dQZF1DX8GjsySWIS1x',
        'https://open.spotify.com/playlist/37i9dQZF1DX9GRpeH4CL0S',
    ],
    party: [
        'https://open.spotify.com/playlist/37i9dQZF1DXaXB8fQg7xif',
        'https://open.spotify.com/playlist/37i9dQZF1DX0BcQWzuB7ZO',
    ],
    study: [
        'https://open.spotify.com/playlist/37i9dQZF1DX8Uebhn9wzrS',
        'https://open.spotify.com/playlist/37i9dQZF1DWZqd5JICZI0u',
    ],
    random: [] // Placeholder for random selection
};

module.exports = {
    // Define the /playlist command with a required string option
    data: new SlashCommandBuilder()
        .setName('playlist')
        .setDescription('Generates a Spotify playlist link')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Playlist type (chill, gaming, party, study, random)')
                .setRequired(true)
        ),

    async execute(interaction) {
        const type = interaction.options.getString('type'); // Get the user's selected type

        if (type === 'random') {
            // Flatten all playlist URLs into a single array
            const allPlaylists = Object.values(playlists).flat();
            // Pick a random playlist from all available ones
            const randomPlaylist = allPlaylists[Math.floor(Math.random() * allPlaylists.length)];
            return interaction.reply(`🎶 Here is a random playlist: ${randomPlaylist}`);
        }

        // Check if the type exists in the playlists object
        if (!playlists[type]) {
            return interaction.reply('❌ Invalid playlist type. Choose from chill, gaming, party, study, or random.');
        }

        // Select a random playlist from the chosen category
        const playlist = playlists[type][Math.floor(Math.random() * playlists[type].length)];
        
        // Send the response with the playlist link
        await interaction.reply(`🎵 Here is a **${type}** playlist: ${playlist}`);
    }
};

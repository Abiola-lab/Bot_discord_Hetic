const { SlashCommandBuilder } = require('discord.js');

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
    random: []
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('playlist')
        .setDescription('Génère une playlist')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Type de playlist (chill, gaming, party, study, random)')
                .setRequired(true)
        ),
    async execute(interaction) {
        const type = interaction.options.getString('type');
        if (type === 'random') {
            const allPlaylists = Object.values(playlists).flat();
            const randomPlaylist = allPlaylists[Math.floor(Math.random() * allPlaylists.length)];
            return interaction.reply(`🎶 Voici une playlist aléatoire : ${randomPlaylist}`);
        }
        if (!playlists[type]) {
            return interaction.reply('❌ Type de playlist invalide. Choisissez parmi chill, gaming, party, study, random.');
        }
        const playlist = playlists[type][Math.floor(Math.random() * playlists[type].length)];
        await interaction.reply(`🎵 Voici une playlist **${type}** : ${playlist}`);
    }
};
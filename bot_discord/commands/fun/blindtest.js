const { SlashCommandBuilder } = require('discord.js');
const ytdl = require('ytdl-core'); // Import YouTube downloader for streaming audio
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice'); // Import Discord voice utilities

// List of predefined songs for the blind test, you can of course add more to the list
const songs = [
    { title: 'never gonna give you up', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    { title: 'take on me', url: 'https://www.youtube.com/watch?v=djV11Xbc914' },
    { title: 'HEYYEYAAEYAAAEYAEYAA', url: 'https://youtu.be/FR7wOGyAzpw?si=pemCivPGcUwckySu' },
    { title: 'gummy bear', url: 'https://youtu.be/astISOttCQ0?si=fskfrTJqI6cx5NM1' },
    { title: 'billie jean', url: 'https://www.youtube.com/watch?v=Zi_XLOBDo_Y' }
];

module.exports = {
    // Define the slash command with subcommands
    data: new SlashCommandBuilder()
        .setName('blindtest')
        .setDescription('Starts a music blind test')
        .addSubcommand(subcommand =>
            subcommand.setName('start')
                .setDescription('Starts a blind test')
        ),
    
    async execute(interaction) {
        // Check if the user is in a voice channel
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) {
            return interaction.reply('❌ You must be in a voice channel to start a blind test.');
        }

        // Connect the bot to the user's voice channel
        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator
        });

        // Select a random song from the list
        const song = songs[Math.floor(Math.random() * songs.length)];

        // Stream the audio from YouTube (audio only)
        const stream = ytdl(song.url, { filter: 'audioonly' });

        // Create an audio player and resource
        const player = createAudioPlayer();
        const resource = createAudioResource(stream);
        player.play(resource);

        // Subscribe the connection to the player
        connection.subscribe(player);

        // Send an initial message to announce the game
        await interaction.reply('🎵 A song is playing! Guess the title in the chat!');

        // Set a timer for 30 seconds before revealing the answer
        setTimeout(() => {
            interaction.followUp(`⏳ Time's up! The song was **${song.title}**`);
            connection.destroy(); // Disconnect from the voice channel
        }, 30000);
    }
};

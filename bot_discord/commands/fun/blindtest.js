const { SlashCommandBuilder } = require('discord.js');
const ytdl = require('ytdl-core');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');

const songs = [
    { title: 'Never Gonna Give You Up', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    { title: 'Take On Me', url: 'https://www.youtube.com/watch?v=djV11Xbc914' },
    { title: 'Billie Jean', url: 'https://www.youtube.com/watch?v=Zi_XLOBDo_Y' }
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('blindtest')
        .setDescription('Lance un blind test musical')
        .addSubcommand(subcommand =>
            subcommand.setName('start')
                .setDescription('Commence un blind test')
        ),
    async execute(interaction) {
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) {
            return interaction.reply('❌ Vous devez être dans un salon vocal pour lancer un blind test.');
        }

        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator
        });

        const song = songs[Math.floor(Math.random() * songs.length)];
        const stream = ytdl(song.url, { filter: 'audioonly' });
        const player = createAudioPlayer();
        const resource = createAudioResource(stream);
        player.play(resource);
        connection.subscribe(player);

        await interaction.reply('🎵 Un morceau va être joué ! Devinez le titre dans le chat !');

        setTimeout(() => {
            interaction.followUp(`⏳ Temps écoulé ! La chanson était **${song.title}**`);
            connection.destroy();
        }, 30000);
    }
};

const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');
const { YouTubePlugin } = require('@distube/youtube');
const config = require('./config');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
    ],
});

// Bot setup
client.commands = new Collection();
client.config = config;

const ffmpeg = require('ffmpeg-static');

// DisTube setup
client.distube = new DisTube(client, {
    ffmpeg: {
        path: ffmpeg
    },
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [
        new SpotifyPlugin(),
        new YouTubePlugin()
    ],
});

// Load Handlers
['commandHandler', 'eventHandler'].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

// DisTube Events (Separate logic for music UI)
client.distube
    .on('playSong', (queue, song) => {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('pause')
                    .setEmoji('⏸️')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('skip')
                    .setEmoji('⏭️')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('stop')
                    .setEmoji('⏹️')
                    .setStyle(ButtonStyle.Danger),
            );

        const embed = new EmbedBuilder()
            .setColor(config.colors.primary)
            .setAuthor({ name: 'Now Playing', iconURL: config.icons.play })
            .setDescription(`**[${song.name}](${song.url})**`)
            .setThumbnail(song.thumbnail)
            .addFields(
                { name: 'Duration', value: song.formattedDuration, inline: true },
                { name: 'Requested by', value: song.user.tag, inline: true },
            )
            .setFooter({ text: 'New Gen Music Bot', iconURL: config.icons.music });

        queue.textChannel.send({ embeds: [embed], components: [row] });
    })
    .on('addSong', (queue, song) => {
        queue.textChannel.send({
            embeds: [{
                color: parseInt(config.colors.secondary.replace('#', ''), 16),
                title: `${config.emoji.queue} Added to Queue`,
                description: `**[${song.name}](${song.url})**`,
                thumbnail: { url: song.thumbnail },
                footer: { text: `Position: ${queue.songs.length}` }
            }]
        });
    })
    .on('error', (channel, e) => {
        if (channel) channel.send(`${config.emoji.error} | An error encountered: ${e.toString().slice(0, 1974)}`);
        else console.error(e);
    })
    .on('empty', channel => channel.send('Voice channel is empty! Leaving the channel...'))
    .on('searchNoResult', (message, query) =>
        message.channel.send(`${config.emoji.error} | No result found for \`${query}\`!`)
    )
    .on('finish', queue => queue.textChannel.send('Finished!'));

client.login(config.token);

// Global Error Handling to prevent crashes
process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

process.on('uncaughtException', error => {
    console.error('Uncaught exception:', error);
});

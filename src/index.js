const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');
const { YtDlpPlugin } = require('@distube/yt-dlp');
const config = require('./config');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

// Bot setup
client.commands = new Collection();
client.config = config;

// DisTube setup
client.distube = new DisTube(client, {
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [
        new SpotifyPlugin({
            emitEventsAfterFetching: true,
        }),
        new YtDlpPlugin()
    ],
});

// Load Handlers
['commandHandler', 'eventHandler'].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

// DisTube Events (Separate logic for music UI)
client.distube
    .on('playSong', (queue, song) => {
        queue.textChannel.send({
            embeds: [{
                color: parseInt(config.colors.primary.replace('#', ''), 16),
                title: `${config.emoji.play} Now Playing`,
                description: `**[${song.name}](${song.url})**`,
                thumbnail: { url: song.thumbnail },
                fields: [
                    { name: 'Duration', value: song.formattedDuration, inline: true },
                    { name: 'Requested by', value: song.user.tag, inline: true },
                ],
                footer: { text: 'New Gen Music Bot | Premium Audio' }
            }]
        });
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

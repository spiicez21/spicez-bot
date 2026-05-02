const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nowplaying')
        .setDescription('Show information about the currently playing song'),
    async execute(interaction) {
        const queue = interaction.client.distube.getQueue(interaction.guildId);

        if (!queue) {
            return interaction.reply({ 
                content: `${config.emoji.error} | There is nothing playing right now!`, 
                ephemeral: true 
            });
        }

        const song = queue.songs[0];
        
        // Simple progress bar
        const part = Math.floor((queue.currentTime / song.duration) * 20);
        const uni = '▬';
        const circle = '🔘';
        const bar = uni.repeat(part) + circle + uni.repeat(20 - part);

        const embed = new EmbedBuilder()
            .setColor(config.colors.primary)
            .setTitle(`${config.emoji.play} Now Playing`)
            .setDescription(`**[${song.name}](${song.url})**`)
            .setThumbnail(song.thumbnail)
            .addFields(
                { name: 'Duration', value: `\`${queue.formattedCurrentTime} / ${song.formattedDuration}\``, inline: true },
                { name: 'Requested by', value: `${song.user}`, inline: true },
                { name: 'Progress', value: `\`${bar}\`` }
            );

        interaction.reply({ embeds: [embed] });
    },
};

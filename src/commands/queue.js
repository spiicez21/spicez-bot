const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('View the current music queue'),
    async execute(interaction) {
        const queue = interaction.client.distube.getQueue(interaction.guildId);

        if (!queue) {
            return interaction.reply({ 
                content: `${config.emoji.error} | There is nothing in the queue!`, 
                ephemeral: true 
            });
        }

        const q = queue.songs
            .map((song, i) => `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
            .join('\n');

        const embed = new EmbedBuilder()
            .setColor(config.colors.secondary)
            .setTitle(`${config.emoji.queue} Current Queue`)
            .setDescription(q.slice(0, 2048)) // Limit length
            .setFooter({ text: `Total songs: ${queue.songs.length} | Total duration: ${queue.formattedDuration}` });

        interaction.reply({ embeds: [embed] });
    },
};

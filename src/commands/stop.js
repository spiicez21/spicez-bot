const { SlashCommandBuilder } = require('discord.js');
const config = require('../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop music and leave the voice channel'),
    async execute(interaction) {
        const queue = interaction.client.distube.getQueue(interaction.guildId);

        if (!queue) {
            return interaction.reply({ 
                content: `${config.emoji.error} | There is nothing in the queue!`, 
                ephemeral: true 
            });
        }

        queue.stop();
        interaction.reply(`${config.emoji.stop} | Music stopped and queue cleared.`);
    },
};

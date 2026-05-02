const { SlashCommandBuilder } = require('discord.js');
const config = require('../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip the current song'),
    async execute(interaction) {
        const queue = interaction.client.distube.getQueue(interaction.guildId);

        if (!queue) {
            return interaction.reply({ 
                content: `${config.emoji.error} | There is nothing in the queue!`, 
                ephemeral: true 
            });
        }

        try {
            const song = await queue.skip();
            interaction.reply(`${config.emoji.skip} | Skipped! Now playing: **${song.name}**`);
        } catch (e) {
            // If there's no next song, it might error, handle it
            if (e.errorCode === 'NO_UP_NEXT') {
                queue.stop();
                interaction.reply(`${config.emoji.stop} | No more songs in queue. Stopped playback.`);
            } else {
                interaction.reply(`${config.emoji.error} | ${e.message}`);
            }
        }
    },
};

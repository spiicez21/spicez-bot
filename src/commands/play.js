const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song or playlist')
        .addStringOption(option =>
            option.setName('query')
                .setDescription('The song name or URL')
                .setRequired(true)),
    async execute(interaction) {
        const query = interaction.options.getString('query');
        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) {
            return interaction.reply({ 
                content: `${config.emoji.error} | You must be in a voice channel to play music!`, 
                ephemeral: true 
            });
        }

        await interaction.reply(`${config.emoji.search} | Searching for \`${query}\`...`);

        try {
            interaction.client.distube.play(voiceChannel, query, {
                textChannel: interaction.channel,
                member: interaction.member,
            });
            
            // Delete searching message after a few seconds
            setTimeout(() => interaction.deleteReply().catch(() => {}), 5000);
        } catch (e) {
            console.error(e);
            interaction.editReply(`${config.emoji.error} | Error: ${e.message}`);
        }
    },
};

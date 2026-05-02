const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);
            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'Error executing command!', ephemeral: true });
            }
        } else if (interaction.isButton()) {
            const queue = interaction.client.distube.getQueue(interaction.guildId);
            if (!queue) return interaction.reply({ content: 'No music playing!', ephemeral: true });

            switch (interaction.customId) {
                case 'pause':
                    if (queue.paused) {
                        queue.resume();
                        await interaction.reply({ content: '▶️ Resumed!', ephemeral: true });
                    } else {
                        queue.pause();
                        await interaction.reply({ content: '⏸️ Paused!', ephemeral: true });
                    }
                    break;
                case 'skip':
                    try {
                        await queue.skip();
                        await interaction.reply({ content: '⏭️ Skipped!', ephemeral: true });
                    } catch (e) {
                        await interaction.reply({ content: 'No more songs to skip!', ephemeral: true });
                    }
                    break;
                case 'stop':
                    queue.stop();
                    await interaction.reply({ content: '⏹️ Stopped!', ephemeral: true });
                    break;
            }
        }
    },
};

const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('../config');

module.exports = async (client) => {
    const commands = [];
    const commandsPath = path.join(__dirname, '../commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
            commands.push(command.data.toJSON());
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }

    const rest = new REST().setToken(config.token);

    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // If guildId is provided, register to guild (faster updates)
        if (config.guildId) {
            await rest.put(
                Routes.applicationGuildCommands(config.clientId, config.guildId),
                { body: commands },
            );
        } else {
            // Otherwise register globally
            await rest.put(
                Routes.applicationCommands(config.clientId),
                { body: commands },
            );
        }

        console.log(`Successfully reloaded application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
};

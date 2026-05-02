require('dotenv').config();

module.exports = {
    token: process.env.DISCORD_TOKEN,
    clientId: process.env.CLIENT_ID,
    guildId: process.env.GUILD_ID,
    colors: {
        primary: '#FF0055', // Sleek Pink/Red
        secondary: '#00D4FF', // Cyan
        success: '#00FF99',
        error: '#FF3333'
    },
    emoji: {
        play: '▶️',
        pause: '⏸️',
        stop: '⏹️',
        skip: '⏭️',
        queue: '📜',
        volume: '🔊',
        search: '🔍',
        loading: '⏳'
    }
};

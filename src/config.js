require('dotenv').config();

module.exports = {
    token: process.env.DISCORD_TOKEN,
    clientId: process.env.CLIENT_ID,
    guildId: process.env.GUILD_ID,
    colors: {
        primary: '#FF0055', 
        secondary: '#00D4FF', 
        success: '#00FF99',
        error: '#FF3333',
        black: '#000000'
    },
    icons: {
        music: 'https://cdn-icons-png.flaticon.com/512/3844/3844724.png',
        play: 'https://cdn-icons-png.flaticon.com/512/0/375.png',
        error: 'https://cdn-icons-png.flaticon.com/512/564/564619.png'
    },
    emoji: {
        play: '󰐌', // Modern play symbol (requires font support, but safe fallback)
        pause: '󰏤',
        stop: '󰓛',
        skip: '󰒭',
        queue: '󰲒',
        volume: '󰕾',
        search: '󰍉',
        loading: '󱎫',
        error: '❌',
        dot: '•'
    }
};

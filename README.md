# New Gen Discord Music Bot 🎵

A premium, feature-rich Discord music bot built with **discord.js v14** and **DisTube**.

## 🚀 Features
- ⚡ **Slash Commands**: Modern and easy-to-use interface.
- 🎶 **Multi-Platform**: Support for YouTube, Spotify, SoundCloud, and more.
- 💎 **Premium UI**: Beautiful embeds with progress bars and status updates.
- 🎮 **Voice Controls**: Skip, Stop, Queue, Now Playing, and Volume.
- 🛠️ **Reliable**: Built-in error handling and auto-reconnect.

## 🛠️ Setup Instructions

### 1. Prerequisites
- [Node.js](https://nodejs.org/) v16.11.0 or higher.
- A Discord Bot Token (from [Discord Developer Portal](https://discord.com/developers/applications)).
- Discord Bot "Message Content" and "Server Members" Intents enabled.

### 2. Configuration
1. Clone or download this project.
2. Rename `.env.example` to `.env`.
3. Fill in your bot credentials:
   ```env
   DISCORD_TOKEN=your_token_here
   CLIENT_ID=your_bot_client_id
   GUILD_ID=your_test_server_id (optional, for fast command updates)
   ```

### 3. Installation
Open your terminal in the project directory and run:
```bash
npm install
```

### 4. Running the Bot
```bash
node src/index.js
```

## 📜 Commands
- `/play <query>` - Play music from search or URL.
- `/skip` - Skip to the next track.
- `/stop` - Stop the music and clear the queue.
- `/queue` - View the current playlist.
- `/nowplaying` - Show details about the current track.

## 🎨 Aesthetic Configuration
You can customize the bot's look in `src/config.js`, including colors and emojis.

import { SpotifyExtractor, AppleMusicExtractor } from '@discord-player/extractor';
import { YoutubeiExtractor } from 'discord-player-youtubei';
import { Player } from 'discord-player';
import { exec } from 'child_process';
import config from './config.json' with { type: 'json' };
import fs from 'node:fs';
import path from 'node:path';
import pkg from 'discord.js';

const { Client, GatewayIntentBits, Collection } = pkg;

const __dirname = import.meta.dirname;

// Clear ytdl-core cache
exec('rm -r -f node_modules/.cache/ytdl-core', (error) => {
    if (error) console.error(`Error clearing ytdl-core cache: ${error.message}`);
    else console.log('ytdl-core cache cleared successfully.');
});

// Initialize Client
export const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildVoiceStates]});

// Load Events from Events folder
const eventsPath = path.join(__dirname, 'Events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

// Run commands when called
for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const { default: event } = await import(`file://${filePath}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
    }
}

// Create command collection
client.commands = new Collection();

// Set FFMPEG path
process.env.FFMPEG_PATH = "C:\\ffmpeg\\ffmpeg.exe";

// Create player and add extractors
client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
});

// Add extractors
client.player.extractors.register(YoutubeiExtractor);
client.player.extractors.register(SpotifyExtractor);
client.player.extractors.register(AppleMusicExtractor);

// Load commands from Command folder
const commandsPath = path.join(__dirname, 'Commands');
const commandFiles = fs.readdirSync(commandsPath, { recursive: true }).filter(file => file.endsWith('.js'));

// Add commands to command Collection
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const { default: command } = await import(`file://${filePath}`);

    // Set new item in command collection
    // key: name, value: exported module
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

// Log in to Discord using the token
client.login(config.token);
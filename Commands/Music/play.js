import { QueryType } from 'discord-player';
import pkg from 'discord.js';
const { SlashCommandBuilder, EmbedBuilder, Client, Interaction } = pkg;

const playCommand = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Play a song in a voice channel")
        .addSubcommand(subcommand => 
            subcommand
                .setName('song')
                .setDescription('Plays a single song from a URL')
                .addStringOption(option => 
                    option
                        .setName('link')
                        .setDescription('The URL to play the song from')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand => 
            subcommand
                .setName('playlist')
                .setDescription('Plays a playlist from a URL')
                .addStringOption(option => 
                    option
                        .setName('link')
                        .setDescription('The URL to get the playlist from')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('search')
                .setDescription('Search for a song based on keywords')
                .addStringOption(option =>
                    option
                        .setName('keywords')
                        .setDescription('The keywords to search for')
                        .setRequired(true)
                )
        ),

    /**
     * Executes the play command upon interaction.
     * @param {Client} client The Discord client instance.
     * @param {Interaction} interaction The interaction object representing the command interaction.
     * @returns 
     */
    async execute(client, interaction) {
        // Check if the user is in a voice channel
        if (!interaction.member.voice.channel) return interaction.reply("You need to be in a voice channel to play something!");

        await interaction.deferReply();

        // Create queue
        const queue = await client.player.nodes.create(interaction.guild, { leaveOnEmptyCooldown: 300000, leaveOnEndCooldown: 300000 });
        if (!queue.connection) await queue.connect(interaction.member.voice.channel);

        let embed = new EmbedBuilder()
            .setColor('Random');

        let subcommand = interaction.options.getSubcommand();

        if (subcommand == "song") {
            let url = interaction.options.getString("link");
            let searchEngine;

            // Define search engine based on provided URL
            if (url.includes("open.spotify.com")) searchEngine = QueryType.SPOTIFY_SONG;
            else if (url.includes("music.apple.com")) searchEngine = QueryType.APPLE_MUSIC_SONG;
            else searchEngine = QueryType.YOUTUBE_VIDEO;

            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: searchEngine
            });

            // Return if no song is found
            if (result.tracks.length === 0) return interaction.editReply("Could not find song.");

            const song = result.tracks[0];
            await queue.addTrack(song);
            embed
                .setDescription(`**[${song.title}](${song.url})** has been added to the queue!`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Duration: ${song.duration}` });

        } else if (subcommand == "playlist") {
            let url = interaction.options.getString("link");
            let searchEngine;

            // Define search engine based on provided URL
            if (url.includes("youtu")) searchEngine = QueryType.YOUTUBE_PLAYLIST;
            else if (url.includes("open.spotify.com")) searchEngine = QueryType.SPOTIFY_PLAYLIST;
            else if (url.includes("music.apple.com")) searchEngine = QueryType.APPLE_MUSIC_PLAYLIST;

            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: searchEngine
            });

            // Return if no song is found
            if (result.tracks.length === 0) return interaction.editReply("Could not find song.");

            const playlist = result.playlist;
            if (!playlist) return interaction.editReply("Could not find playlist.");
                
            await queue.addTrack(result.tracks);
            embed
                .setDescription(`**${result.tracks.length} songs from [${playlist.title}](${playlist.url})** have been added to the queue!`)
                .setThumbnail(playlist.thumbnail);

        } else if (subcommand == "search") {
            let url = interaction.options.getString("keywords");

            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            });

            // Return if no song is found
            if (result.tracks.length === 0) return interaction.editReply("Could not find song.");

            const song = result.tracks[0];
            await queue.addTrack(song);
            embed
                .setDescription(`**[${song.title}](${song.url})** has been added to the queue!`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Duration: ${song.duration}` });
        }

        if (!queue.isPlaying()) await queue.node.play();

        return interaction.editReply({ embeds: [embed] });
    }
};

export default playCommand;
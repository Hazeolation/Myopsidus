import pkg from 'discord.js';
const { SlashCommandBuilder, EmbedBuilder, Client, Interaction } = pkg;

const skipCommand = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Skips the current song"),

    /**
     * Executes the skip command upon interaction.
     * @param {Client} client The Discord client instance.
     * @param {Interaction} interaction The interaction object representing the command interaction.
     */
    async execute(client, interaction) {
        // Check if the user is in a voice channel
        if (!interaction.member.voice.channel) return interaction.reply("You need to be in a voice channel to play something!");

        const queue = client.player.nodes.get(interaction.guild);

        if (!queue) return interaction.reply("There are no songs in the queue!");

        const currentSong = queue.currentTrack;

        let embed = new EmbedBuilder()
            .setDescription(`${currentSong.title} has been skipped!`)
            .setThumbnail(currentSong.thumbnail);

        queue.node.skip();
        interaction.reply({ embeds: [embed] });
    }
};

export default skipCommand;
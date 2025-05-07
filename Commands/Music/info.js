import pkg from 'discord.js';
const { SlashCommandBuilder, EmbedBuilder, Client, Interaction } = pkg;

const infoCommand = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Displays information about the currently playing song"),

    /**
     * Executes the info command upon interaction.
     * @param {Client} client The Discord client instance.
     * @param {Interaction} interaction The interaction object representing the command interaction.
     */
    async execute(client, interaction) {
        const queue = client.player.nodes.get(interaction.guild);

        if (!queue) return interaction.reply("There are no songs in the queue!");

        let bar = queue.node.createProgressBar({
            queue: false,
            length: 19
        });

        const song = queue.currentTrack;

        let embed = new EmbedBuilder()
            .setThumbnail(song.thumbnail)
            .setDescription(`Currently playing [${song.title}](${song.url})\n\n` + bar);

        interaction.reply({ embeds: [embed] });
    }
};

export default infoCommand;
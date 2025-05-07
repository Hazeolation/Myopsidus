import pkg from 'discord.js';
const { SlashCommandBuilder, Client, Interaction } = pkg;

const jumpCommand = {
    data: new SlashCommandBuilder()
        .setName("jump")
        .setDescription("Jumps to the specified song in the queue")
        .addNumberOption(option =>
            option
                .setName("track")
                .setDescription("The track number to jump to")
                .setMinValue(1)
                .setRequired(true)
        ),
    
    /**
     * Executes the jump command upon interaction.
     * @param {Client} client The Discord client instance.
     * @param {Interaction} interaction The interaction object representing the command interaction.
     */
    async execute(client, interaction) {
        // Check if the user is in a voice channel
        if (!interaction.member.voice.channel) return interaction.reply("You need to be in a voice channel to play something!");

        const queue = client.player.nodes.get(interaction.guild);

        if (!queue) return interaction.reply("There are no songs in the queue!");

        const track = interaction.options.getNumber("track");
        if (track > queue.tracks.length) return interaction.reply("Invalid track number!");

        queue.node.skipTo(track - 1);
        interaction.reply(`Skipped to track ${track}`);
    }
};

export default jumpCommand;
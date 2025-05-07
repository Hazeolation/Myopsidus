import pkg from 'discord.js';
const { SlashCommandBuilder, Client, Interaction } = pkg;

const pauseCommand = {
    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pauses playback"),

    /**
     * Executes the pause command upon interaction.
     * @param {Client} client The Discord client instance.
     * @param {Interaction} interaction The interaction object representing the command interaction.
     */
    async execute(client, interaction) {
        // Check if the user is in a voice channel
        if (!interaction.member.voice.channel) return interaction.reply("You need to be in a voice channel to play something!");

        const queue = client.player.nodes.get(interaction.guild);

        if (!queue) return interaction.reply("There are no songs in the queue!");

        queue.node.setPaused(true);
        interaction.reply("Playback has been paused! Use `/resume` to resume playback.");
    }
};

export default pauseCommand;
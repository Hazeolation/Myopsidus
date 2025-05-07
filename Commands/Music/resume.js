import pkg from 'discord.js';
const { SlashCommandBuilder, Client, Interaction } = pkg;

const resumeCommand = {
    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Resumes playback"),

    /**
     * Executes the resume command.
     * @param {Client} client The instance of the Discord bot
     * @param {Interaction} interaction The command interaction
     */
    async execute(client, interaction) {
        // Check if the user is in a voice channel
        if (!interaction.member.voice.channel) return interaction.reply("You need to be in a voice channel to play something!");

        const queue = client.player.nodes.get(interaction.guild);

        if (!queue) return interaction.reply("There are no songs in the queue!");

        queue.node.setPaused(false);
        interaction.reply("Playback has been resumed! Use `/pause` to pause playback.");
    }
};

export default resumeCommand;
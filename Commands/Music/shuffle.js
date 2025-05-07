import pkg from 'discord.js';
const { SlashCommandBuilder, Client, Interaction } = pkg;

const shuffleCommand = {
    data: new SlashCommandBuilder()
        .setName("shuffle")
        .setDescription("Shuffles the queue"),
    
    /**
     * Executes the shuffle command upon interaction.
     * @param {Client} client The Discord client instance.
     * @param {Interaction} interaction The interaction object representing the command interaction.
     */
    async execute(client, interaction) {
        // Check if the user is in a voice channel
        if (!interaction.member.voice.channel) return interaction.reply("You need to be in a voice channel to play something!");

        const queue = client.player.nodes.get(interaction.guild);

        if (!queue) return interaction.reply("There are no songs in the queue!");

        queue.toggleShuffle(true);
        interaction.reply(`Shuffled ${queue.tracks.toArray().length} songs in the queue!`);
    }
};

export default shuffleCommand;
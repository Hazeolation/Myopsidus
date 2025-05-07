import pkg from 'discord.js';
const { SlashCommandBuilder, EmbedBuilder, Client, Interaction } = pkg;

const queueCommand = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("Displays the current song queue")
        .addNumberOption(option => 
            option
                .setName("page")
                .setDescription("The page number to view")
                .setMinValue(1)
        ),

    /**
     * Executes the queue command upon interaction.
     * @param {Client} client The Discord client instance.
     * @param {Interaction} interaction The interaction object representing the command interaction.
     */
    async execute(client, interaction) {
        const queue = client.player.nodes.get(interaction.guild);

        if (!queue || !queue.isPlaying()) return interaction.reply("There are no songs playing in the queue!");

        const totalPages = Math.ceil(queue.tracks.toArray().length / 10) || 1;
        const page = (interaction.options.getNumber("page") || 1) - 1;
        if (page + 1 > totalPages) return interaction.reply(`Invalid page number! Right now, there are only ${totalPages} pages.`);

        const queueString = queue.tracks.toArray().slice(page * 10, page * 10 + 10).map((song, i) => {
            return `**${page * 10 + i + 1}.** \`[${song.duration}]\` ${song.title} -- <@${song.requestedBy.id}>`;
        }).join("\n");

        const currentSong = queue.currentTrack;

        let embed = new EmbedBuilder()
            .setDescription(`**Currently Playing**\n` +
            (currentSong ? `\`[${currentSong.duration}]\` ${currentSong.title} -- <@${currentSong.requestedBy.id}>` : "None") + 
            `\n\n**Queue**\n${queueString}`)
            .setFooter({ text: `Page ${page + 1} of ${totalPages}` })
            .setThumbnail(currentSong.thumbnail);

        interaction.reply({ embeds: [embed] });
    }
};

export default queueCommand;
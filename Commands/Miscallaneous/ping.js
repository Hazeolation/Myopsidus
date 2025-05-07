import pkg from 'discord.js';
const { SlashCommandBuilder, EmbedBuilder, Client, Interaction } = pkg;

const pingCommand = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Displays the latency of the bot."),

    /**
     * Executes the ping command upon interaction.
     * @param {Client} client The Discord client instance.
     * @param {Interaction} interaction The interaction object representing the command interaction.
     */
    async execute(client, interaction) {
        const sent = await interaction.reply({ content: "Pinging...", fetchResponse: true });
        const Response = new EmbedBuilder()
            .setColor('Green')
            .setDescription(`Heartbeat: ${client.ws.ping}ms\nRoundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);

        interaction.editReply({ content: "Ping done!", embeds: [Response] });
    }
};

export default pingCommand;
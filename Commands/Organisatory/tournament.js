import config from '../../config.json' with { type: 'json' };
import pkg from 'discord.js';
const { SlashCommandBuilder, EmbedBuilder, Client, Interaction } = pkg;

const tournamentCommand = {
    data: new SlashCommandBuilder()
        .setName("tournament")
        .setDescription("Adds a new tournament to #lfg-tournament")
        .addStringOption(option =>
            option
                .setName("name")
                .setDescription("The name of the tournament")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("date")
                .setDescription("The date of the tournament (dd/mm/yy)")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("description")
                .setDescription("The description of the tournament")
        )
        .addStringOption(option =>
            option
                .setName("link")
                .setDescription("The link for more information on the tournament")
        ),

    /**
     * Executes the tournament command upon interaction.
     * @param {Client} client The Discord client instance.
     * @param {Interaction} interaction The interaction object representing the command interaction.
     */
    async execute(client, interaction) {
        // Check if user has member role
        if (!interaction.member.roles.cache.find(role => role.id === config.roles.myopsidusMainRoleId)) return interaction.reply("You are not a member of Myopsidus, so you may not use this command!");

        let name = interaction.options.getString("name");
        let description = interaction.options.getString("description");
        let date = interaction.options.getString("date");
        let link = interaction.options.getString("link");

        if (link && !link.startsWith("https:") && !link.startsWith("http:")) return interaction.reply("Link must start with \"http:\" or \"https:\"");

        interaction.deferReply();
        
        let channelId = config.channels.lfgTournamentChannelId;
        let channel = await interaction.guild.channels.fetch(channelId);

        const response = new EmbedBuilder()
            .setColor('Random')
            .setAuthor({ name: name, url: link })
            .setDescription(description)
            .setFooter({ text: `${date} - Added by ${interaction.user.tag}` })

        let message = await channel.send({ content: `<@&${config.roles.myopsidusMainRoleId}>`, embeds: [response] });
        await message.react('✅');
        await message.react('❔');
        await message.react('❕');
        await message.react('❌');

        interaction.editReply("Successfully added tournament!");
    }
};

export default tournamentCommand;
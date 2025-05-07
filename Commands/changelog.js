import pkg from 'discord.js';
const { SlashCommandBuilder, EmbedBuilder, Client, Interaction } = pkg;

const changelogCommand = {
    data: new SlashCommandBuilder()
        .setName("changelog")
        .setDescription("See changelog of a specific version")
        .addStringOption(option =>
            option
                .setName("version")
                .setDescription("The version to get the changelog of")
                .addChoices(
                    { name: 'Version 1.0.0', value: 'v1.0.0' },
                    { name: 'Version 1.0.1', value: 'v1.0.1' },
                    { name: 'Version 1.1.0', value: 'v1.1.0' },
                    { name: 'Version 1.1.1', value: 'v1.1.1' },
                    { name: 'Version 1.1.2', value: 'v1.1.2' },
                    { name: 'Version 1.2.0', value: 'v1.2.0' },
                    { name: 'Version 2.0.0', value: 'v2.0.0' }
                )
                .setRequired(true)
        ),
    
    /**
     * Executes the changelog command upon interaction.
     * @param {Client} client The Discord client instance.
     * @param {Interaction} interaction The interaction object representing the command interaction.
     */
    async execute(client, interaction) {
        let version = interaction.options.getString("version");

        let embed = new EmbedBuilder()
            .setTitle(`${version} Changes`)
            .setDescription(getVersionDescription(version))
            .setColor('Green')

        interaction.reply({ embeds: [embed] });
    }
};

const getVersionDescription = (version) => {
    switch (version) {
        case "v1.0.0":
            return "* Created bot with commands `/cleanup` and `/tournament`.";
        case "v1.0.1":
            return "* Patched issues with `/tournament` command.\n" +
            "\t* The command would fail if no link is provided.";
        case "v1.1.0":
            return "* Added notification whenever a new version of the bot is out.\n" +
            "* Added `/changelog` command.\n" +
            "* Added music feature\n" +
            "\t* `/play song`: Lets you add a single song to the queue.\n" +
            "\t* `/play playlist`: Lets you add a playlist to the queue.\n" +
            "\t* `/play search`: Lets you search for songs using keywords.\n" +
            "\t* `/shuffle`: Lets you shuffle the current queue.\n" +
            "\t* `/stop`: Stops playback and leaves the voice channel.\n" +
            "\t* `/info`: Provides information about the currently playing song.\n" +
            "\t* `/queue`: Displays the current queue.\n" +
            "\t* `/pause`: Pauses playback.\n" +
            "\t* `/resume`: Resumes playback.\n" + 
            "\t* `/skip`: Skips the current song.\n" +
            "\t* `/jump`: Jumps to a specified song in the queue.\n" +
            "* Reworked `/ping` command.";
        case "v1.1.1":
            return "* Added `/loop track` command.\n" +
            "* Added `/loop queue` command.\n" +
            "* Fixed a problem where people not present in a voice chat can pause, resume, and stop playback.\n" +
            "* Fixed `/queue` displaying a wrong total page count.";
        case "v1.1.2":
            return "* Fixed the music feature not playing music.\n" +
            "* Added error messages for clearance with automated redirection to Haze's DMs for easier information gathering."
        case "v1.2.0":
            return "* Added automation for `/cleanup` command.\n" +
            "\t* The `/cleanup` command will now automatically be executed on sundays at 10pm UTC.\n" +
            "* Fixed the music feature.\n" +
            "* Revamped code stuff for a potential future GitHub repository.\n"
        case "v2.0.0":
            return "LATEST\n" +
            "* Revamped codebase for better maintainability.\n" +
            "* Fixed a typo in `/changelog`.\n" +
            "* Created a GitHub repository for the bot.\n" +
            "\t* [GitHub Repository]()\n" + 
            "\tIt is recommended to create an issue on GitHub if you encounter a bug.\n" +
            "\tIf you want to assist the development of the bot, you can also create a pull request.";
        default:
            return "You shouldn't be able to see this!";
    };
};

export default changelogCommand;
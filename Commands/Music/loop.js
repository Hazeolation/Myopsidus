import { QueueRepeatMode } from 'discord-player';
import pkg from 'discord.js';
const { SlashCommandBuilder, EmbedBuilder, Client, Interaction } = pkg;

const loopCommand = {
    data: new SlashCommandBuilder()
        .setName("loop")
        .setDescription("Loop the song or the queue")
        .addSubcommand(subcommand => 
            subcommand
                .setName("track")
                .setDescription("Loop the current song")
                .addStringOption(option =>
                    option
                        .setName("toggle")
                        .setDescription("Whether queue loop should be enabled or disabled")
                        .addChoices(
                            { name: "enable", value: "enable" },
                            { name: "disable", value: "disable" }
                        )
                )
        )
        .addSubcommand(subcommand => 
            subcommand
                .setName("queue")
                .setDescription("Loop the queue")
                .addStringOption(option =>
                    option
                        .setName("toggle")
                        .setDescription("Whether queue loop should be enabled or disabled")
                        .addChoices(
                            { name: "enable", value: "enable" },
                            { name: "disable", value: "disable" }
                        )
                )
        ),

    /**
     * Executes the loop command upon interaction.
     * @param {Client} client The Discord client instance.
     * @param {Interaction} interaction The interaction object representing the command interaction.
     */
    async execute(client, interaction) {
        // Check if the user is in a voice channel
        if (!interaction.member.voice.channel) return interaction.reply("You need to be in a voice channel to play something!");

        const queue = client.player.nodes.get(interaction.guild);
        if (!queue) return interaction.reply("There are no songs in the queue!");

        let subcommand = interaction.options.getSubcommand();
        let embed = new EmbedBuilder()
            .setTitle("Changed loop");

        if (subcommand === "track") {
            let option = interaction.options.getString("toggle");
            if (option === "enable") {
                queue.setRepeatMode(QueueRepeatMode.TRACK);
                embed.setDescription("🟢 Loop is now ENABLED (track).");
            } else {
                queue.setRepeatMode(QueueRepeatMode.OFF);
                embed.setDescription("🔴 Loop is now DISABLED.");
            } 

        } else if (subcommand === "queue") {
            let option = interaction.options.getString("toggle");
            if (option === "enable") {
                queue.setRepeatMode(QueueRepeatMode.QUEUE);
                embed.setDescription("🟢 Loop is now ENABLED (queue).");
            } else {
                queue.setRepeatMode(QueueRepeatMode.OFF);
                embed.setDescription("🔴 Loop is now DISABLED.");
            }
        }

        queue.toggleShuffle(true);
        interaction.reply({ embeds: [embed] });
    }
};

export default loopCommand;
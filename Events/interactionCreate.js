import config from '../config.json' with { type: 'json' };
import pkg from 'discord.js';
const { Events, Client, Interaction } = pkg;

const interactionCreateEvent = {
    name: Events.InteractionCreate,
    /**
     * Executes when an interaction is created.
     * @param {Client} client The Discord client instance.
     * @param {Interaction} interaction The interaction object representing the command interaction.
     */
    async execute(client, interaction) {
        // Ignore if interaction isn't a slash command
        if (!interaction.isChatInputCommand()) return;

        // Find used command in command collection
        const command = interaction.client.commands.get(interaction.commandName);

        // Output an error if no command is found
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        // Attempt to run the used command
        try {
            await command.execute(client, interaction);
        } catch (error) {
            console.error(error);
            interaction.reply(error.message ? "An error occurred:\n" + error.message : "An unknown error has occurred (probably because of Haze).")
            let user = client.users.cache.get(config.users.haze);
            user.send(error.message ? "An error has occurred:\n" + error.message : "An empty error has been thrown, you possibly forgot to remove a debug statement in prod");
        }
    }

};

export default interactionCreateEvent;
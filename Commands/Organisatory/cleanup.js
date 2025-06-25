import config from '../../config.json' with { type: 'json' };
import moment from 'moment';
import pkg from 'discord.js';
const { SlashCommandBuilder, Channel, Client, Interaction } = pkg;

const cleanupCommand = {
    data: new SlashCommandBuilder()
        .setName("cleanup")
        .setDescription("Cleans up #lfg-training and posts new time messages."),

    /**
     * Executes the cleanup command upon interaction.
     * @param {Client} client The instance of the Discord Bot
     * @param {Interaction} interaction The interaction object representing the command interaction.
     */
    async execute(client, interaction) {
        // Check if user has member role
        if (!interaction.member.roles.cache.find(role => role.id === config.roles.myopsidusMainRoleId)) return interaction.reply("You are not a member of Myopsidus, so you may not use this command!");

        await interaction.deferReply();

        let channelId = config.channels.lfgTrainingChannelId;
        let channel = await interaction.guild.channels.fetch(channelId);

        await prepareChannel(channel);
        
        interaction.editReply("Cleaned up #lfg-training!");
    },
};

/**
 * Prepares the channel by deleting old messages and posting new time messages.
 * @param {Channel} channel The channel to prepare
 */
const prepareChannel = async (channel) => {
    // Delete old messages to prepare for new ones
    await channel.bulkDelete(50, false);

    let unix = moment().utc().isoWeekday(8).startOf('day').unix()
    let message = await channel.send(`Monday, <t:${unix}:D>`);
    await message.react('✅');
    await message.react('❔');
    await message.react('❕');
    await message.react('❌');
    await message.react('<:swag_turt:1238515638327050331>'); // Custom emoji in Myopsidus server

    unix += 86400;
    let message2 = await channel.send(`Tuesday, <t:${unix}:D>`);
    await message2.react('✅');
    await message2.react('❔');
    await message2.react('❕');
    await message2.react('❌');
    await message2.react('<:swag_turt:1238515638327050331>');

    unix += 86400;
    let message3 = await channel.send(`Wednesday, <t:${unix}:D>`);
    await message3.react('✅');
    await message3.react('❔');
    await message3.react('❕');
    await message3.react('❌');
    await message3.react('<:swag_turt:1238515638327050331>');
    
    unix += 86400;
    let message4 = await channel.send(`Thursday, <t:${unix}:D>`);
    await message4.react('✅');
    await message4.react('❔');
    await message4.react('❕');
    await message4.react('❌');
    await message4.react('<:swag_turt:1238515638327050331>');
    
    unix += 86400;
    let message5 = await channel.send(`Friday, <t:${unix}:D>`);
    await message5.react('✅');
    await message5.react('❔');
    await message5.react('❕');
    await message5.react('❌');
    await message5.react('<:swag_turt:1238515638327050331>');

    unix += 86400;
    let message6 = await channel.send(`Saturday, <t:${unix}:D>`);
    await message6.react('✅');
    await message6.react('❔');
    await message6.react('❕');
    await message6.react('❌');
    await message6.react('<:swag_turt:1238515638327050331>');
    
    unix += 86400;
    let message7 = await channel.send(`Sunday, <t:${unix}:D>`);
    await message7.react('✅');
    await message7.react('❔');
    await message7.react('❕');
    await message7.react('❌');
    await message7.react('<:swag_turt:1238515638327050331>');
};

export { cleanupCommand as default, prepareChannel };
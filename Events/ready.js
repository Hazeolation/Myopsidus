import { CronJob } from 'cron';
import { prepareChannel } from '../Commands/Organisatory/cleanup.js';
import fs from 'node:fs/promises';
import botInfo from '../botinfo.json' with { type: 'json' };
import config from '../config.json' with { type: 'json' };
import pkg from 'discord.js';
const { Events, ActivityType, Client } = pkg;
const readyEvent = {
    name: Events.ClientReady,
    once: true,
    /**
     * Executes once when the bot is ready to run.
     * @param {Client} client The instance of the Discord bot
     */
    async execute(client) {
        // Seconds - Minutes - Hours - Day - Month - Weekday
        let scheduledMessage = new CronJob('00 00 13 * * *', async () => {
            // This runs every day at 1pm UTC
            const guild = client.guilds.cache.get(config.guildId);
            const lfgChannel = guild.channels.cache.get(config.channels.lfgTrainingChannelId);
            const lineupChannel = guild.channels.cache.get(config.channels.lineupChannelId);
            let today = new Date();
            let dayOfWeek = today.getDay() - 1;
            let messages = Array.from((await lfgChannel.messages.fetch({ limit: 50 })).values()).reverse();
            let index = dayOfWeek;
            if (index < 0) index = 6;
            let lfgMessage = messages[index];
            let notSureArray = [];
            for (let reaction of lfgMessage.reactions.cache.values()) {
                const emojiName = reaction._emoji.name;
                if (emojiName != '❔') continue;
                const reactionUsers = await reaction.users.fetch();
                for (let user of reactionUsers.values()) {
                    if (user.bot === true) continue;
                    notSureArray.push(user);
                }
            }
            if (notSureArray.length == 0) return;
            
            let reminderMessage = "";
            for (let member of notSureArray.values()) {
                reminderMessage += `<@!${member.id}>\n`;
            }
            reminderMessage += "You should change your reaction... NOW!";
            lineupChannel.send(reminderMessage);
        });
        let scheduledCleanup = new CronJob('00 00 23 * * 0', async () => {
            // This runs every Sunday at 11pm UTC
            const guild = client.guilds.cache.get(config.guildId);
            const lfgChannel = guild.channels.cache.get(config.channels.lfgTrainingChannelId);
            await prepareChannel(lfgChannel);
        });
        scheduledMessage.start();
        scheduledCleanup.start();
        client.user.setPresence({
            activities: [{ name: `Myopsidus play || I do management stuff for Myopsidus`, type: ActivityType.Watching }],
            status: 'online'
        });
        // Check if a new version is out
        if (botInfo.version != botInfo['previous-version']) {
            let channelId = config.channels.memberChatChannelId;
            let channel = client.channels.cache.get(channelId);
            channel.send(`Version ${botInfo.version} is now out! Check out the details with \`/changelog\`.`);
            botInfo['previous-version'] = botInfo.version;
            await fs.writeFile("./botInfo.json", JSON.stringify(botInfo));
        }
        console.log("Myopsidus is ready!");
    }
};
export default readyEvent;

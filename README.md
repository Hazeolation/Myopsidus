# Myopsidus

Myopsidus is a custom Discord bot built for the Splatoon 3 competitive team "Myopsidus".  
It automates team coordination and is tailored to the team's needs, including music features and changelogs.

## Features

-   Custom slash commands for team coordination
-   Music playback commands
-   Easy implementation of new commands via the inclusion of a new command file

## Prerequisites

| Program | Version   |
| ------- | --------- |
| Node.js | >=18.17.0 |
| NPM     | >=8.0.0   |

You are also required to create a Discord bot on the Discord Developer Portal.

## How to run

To run this code, follow these steps:

### 1. Create a Discord application with a bot

To create a Discord application, navigate to the [Discord Developer Portal](https://discord.com/developers/) and create a new application. You will need to copy the application details into your configuration file.
![image](https://github.com/user-attachments/assets/54e402b1-57cd-435a-bc30-89f9611ccdff)

### 2. Clone this repository

To get started, clone this repository to your local machine.

> [!TIP]
> It is recommended to fork the repository, as this allows you to make changes of your own.

### 3. Install packages

Since this bot uses npm packages, you need to install them first. To do so, navigate to the root directory of the repository, open a command prompt or terminal and run `npm install` or `npm i`. This automatically installs all package dependencies of the project.

### 4. Create a `config.json` file

Since this is the file that contains all of your sensitive information, it is not included in this repository. The currently used format is as follows:

```json
{
	"token": "[YOUR_DISCORD_TOKEN]",
	"clientId": "[YOUR_BOTS_APPLICATION_ID]",
	"guildId": "[YOUR_SERVER_ID]",
	"channels": {
		"[CHANNEL_NAME]": "[CHANNEL_ID]"
		// ...
	},
	"roles": {
		"[ROLE_NAME]": "[ROLE_ID]"
		// ...
	},
	"users": {
		"[USERNAME]": "[USER_ID]"
		// ...
	}
}
```

Fill in the placeholders with the corresponding values.  
You can get your Discord token and Client ID via the Discord Developer Portal. To get the server ID, enable Developer Mode on Discord, right click the desired server and select "Copy server ID". To get the channel IDs, role IDs and the user IDs, right click the desired channel, role or user with Developer Mode enabled and select "Copy User ID" or "Copy Role ID".  
![image](https://github.com/user-attachments/assets/3166495b-6d73-4967-9fe7-2b2b2dff098b)  
![image](https://github.com/user-attachments/assets/a0ef5e4a-14b5-4b0a-b92c-e3d555868c66)  
![image](https://github.com/user-attachments/assets/95189956-e4db-4652-bd6d-3fc4a7865302)  
The username can be any value you'd like. It is recommended to set it to the Discord display name of the user.  
To get the user tag, click on the user and copy the username under the user's display name.  
![image](https://github.com/user-attachments/assets/ec2f225b-4082-4d75-8018-9d3d282c1e9c)

> [!WARNING]  
> For security reasons, you should NEVER push this file to your repository. Never share your Discord token! If you fear that it has been compromised, regenerate it on the Discord Developer Portal as soon as possible.

### 5. Add your Discord bot to your server

Go to the Discord Developer Portal. Under the OAuth2 tab, generate an invite link for your bot by selecting the bot scope and the required permissions.
To have this codebase run properly, you are required to have at least the following permissions:

**General Permissions**

-   View Channels

**Text Permissions**

-   Send Messages
-   Manage Messages
-   Read Message History
-   Add Reactions

**Voice Permissions**

-   Connect
-   Speak

> [!WARNING]
> Never give your bot Administrator permissions unless you have a good reason to do so! If someone else has your bot's Discord token, they may run malicious code on your behalf and damage your server via Nuking, Spamming or similar.

### 6. Register commands to Discord

Assuming you are in the root directory of the repository, to register commands to Discord, run the command deployment script using: `node ./Scripts/deploy-commands.js`.
Once this is done, you should be able to see your application (/) commands in the server with the bot.
![image](https://github.com/user-attachments/assets/40fa2fcb-d555-46ae-af7b-c9db5d534113)

## Contribution

If you would like to contribute to this bot, feel free to create a branch and propose changes via a Pull Request! If you don't have experience with JavaScript but want to help out regardless, create Issues with problems you may experience.

## Getting Help

If you run into problems or have questions, open an [issue](https://github.com/Hazeolation/Myopsidus/issues) or start a discussion!

## License

This project is licensed under the [MIT License](LICENSE).
It also includes third-party libraries licensed under the Apache License 2.0.

See the [LICENSE](LICENSE), [APACHE_LICENSE.txt](APACHE_LICENSE.txt), and [NOTICE](NOTICE) files for more details.

### What does this mean?

The MIT License is a permissive open-source license that allows for maximum freedom in how you use this code. Specifically, it allows you to:

-   **Use** the code for personal, academic, or commercial purposes.
-   **Modify** the source code to suit your needs.
-   **Distribute** original or modified versions of this code.
-   **Sublicense** the code under different terms if integrated into a larger project.
-   **Private use** without any obligations to disclose changes.

### Conditions

To use this code legally, you must:

-   Include the original **copyright notice**.
-   Include the **license text** in any copies or substantial portions of the software.

These conditions must be preserved in any distribution, including binaries compiled from this code.

### Disclaimer

This software is provided **"as is"**, without warranty of any kind. The authors are not liable for any damages or issues that may arise from using, modifying, or distributing the code, including but not limited to:

-   Loss of data
-   Security vulnerabilities
-   Downtime or business interruption
-   Any other direct or indirect consequences

By using this code, you agree to the terms and conditions outlined in the MIT License.

### Full License Text

For the full license text, see the [LICENSE](LICENSE) file in the root of this repository.

---

If you have questions about licensing, please feel free to open an issue or contact the maintainers.

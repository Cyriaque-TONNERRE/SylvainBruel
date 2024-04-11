import { REST } from 'discord.js';
import { Routes } from 'discord-api-types/v10';
import { promises as fsPromises } from 'node:fs';

const configPath = './config.json';
const config = await fsPromises.readFile(configPath, 'utf-8').then(JSON.parse);

const commands = [];
const commandFiles = await fsPromises.readdir('./commands');
for (const file of commandFiles) {
    const { data } = await import(`./commands/${file}`);
    commands.push(data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(config.token);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(
            Routes.applicationCommands(config.clientId),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();

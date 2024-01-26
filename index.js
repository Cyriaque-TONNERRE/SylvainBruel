import { promises as fsPromises } from 'node:fs';
import path from 'node:path';
import { Client, Collection, Events } from 'discord.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { EventEmitter } from 'events';

const configPath = './config.json';
const config = await fsPromises.readFile(configPath, 'utf-8').then(JSON.parse);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = new Client({ intents: 265216, autoReconnect: true });

const emitter = new EventEmitter();
emitter.setMaxListeners(15);

//----------------Partie-Commandes----------------//
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = await fsPromises.readdir(commandsPath);

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = await import(filePath);
    client.commands.set(command.data.name, command);
}


client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand() && !interaction.isUserContextMenuCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        interaction.reply({
            content: 'Il y a eu une erreur durant l\'exécution de la commande !',
            ephemeral: true
        });
    }
});

client.login(config.token).then( () => {
    console.log('Le bot est lancé');
});

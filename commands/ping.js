import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Renvoie la latence du bot.');

export async function execute(interaction) {
    await interaction.reply({
        content: `🏓 La latence est de ${Date.now() - interaction.createdTimestamp}ms.`,
        ephemeral: true
    });
}

import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('help')
    .setDescription('Explique le fonctionnement du bot.');

export async function execute(interaction) {
    const embed_explication = new EmbedBuilder()
        .setColor('#cc532e')
        .setTitle('Voici comment ça fonctionne !')
        .setDescription(`Il suffit de taper /r ou /roll et ensuite d'ajouter tes arguments (expliqué juste en dessous)\n`)
        .setImage('http://cyriaque.tonnerre.free.fr/explication.png');

    interaction.reply({
        embeds: [embed_explication],
        ephemeral: true
    });
}

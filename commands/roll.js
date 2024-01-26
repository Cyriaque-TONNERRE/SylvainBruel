import { SlashCommandBuilder } from 'discord.js';
import random from 'random';

export const data = new SlashCommandBuilder()
    .setName('roll')
    .setDescription('Permet de lancer des dés.')
    .addStringOption(option =>
        option.setName('arguments')
            .setDescription(`Les arguments pour le lancé de dés, si besoin d'aide, /help`)
            .setMaxLength(10)
            .setRequired(true));

export async function execute(interaction) {
    const arg = interaction.options.getString('arguments');
    const re = new RegExp('[0-9]+[dD][0-9]+');

    if (!arg.match(re)) {
        interaction.reply({
            content: "Mauvais arguments, si besoin d'aide, /help",
            ephemeral: true
        })
        return;
    }

    const arg_split = arg.split(/[dD]/);
    const nb_dice = parseInt(arg_split[0]);
    const max_val = parseInt(arg_split[1]);

    if (nb_dice < 1) {
        interaction.reply({
            content: "Tu ne peux lancer aucun dé.",
            ephemeral: true
        })
        return;
    }

    if (max_val < 2) {
        interaction.reply({
            content: "La valeur max de tes dés ne peux être inférieur à 2.",
            ephemeral: true
        })
        return;
    }

    let dice_tab = [];
    for (let i = 0; i < nb_dice; i++) {
        dice_tab.push(random.int(1, max_val));
    }

    let somme = 0;
    for (let nb of dice_tab) {
        somme += nb;
    }
    if (dice_tab.length > 1) {
        dice_tab = dice_tab.sort((a, b) => b - a);
    }

    let text = `Requête de ${interaction.member.displayName}: \`[${arg.toString()}]\` Roll: \`[${dice_tab}]\` Résultat: \`${somme}\``

    if (text.length > 1800) {
        text = `Requête de ${interaction.member.displayName}: \`[${arg.toString()}]\` Roll: \`[Message trop long]\` Résultat: \`${somme}\``
    }

    await interaction.reply({
        content: text
    });
}

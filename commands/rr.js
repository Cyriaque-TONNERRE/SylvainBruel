import { SlashCommandBuilder } from 'discord.js';
import random from 'random';
import {roll_dice} from "../fonction/roll_dice.js";

export const data = new SlashCommandBuilder()
    .setName('rr')
    .setDescription('Permet de lancer des dés et d\' avoir les résultats non triés.')
    .addStringOption(option =>
        option.setName('arguments')
            .setDescription(`Les arguments pour le lancé de dés, si besoin d'aide, /help`)
            .setMaxLength(12)
            .setRequired(true));

export async function execute(interaction) {
    roll_dice(interaction, true);
}

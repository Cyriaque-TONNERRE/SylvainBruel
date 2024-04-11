import { SlashCommandBuilder } from 'discord.js';
import random from 'random';
import {roll_dice} from "../fonction/roll_dice.js";

export const data = new SlashCommandBuilder()
    .setName('roll')
    .setDescription('Permet de lancer des dés.')
    .addStringOption(option =>
        option.setName('arguments')
            .setDescription(`Les arguments pour le lancé de dés, si besoin d'aide, /help`)
            .setMaxLength(12)
            .setRequired(true));

export async function execute(interaction) {
    roll_dice(interaction, false);
}

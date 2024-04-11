import random from 'random';

let roll_dice = (interaction, is_random) => {
    const argument = interaction.options.getString('arguments');
    const globalReg = new RegExp('^[0-9]+[dD][0-9]+([+-][0-9]+)?$');
    const mainReg = new RegExp('[0-9]+[dD][0-9]+');

    if (!argument.match(globalReg)) {
        interaction.reply({
            content: "Mauvais arguments, si besoin d'aide, /help",
            ephemeral: true
        })
        return;
    }

    // On recupère les matchs de la regex

    const mainMatch = argument.match(mainReg);

    // On recupère le premier match

    const mainArgument = mainMatch[0];
    const arg_split = mainArgument.split(/[dD]/);
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

    // On recupère le reste de l'argument

    const rest = argument.replace(mainArgument, '');
    let is_to_add = false;
    let number_to_add = 0;
    if (rest !== '') {
        is_to_add = true;
        number_to_add = parseInt(rest);
    }

    // On lance les dés

    let dice_tab = [];
    for (let i = 0; i < nb_dice; i++) {
        let val = random.int(1, max_val);
        if (is_to_add) {
            val += number_to_add;
        }
        dice_tab.push(val);
    }

    // On fait la somme des dés

    let somme = 0;
    for (let nb of dice_tab) {
        somme += nb;
    }

    // On trie les dés si il y en a plus d'un
    if (!is_random) {
        if (dice_tab.length > 1) {
            dice_tab = dice_tab.sort((a, b) => b - a);
        }
    }

    let text = `Requête de ${interaction.member.displayName}: \`[${argument.toString()}]\` Roll: \`[${dice_tab}]\` Résultat: \`${somme}\``

    if (text.length > 1800) {
        text = `Requête de ${interaction.member.displayName}: \`[${argument.toString()}]\` Roll: \`[Message trop long]\` Résultat: \`${somme}\``
    }

    interaction.reply({
        content: text
    });
}

export { roll_dice }
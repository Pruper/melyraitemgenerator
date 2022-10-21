/*

Made by Pruper
For the Melyra Project

*/


let input = {
    itemId: "iron_ingot",
    dye: null,
    name: "Placeholder Item",
    description: "This item is cool.\nTwo lines!",
    rarity: 4,
    type: 0,
    canBeUpgraded: true,
    stat_health: 0,
    stat_defense: 0,
    stat_damage: 0,
    stat_critical: 0,
    stat_mana: 0,
    stat_speed: 0,
    stat_arcane: 0
}

const rarities = [
    { name: "Common", color: "white" },
    { name: "Uncommon", color: "green" },
    { name: "Rare", color: "blue" },
    { name: "Epic", color: "light_purple" },
    { name: "Legendary", color: "aqua" }
]

const attributeUuids = {
    MAINHAND: { id: "[I;12,42069,0,10]", slot: "mainhand" },
    OFFHAND: { id: "[I;12,42069,0,11]", slot: "offhand" },
    HEAD: { id: "[I;12,42069,0,12]", slot: "head" },
    CHEST: { id: "[I;12,42069,0,13]", slot: "chest" },
    LEGS: { id: "[I;12,42069,0,14]", slot: "legs" },
    FEET: { id: "[I;12,42069,0,15]", slot: "feet" }
}

const types = [
    { name: "", attributeUuid: attributeUuids.MAINHAND }, // Normal item
    { name: "Sword", attributeUuid: attributeUuids.MAINHAND},
    { name: "Bow", attributeUuid: attributeUuids.MAINHAND },
    { name: "Helmet", attributeUuid: attributeUuids.HEAD },
    { name: "Chestplate", attributeUuid: attributeUuids.CHEST },
    { name: "Leggings", attributeUuid: attributeUuids.LEGS },
    { name: "Boots", attributeUuid: attributeUuids.FEET }
]

function generateOutput() {
    let output = `/give @p ${input.itemId}{`;

    // Item Name
    output += `display:{Name:'{"text":"${input.name}","color":"${rarities[input.rarity].color}","italic":false}'`;

    // Lore
    output += `,Lore:['PlaceholderLore'` // PlaceholderLore tag gets removed, only here for leading comma support.

    // Item description
    if (input.description != "") {
        input.description = input.description.replaceAll("'", "\\'").replaceAll("\"", "\\\"");
        output += `,'{"text":"${input.description}","color":"dark_gray"}'`.replaceAll("\\n", `","color":"dark_gray"}','{"text":"`);
    }

    // Stats
    let statnbt = `{Placeholder:1b` // Placeholder tag gets removed, only here for leading comma support.

    // Stat Group 1
    if (input.stat_health != 0 || input.stat_defense != 0) {
        output += `,'{"text":""}'`;
        if (input.stat_health != 0) {
            output += `,'[{"text":"❤ ","color":"red","italic":false},{"text":"Health: ","color":"gray"},{"text":"${getSign(input.stat_health)}","color":"green"}]'`;
            statnbt += `,MaxHealth:${input.stat_health}`;
        }

        if (input.stat_defense != 0) {
            output += `,'[{"text":"❂ ","color":"green","italic":false},{"text":"Defense: ","color":"gray"},{"text":"${getSign(input.stat_defense)}","color":"green"}]'`;
            statnbt += `,Defense:${input.stat_defense}`;
        }
    }

    // Stat Group 2
    if (input.stat_damage != 0 || input.stat_critical != 0 || input.stat_mana != 0) {
        output += `,'{"text":""}'`;
        if (input.stat_damage != 0) {
            output += `,'[{"text":"❁ ","color":"red","italic":false},{"text":"Damage: ","color":"gray"},{"text":"${getSign(input.stat_damage)}","color":"red"}]'`;
            statnbt += `,Damage:${input.stat_damage}`;
        }

        if (input.stat_critical != 0) {
            output += `,'[{"text":"☣ ","color":"red","italic":false},{"text":"Critical: ","color":"gray"},{"text":"${getSign(input.stat_critical)}%","color":"red"}]'`;
            statnbt += `,Critical:${input.stat_critical}`;
        }

        if (input.stat_mana != 0) {
            output += `,'[{"text":"₪ ","color":"aqua","italic":false},{"text":"Mana: ","color":"gray"},{"text":"${getSign(input.stat_mana)}","color":"red"}]'`;
            statnbt += `,Mana:${input.stat_mana}`;
        }
    }

    // Stat Group 3
    if (input.stat_speed != 0 || input.stat_arcane != 0) {
        output += `,'{"text":""}'`;
        if (input.stat_speed != 0) {
            output += `,'[{"text":"✦ ","color":"white","italic":false},{"text":"Speed: ","color":"gray"},{"text":"${getSign(input.stat_speed)}%","color":"white"}]'`;
            statnbt += `,Speed:${input.stat_speed}`;
        }

        if (input.stat_arcane != 0) {
            output += `,'[{"text":"¤ ","color":"light_purple","italic":false},{"text":"Arcane: ","color":"gray"},{"text":"${getSign(input.stat_arcane)}","color":"white"}]'`;
            statnbt += `,Arcane:${input.stat_arcane}`;
        }
    }

    statnbt = statnbt.replace("Placeholder:1b,", "").replace("Placeholder:1b", "") + `}`;

    // Line before rarity
    output += `,'{"text":""}'`;

    // Can be upgraded?
    if (input.canBeUpgraded === true) {
        output += `,'{"text":"This item can be upgraded","color":"dark_gray","italic":false}'`;
    }

    // Rarity text
    output += `,'{"text":"${rarities[input.rarity].name.toUpperCase()} ${types[input.type].name.toUpperCase()}","color":"${rarities[input.rarity].color}","bold":true,"italic":false}'`;

    // Finish lore
    output += `]`;
    output = output.replace("'PlaceholderLore',", "").replace("'PlaceholderLore'", "");

    // Remaining tags
    output += `},HideFlags:7,Unbreakable:1b`;
    if (statnbt != "{}") {
        output += `,Stats:${statnbt},BaseStats:${statnbt}`;
    }
    output += `${input.canBeUpgraded === true ? ",Level:0" : ""},AttributeModifiers:[{AttributeName:"generic.luck",Name:"generic.luck",Amount:-0.000999999999,Operation:0,UUID:${types[input.type].attributeUuid.id},Slot:"${types[input.type].attributeUuid.slot}"}]}`;

    return output;
}

function generateCommand() {
    let currentValue;

    currentValue = document.getElementById("input_itemId").value;
    input.itemId = currentValue != "" ? currentValue : "diamond_sword";

    currentValue = document.getElementById("input_name").value;
    input.name = currentValue != "" ? currentValue : "Gigachad Sword";

    currentValue = document.getElementById("input_description").value;
    input.description = currentValue != "" ? currentValue : "";

    currentValue = document.getElementById("input_rarity").value;
    input.rarity = !isNaN(parseFloat(currentValue)) ? parseFloat(currentValue) : 0;

    currentValue = document.getElementById("input_type").value;
    input.type = !isNaN(parseFloat(currentValue)) ? parseFloat(currentValue) : 0;

    currentValue = document.getElementById("input_canBeUpgraded").checked;
    input.canBeUpgraded = typeof currentValue != 'undefined' ? currentValue : false;

    currentValue = document.getElementById("input_stat_health").value;
    input.stat_health = !isNaN(parseFloat(currentValue)) ? parseFloat(currentValue) : 0;

    currentValue = document.getElementById("input_stat_defense").value;
    input.stat_defense = !isNaN(parseFloat(currentValue)) ? parseFloat(currentValue) : 0;

    currentValue = document.getElementById("input_stat_damage").value;
    input.stat_damage = !isNaN(parseFloat(currentValue)) ? parseFloat(currentValue) : 0;

    currentValue = document.getElementById("input_stat_critical").value;
    input.stat_critical = !isNaN(parseFloat(currentValue)) ? parseFloat(currentValue) : 0;

    currentValue = document.getElementById("input_stat_mana").value;
    input.stat_mana = !isNaN(parseFloat(currentValue)) ? parseFloat(currentValue) : 0;

    currentValue = document.getElementById("input_stat_speed").value;
    input.stat_speed = !isNaN(parseFloat(currentValue)) ? parseFloat(currentValue) : 0;

    currentValue = document.getElementById("input_stat_arcane").value;
    input.stat_arcane = !isNaN(parseFloat(currentValue)) ? parseFloat(currentValue) : 0;

    document.getElementById("output").value = generateOutput();
}

function getSign(number) {
    if (number >= 0) {
        return "+" + number;
    }
    return number;
}
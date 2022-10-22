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
    stat_strength: 0,
    stat_damage: 0,
    stat_critical: 0,
    stat_mana: 0,
    stat_speed: 0,
    stat_arcane: 0
}

const colorCodes = {
    dark_red: "AA0000",
    red: "FF5555",
    gold: "FFAA00",
    yellow: "FFFF55",
    dark_green: "00AA00",
    green: "55FF55",
    aqua: "55FFFF",
    dark_aqua: "00AAAA",
    dark_blue: "0000AA",
    blue: "5555FF",
    light_purple: "FF55FF",
    dark_purple: "AA00AA",
    white: "FFFFFF",
    gray: "AAAAAA",
    dark_gray: "555555",
    black: "000000",
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
    { name: "Sword", attributeUuid: attributeUuids.MAINHAND },
    { name: "Bow", attributeUuid: attributeUuids.MAINHAND },
    { name: "Helmet", attributeUuid: attributeUuids.HEAD },
    { name: "Chestplate", attributeUuid: attributeUuids.CHEST },
    { name: "Leggings", attributeUuid: attributeUuids.LEGS },
    { name: "Boots", attributeUuid: attributeUuids.FEET }
]

function generateOutput() {
    let output = `/give @p ${input.itemId}{`;

    // Item Name
    input.name = input.name.replaceAll("'", "\\'").replaceAll("\"", "\\" + "\\\"");
    output += `display:{Name:'{"text":"${input.name}","color":"${rarities[input.rarity].color}","italic":false}'`;

    // Lore
    output += `,Lore:['PlaceholderLore'` // PlaceholderLore tag gets removed, only here for leading comma support.

    // Item description
    let descriptionnbt = ""
    if (input.description != "") {
        input.description = input.description.replaceAll("'", "\\'").replaceAll("\"", "\\" + "\\\"");
        output += `,'{"text":"${input.description}","color":"dark_gray"}'`.replaceAll("\\n", `","color":"dark_gray"}','{"text":"`);
        descriptionnbt += `['{"text":"${input.description}","color":"dark_gray"}'`.replaceAll("\\n", `","color":"dark_gray"}','{"text":"`) + `]`;
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
    if (input.stat_strength != 0 || input.stat_damage != 0 || input.stat_critical != 0 || input.stat_mana != 0) {
        output += `,'{"text":""}'`;
        if (input.stat_strength != 0) {
            output += `,'[{"text":"❁ ","color":"red","italic":false},{"text":"Strength: ","color":"gray"},{"text":"${getSign(input.stat_strength)}","color":"red"}]'`;
            statnbt += `,Strength:${input.stat_strength}`;
        }

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

    // Lore generator tags
    output += `}`
    if (descriptionnbt != "") {
        output += `,Description:${descriptionnbt}`;
    }

    let outputnamenbttag = input.name.replaceAll("\\'", "'").replaceAll("\\\"", "\"")
    output += `,Name:"${outputnamenbttag}",Type:"${types[input.type].name.toUpperCase()}",Rarity:"${rarities[input.rarity].name.toUpperCase()}",RarityColor:'{"text":"","color":"${rarities[input.rarity].color}"}',LevelColor:'{"text":"","color":"${"#" + darkenColor(rarities[input.rarity].color, -85)}"}'`

    // Remaining tags (stats, hideflags, attributes...)
    output += `,HideFlags:7,Unbreakable:1b`;
    if (statnbt != "{}") {
        output += `,Stats:${statnbt},BaseStats:${statnbt}`;
    }
    output += `${input.canBeUpgraded === true ? ",Level:0" : ""},AttributeModifiers:[{AttributeName:"generic.luck",Name:"generic.luck",Amount:-0.000999999999,Operation:0,UUID:${types[input.type].attributeUuid.id},Slot:"${types[input.type].attributeUuid.slot}"}]}`;

    return output;
}

function loadInputs() {
    let currentValue;

    currentValue = document.getElementById("input_itemId").value;
    input.itemId = currentValue != "" ? currentValue : "diamond_sword";

    currentValue = document.getElementById("input_name").value;
    input.name = currentValue != "" ? currentValue : "Unnamed";

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

    currentValue = document.getElementById("input_stat_strength").value;
    input.stat_strength = !isNaN(parseFloat(currentValue)) ? parseFloat(currentValue) : 0;

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
}

function generateCommand() {
    loadInputs();

    document.getElementById("output").value = generateOutput();
}

function generatePreview() {
    loadInputs();

    let element = document.getElementById("outputPreview");

    let name = JSON.parse(getStringBetweenTwoStrings(generateOutput(), "Name:", ",Lore").replaceAll("'{", "{").replaceAll("}'", "}").replaceAll("'[", "[").replaceAll("]'", "]").replaceAll("\\" + "\\\"", "\\" + "\"").replaceAll("\\\'", "'"));

    let loreList = getStringBetweenTwoStrings(generateOutput(), "Lore:", "},Name").replaceAll("'{", "{").replaceAll("}'", "}").replaceAll("'[", "[").replaceAll("]'", "]").replaceAll("\\" + "\\" + "\\" + "\\" + "\\\"", "\"").replaceAll("\\" + "\\" + "\\\'", "'");

    if (loreList.length < 1) {
        loreList = getStringBetweenTwoStrings(generateOutput(), "Lore:", "},Description").replaceAll("'{", "{").replaceAll("}'", "}").replaceAll("'[", "[").replaceAll("]'", "]").replaceAll("\\" + "\\" + "\\" + "\\" + "\\\"", "\"").replaceAll("\\" + "\\" + "\\\'", "'");
    }

    console.log(loreList);

    loreList = JSON.parse(loreList);
    loreList.unshift(name);

    let html = "";
    for (i in loreList) {
        html += generateColorTextFromJson(loreList[i]);
        if (i != loreList.length - 1) {
            html += "<br>"
        }
    }

    element.innerHTML = `<p>${html}</p>`;
}

function generateColorTextFromJson(json) {
    if (!Array.isArray(json)) {
        json = [json];
    }

    let htmlLine = "";
    let inheritedProperties = {
        italic: json[0].italic,
        bold: json[0].bold,
        underlined: json[0].underlined,
        strikethrough: json[0].strikethrough,
        obfuscated: json[0].obfuscated
    }
    let inheritance = Object.keys(inheritedProperties)

    for (i in json) {
        for (j in inheritance) {
            if (typeof json[i][inheritance[j]] === 'undefined') {
                json[i][inheritance[j]] = inheritedProperties[inheritance[j]]
            }
        }

        let html = `<span style="`;

        if (typeof json[i].color != 'undefined') {
            html += `color: #${getColor(json[i].color)};`
        } else {
            html += `color: #FFFFFF;`
        }

        // Italic by default
        if (typeof json[i].italic === 'undefined') {
            html += `font-style: italic;`
        } else {
            if (json[i].italic == true) {
                html += `font-style: italic;`
            }
        }

        if (typeof json[i].bold != 'undefined') {
            if (json[i].bold == true) {
                html += `font-weight: bold;`
            }
        }

        if (typeof json[i].underlined != 'undefined' || typeof json[i].strikethrough != 'undefined') {
            html += `text-decoration:${typeof json[i].underlined != 'undefined' ? (json[i].underlined == true ? " underline" : "") : ""}${typeof json[i].strikethrough != 'undefined' ? (json[i].strikethrough == true ? " line-through" : "") : ""};`
        }

        if (typeof json[i].obfuscated != 'undefined') {
            if (json[i].obfuscated == true) {
                json[i].text = json[i].text.replace(/\S/g, "#");
            }
        }

        html += `">${json[i].text}</span>`;

        htmlLine += html;
    }

    return htmlLine;
}

function getSign(number) {
    if (number >= 0) {
        return "+" + number;
    }
    return number;
}

function getColor(color) {
    if (typeof colorCodes[color] != 'undefined') {
        color = colorCodes[color];
    }

    return color;
}

function darkenColor(color, amount) {
    if (typeof colorCodes[color] != 'undefined') {
        color = colorCodes[color];
    }

    var number = parseInt(color, 16);
    var r = (number >> 16) + amount;
    var b = ((number >> 8) & 0x00FF) + amount;
    var g = (number & 0x0000FF) + amount;
    var newColor = g | (b << 8) | (r << 16);
    return newColor.toString(16);
}

function getStringBetweenTwoStrings(text, prefix, suffix) {
    let string = text;
    let i = string.indexOf(prefix);
    if (i >= 0) {
        string = string.substring(i + prefix.length);
    }
    else {
        return '';
    }
    if (suffix) {
        i = string.indexOf(suffix);
        if (i >= 0) {
            string = string.substring(0, i);
        }
        else {
            return '';
        }
    }
    return string;
};


document.getElementById("inputs").addEventListener("change", generatePreview)
generatePreview();
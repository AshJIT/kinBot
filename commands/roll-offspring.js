const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require("axios");
const helper = require("../helpers/helpers");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll-offspring')
		.setDescription('Roll for offspring amounts for a breeding')
        .addBooleanOption(option => 
            option.setName('rp')
                .setDescription('Do you need an RP roll?')
                .setRequired(false)
        )
        .addBooleanOption(option => 
            option.setName('blessing')
                .setDescription('Do you need a blessing roll?')
                .setRequired(false)
        )
        .addBooleanOption(option => 
            option.setName('token')
                .setDescription('Do you need an extra token roll?')
                .setRequired(false)
        ),

	async execute(interaction) {
		const rp = interaction.options.getBoolean('rp');
        const blessing = interaction.options.getBoolean('blessing');
        const token = interaction.options.getBoolean('token');

        let breeding = {};

        breeding.kids = helper.randomize(2, 3);
        breeding.bucks = 0;
        breeding.does = 0;

        if (breeding.kids > 2) {
            if (helper.randomize(1, 10) === 10) {
                breeding.twins = true;
            }
        }

        if (blessing) {
            breeding.kids++;
        }

        if (rp) {
            breeding.kids++;
            breeding.rp = true;
        }

        if (token) {
            breeding.kids++;
        }

        if (breeding.kids > 6) {
            breeding.kids = 6;
        }

        for (let i = 0; i < (breeding.rp ? breeding.kids - 1 : breeding.kids); i++) {
            helper.randomize(1, 2) === 1 ? breeding.bucks++ : breeding.does++;
        }

        breeding.twins ? breeding.kids++ : "";

        let sentence = "You put kin in a can and shook it up ";

        if (token || rp || blessing) {
            sentence += "with ";

            if (token) {
                sentence += "an extra baby token, ";
            }

            if (blessing) {
                sentence+= "a blessing, ";
            }

            if (rp) {
                sentence += "rp ";
            }
        }

        sentence += "they fell out with " + breeding.kids + " offspring: " + breeding.bucks + " bucks, " + breeding.does + " does";

        if (breeding.twins) {
            sentence += " and a twin!";
        } else {
            sentence += "!";
        }

        if (breeding.rp) {
            sentence += "\n\n Don't forget +1 (with gender) for RP!";
        }

        await interaction.reply(sentence);
	},
};

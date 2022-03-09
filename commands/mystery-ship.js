const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require("axios");
const helper = require("../helpers/helpers");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ship-random")
		.setDescription("Grabs two kin to make mystery magic!"),

	async execute(interaction) {
		try {
            const maleKin = axios.get(`${helper.getOlApiString()}kin/male/1`);
            const femaleKin = axios.get(`${helper.getOlApiString()}kin/female/1`);
    
            const [resMale, resFemale] = await Promise.all([maleKin, femaleKin]);

			if (resMale.status === 200 && resFemale.status === 200) {
				await interaction.reply("**Shipping:** " + resMale.data.name + " & " + resFemale.data.name + " (" + helper.getOlUri() + "kin/view/" + resMale.data.slug + ") & (" + helper.getOlUri() + "kin/view/" + resFemale.data.slug + ")\n" +
                resMale.data.current_image_url + "\n" +
                resFemale.data.current_image_url);
			} else {
				await interaction.reply("Something exploded. Please find cover!");
			}
		} catch (e) {
			console.log(e);
			await interaction.reply("Something exploded. Whoops.");
		}
	},
};

const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require("axios");
const helper = require("../helpers/helpers");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kin-slug')
		.setDescription('Showcases desired kin with url suffix on ol page')
		.addStringOption(option => 
			option.setName('name')
				.setDescription('Enter the kin slug')
				.setRequired(true)
		),

	async execute(interaction) {
		const name = interaction.options.getString('name');

		try {
			const res = await axios.get(`${helper.getOlApiString()}kin/slug/${name}`)

			if (res.status === 200) {
				await interaction.reply("Are you looking for " + res.data.name + "?\n" + 
                "(" + helper.getOlUri() + "kin/view/" + res.data.slug + ")\n" +
                res.data.current_image_url);
			} else {
				await interaction.reply(`I couldn't find the kin ${name}, would you like to try again?`);
			}
		} catch (e) {
			console.log(e);
			await interaction.reply(`I couldn't find the kin ${name}, would you like to try again?`);
		}
	},
};

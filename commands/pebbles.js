const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require("axios");
const helper = require("../helpers/helpers");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pebbles')
		.setDescription('Check your pebble amount on the forums')
		.addStringOption(option => 
			option.setName('user')
				.setDescription('Enter your username')
				.setRequired(true)
		),

	async execute(interaction) {
		const user = interaction.options.getString('user');

		try {
			const res = await axios.get(`${helper.getForumApiString()}member/${user}`)

			if (res.status === 200) {
				await interaction.reply(res.data.member_name + " has " + res.data.money + " pebbles.");
			} else {
				await interaction.reply("Something exploded! Try again?");
			}
		} catch (e) {
			console.log(e);
			await interaction.reply("Something exploded! Try again?");
		}
	},
};

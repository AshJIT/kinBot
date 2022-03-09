const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require("axios");
const helper = require("../../helpers/helpers");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('grant-multi-pebbles')
		.setDescription('Give x number of pebbles to multiple users')
		.setDefaultPermission(false)
		.addStringOption(option => 
			option.setName('users')
				.setDescription('Users receiving the pebbles')
				.setRequired(true)
		)
        .addIntegerOption(option => 
			option.setName('pebbles')
				.setDescription('Amount of pebbles to grant')
				.setRequired(true)
		)
        .addStringOption(option => 
			option.setName('reason')
				.setDescription('Why are they receiving pebbles?')
				.setRequired(true)
		),

	async execute(interaction) {
		const users = interaction.options.getString('users').split(",").map(argument => argument.trim());
        const pebbles = interaction.options.getInteger('pebbles');
        const reason = interaction.options.getString('reason');

		try {
			const res = await axios.get(`${helper.getForumApiString()}member/${users}/increaseMulti/${pebbles}`)

			if (res.status === 200) {
				await interaction.reply(users.join(", ") + " were granted " + pebbles + " pebbles for: " + reason);
			} else {
				await interaction.reply("Something went wrong. Check your spelling.");
			}
		} catch (e) {
			console.log(e);
			await interaction.reply("Something went wrong. Check your spelling.");
		}
	},
};

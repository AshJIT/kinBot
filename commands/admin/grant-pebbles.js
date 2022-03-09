const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require("axios");
const helper = require("../../helpers/helpers");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('grant-pebbles')
		.setDescription('Give x number of pebbles to user')
		.setDefaultPermission(false)
		.addStringOption(option => 
			option.setName('user')
				.setDescription('User receiving the pebbles')
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
		const user = interaction.options.getString('user');
        const pebbles = interaction.options.getInteger('pebbles');
        const reason = interaction.options.getString('reason');

		try {
			const res = await axios.get(`${helper.getForumApiString()}member/${user}/increase/${pebbles}`)

			if (res.status === 200) {
				await interaction.reply(`${pebbles} pebbles have been added to ${user}'s account: ${reason}`);
			} else {
				await interaction.reply("Something went wrong. Check your spelling.");
			}
		} catch (e) {
			console.log(e);
			await interaction.reply("Something went wrong. Check your spelling.");
		}
	},
};

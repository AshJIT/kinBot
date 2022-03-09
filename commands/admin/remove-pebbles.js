const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require("axios");
const helper = require("../../helpers/helpers");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("remove-pebbles")
		.setDescription("Remove pebbles from someone's account")
		.setDefaultPermission(false)
		.addStringOption(option => 
			option.setName("user")
				.setDescription("User losing the pebbles")
				.setRequired(true)
		)
        .addIntegerOption(option => 
			option.setName("pebbles")
				.setDescription("Amount of pebbles to remove")
				.setRequired(true)
		)
        .addStringOption(option => 
			option.setName("reason")
				.setDescription("Why are the pebbles being removed?")
				.setRequired(true)
		),

	async execute(interaction) {
		const user = interaction.options.getString('user');
        const pebbles = interaction.options.getInteger('pebbles');
        const reason = interaction.options.getString('reason');

		try {
			const res = await axios.get(`${helper.getForumApiString()}member/${user}/decrease/${pebbles}`)

			if (res.status === 200) {
				await interaction.reply(`${pebbles} pebbles have been removed from ${user}'s account: ${reason}`);
			} else {
				await interaction.reply("Something went wrong. Check your spelling.");
			}
		} catch (e) {
			console.log(e);
			await interaction.reply("Something went wrong. Check your spelling.");
		}
	},
};

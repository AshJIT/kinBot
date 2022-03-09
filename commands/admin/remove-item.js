const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require("axios");
const helper = require("../../helpers/helpers");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove-item')
		.setDescription('Removes (item) from (user) for (reason)')
		.setDefaultPermission(false)
		.addStringOption(option => 
			option.setName('item')
				.setDescription('Enter the item name')
				.setRequired(true)
		)
		.addStringOption(option => 
			option.setName('user')
				.setDescription('Enter the user that will lose the item')
				.setRequired(true)
		)
		.addStringOption(option => 
			option.setName('reason')
				.setDescription('Why is this item being removed?')
				.setRequired(true)
		),

	async execute(interaction) {
		const item = interaction.options.getString('item');
		const user = interaction.options.getString('user');
		const reason = interaction.options.getString('reason');

		try {
			const res = await axios.get(`${helper.getForumApiString()}member/${user}/takeItem/${item}`);

			if (res.status === 200) {
				await interaction.reply(`**${item}** taken from **${user}** for: ${reason}`);
			} else {
				await interaction.reply('Something went wrong. Are you sure you typed everything correctly?');
			}
		} catch (e) {
			console.log(e);
			await interaction.reply('Did that user or item exist?');
		}
	},
};

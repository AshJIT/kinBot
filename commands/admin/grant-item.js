const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require("axios");
const helper = require("../../helpers/helpers");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('grant-item')
		.setDescription('Grants (item) to (user)')
		.setDefaultPermission(false)
		.addStringOption(option => 
			option.setName('item')
				.setDescription('Enter the item name')
				.setRequired(true)
		)
		.addStringOption(option => 
			option.setName('user')
				.setDescription('Enter the user name that will receive the item')
				.setRequired(true)
		)
		.addStringOption(option => 
			option.setName('reason')
				.setDescription('Why is the user receiving the item?')
				.setRequired(true)
		),

	async execute(interaction) {
		const item = interaction.options.getString('item');
		const user = interaction.options.getString('user');
		const reason = interaction.options.getString('reason');

		try {
			const res = await axios.post(`${helper.getForumApiString()}member/giveItem`, {
				item: item,
				username: user,
			});

			if (res.status === 200) {
				await interaction.reply(`**${item}** given to **${user}** for: ${reason}`);
			} else {
				await interaction.reply('Something went wrong. Are you sure you typed everything correctly?');
			}
		} catch (e) {
			console.log(e);
			await interaction.reply('Did that user or item exist?');
		}
	},
};

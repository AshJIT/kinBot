const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require("axios");
const helper = require("../helpers/helpers");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("user")
		.setDescription("Showcases a list of user's kin")
		.addStringOption(option => 
			option.setName("name")
				.setDescription("Enter the user's account name")
				.setRequired(true)
		),

	async execute(interaction) {
		const name = interaction.options.getString('name');

		try {
			const res = await axios.get(`${helper.getOlApiString()}gaian/name/${name}`)

			if (res.status === 200) {
                // if (res.data.is_colourist) {
                //     await interaction.reply(
                //         res.data.name +
                //         " has " +
                //         res.data.kin_count +
                //         " kin and has coloured " +
                //         res.data.coloured_kin_count +
                //         "(Except this is probably wrong because Dova messed it up)! \nCheck out their kindex profile here: " + helper.getOlUri() + "owner/" +
                //         res.data.slug +
                //         "\nOr the kin they've colored here: " + helper.getOlUri() + "colorist/" +
                //         res.data.slug
                //     );
                // } else {
                    await interaction.reply(
                        res.data.name +
                        " has " +
                        res.data.kins.length +
                        " kin on the kindex!\nCheck out their kindex profile here: " + helper.getOlUri() + "owner/" +
                        res.data.slug
                    );
                // }
			} else {
				await interaction.reply(`I couldn't find the user ${name}, would you like to try again?`);
			}
		} catch (e) {
			console.log(e);
			await interaction.reply(`I couldn't find the user ${name}, would you like to try again?`);
		}
	},
};

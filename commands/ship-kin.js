const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require("axios");
const helper = require("../helpers/helpers");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ship-kin')
		.setDescription('Showcases kin back to back')
		.addStringOption(option => 
			option.setName('kin1')
				.setDescription('Enter the first kin')
				.setRequired(true)
		)
        .addStringOption(option => 
			option.setName('kin2')
				.setDescription('Enter the second kin')
				.setRequired(true)
		),

	async execute(interaction) {
		const couple = [ interaction.options.getString('kin1'), interaction.options.getString('kin2')];

        const fetchKin = url => axios.get(url);

        const kinGetUrls = couple.map(kin => {
            let currentKin = helper.escapeHtml(kin).trim();

            return `${helper.getOlApiString()}kin/name/${currentKin}`;
        });

        const promiseArray = kinGetUrls.map(fetchKin);

        try {
            const [res1, res2] = await Promise.all(promiseArray);

            if (res1.status === 200 && res2.status === 200) {
				await interaction.reply("**Shipping:** " + res1.data.name + " & "  + res2.data.name + " (" + helper.getOlUri() + "kin/view/" + res1.data.slug + ") & (" + helper.getOlUri() + "kin/view/" + res2.data.slug + ")\n" +
                res1.data.current_image_url + "\n" +
                res2.data.current_image_url);
			} else {
				await interaction.reply("I couldn't find those kin would you like to try again?");
			}

        } catch (e) {
            console.log(e);
			await interaction.reply("I couldn't find those kin would you like to try again?");
        }
	},
};

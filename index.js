const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const adminFiles = fs.readdirSync('./commands/admin').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

for (const adminFile of adminFiles) {
	const adminCommand = require(`./commands/admin/${adminFile}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(adminCommand.data.name, adminCommand);
}

client.once('ready', async () => {
	console.log('A wild KinBot has appeared!');

	const fullPermissions = [
		{
			id: '943880216151982137',
			permissions: [{
				id: '943687025519902771',
				type: 'ROLE',
				permission: true,
			}],
		},
		{
			id: '943880216151982138',
			permissions: [{
				id: '943687025519902771',
				type: 'ROLE',
				permission: true,
			}],
		},
		{
			id: '943880216151982139',
			permissions: [{
				id: '943687025519902771',
				type: 'ROLE',
				permission: true,
			}],
		},
		{
			id: '943880216214904832',
			permissions: [{
				id: '943687025519902771',
				type: 'ROLE',
				permission: true,
			}],
		},
		{
			id: '943880216214904833',
			permissions: [{
				id: '943687025519902771',
				type: 'ROLE',
				permission: true,
			}],
		},
	];

	const res = await client.guilds.cache.get(process.env.GUILD).commands.permissions.set({ fullPermissions });
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ 
			content: 'There was an error while executing this command!', 
			ephemeral: true 
		});
	}
});

client.login(process.env.token);

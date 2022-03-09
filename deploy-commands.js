const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const dotenv = require('dotenv');

dotenv.config();

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const adminCommandFiles = fs.readdirSync("./commands/admin").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

for (const file of adminCommandFiles) {
	const adminCommand = require(`./commands/admin/${file}`);
	commands.push(adminCommand.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

// rest.get(Routes.applicationGuildCommands(process.env.CLIENT, process.env.GUILD))
//     .then(data => {
//         const promises = [];
//         for (const command of data) {
//             const deleteUrl = `${Routes.applicationGuildCommands(process.env.CLIENT, process.env.GUILD)}/${command.id}`;
//             promises.push(rest.delete(deleteUrl));
//         }
//         return Promise.all(promises);
//     });

// console.log(adminCommands);

rest.put(Routes.applicationGuildCommands(process.env.CLIENT, process.env.GUILD), { body: commands })
	.then((res) => console.log(res, 'Successfully registered application commands.'))
	.catch(console.error);
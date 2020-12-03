const Discord = require("discord.js");
const client = new Discord.Client();
const axios = require("axios");

const help = require("./commands/help");
const ship = require("./commands/ship");
const kin = require("./commands/kin");
const user = require("./commands/user");
const staff = require("./commands/staff");

require("dotenv").config();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
  if (msg.author === client.user) {
    return;
  }

  if (msg.content.startsWith("/")) {
    processCommand(msg);
  }
});

function processCommand(receivedMessage) {
  let fullCommand = receivedMessage.content.substr(1); // Remove the leading exclamation mark
  let splitCommand = fullCommand.split(" "); // Split the message up in to pieces for each space
  let primaryCommand = splitCommand[0]; // The first word directly after the exclamation is the command
  let arguments = splitCommand.slice(1); // All other words are arguments/parameters/options for the command
  let argumentsString = arguments.join(" ");

  if (primaryCommand == "kinbothelp") {
    help.getHelp(arguments, receivedMessage);
  } else if (primaryCommand === "kin") {
    kin.getKin(argumentsString, receivedMessage);
  } else if (primaryCommand === "kinslug") {
    kin.getKinBySlug(argumentsString, receivedMessage);
  } else if (primaryCommand === "user") {
    user.getUser(argumentsString, receivedMessage);
  } else if (primaryCommand === "ship") {
    ship.getShip(argumentsString, receivedMessage);
  } else if (primaryCommand === "shiprandom") {
    ship.getMysteryShip(argumentsString, receivedMessage);
  } else if (primaryCommand === "breed") {
    staff.getBreeding(argumentsString, receivedMessage);
  } else if (primaryCommand === "pebbles") {
    staff.getPebbles(argumentsString, receivedMessage);
  } else if (primaryCommand === "givepebbles") {
    staff.givePebbles(argumentsString, receivedMessage);
  } else if (primaryCommand === "takepebbles") {
    staff.takePebbles(argumentsString, receivedMessage);
  } else if (primaryCommand === "giveitem") {
    staff.giveItem(argumentsString, receivedMessage);
  } else if (primaryCommand === "takeitem") {
    staff.takeItem(argumentsString, receivedMessage);
  } else if (primaryCommand === "givepebblesmulti") {
    staff.givePebblesMulti(argumentsString, receivedMessage);
  }
}

client.login(process.env.BOT_TOKEN);

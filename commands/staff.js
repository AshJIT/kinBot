const axios = require("axios");
const helper = require("../helpers/helpers");

module.exports = {
    getBreeding: function (arguments, receivedMessage) {
        let breeding = {};

        breeding.kids = helper.randomize(2, 3);
        breeding.bucks = 0;
        breeding.does = 0;

        if (breeding.kids > 2) {
            if (helper.randomize(1, 10) === 10) {
                breeding.twins = true;
            }
        }

        if (/\bblessing\b/i.test(arguments)) {
            breeding.kids++;
        }

        if (/\brp\b/i.test(arguments)) {
            breeding.kids++;
            breeding.rp = true;
        }

        if (/\btoken\b/i.test(arguments)) {
            breeding.kids++;
        }

        if (breeding.kids > 6) {
            breeding.kids = 6;
        }

        for (let i = 0; i < (breeding.rp ? breeding.kids - 1 : breeding.kids); i++) {
            helper.randomize(1, 2) === 1 ? breeding.bucks++ : breeding.does++;
        }

        breeding.twins ? breeding.kids++ : "";

        receivedMessage.channel.send(
            "You put kin in a can and shook it up, they fell out with **" +
            breeding.kids +
            " offspring:** **" +
            breeding.bucks +
            " bucks**, **" +
            breeding.does +
            " does**" +
            (breeding.twins ? " and **a twin**!" : "!") +
            (breeding.rp ? " \n\nDon't forget **+ 1 (with gender)** for RP!" : "")
        );
    },


    getPebbles: function (member, receivedMessage) {
        axios
            .get(`${helper.getForumApiString()}member/${member}`)
            .then(res => {
                if (Object.entries(res.data).length !== 0) {
                    receivedMessage.channel.send(
                        res.data.member_name + " has " + res.data.money + " pebbles."
                    );
                } else {
                    receivedMessage.channel.send(
                        `Something went wrong, ask Dova to check the logs.`
                    );
                }
            })
            .catch(err => {
                console.log(err);
                receivedMessage.channel.send(
                    `I couldn't find the user ${member}, would you like to try again?`
                );
            });
    },

    givePebbles: function (arguments, receivedMessage) {
        if (receivedMessage.member.roles.some(role => role.name === "Pebble Granting")) {
            arguments = arguments.split(",").map(argument => argument.trim());
            var member = arguments[0];
            var pebbleCount = arguments[1];
            var reason = arguments[2];

            if (!/^\+?(0|[1-9]\d*)$/.test(pebbleCount)) {
                receivedMessage.channel.send(
                    `Pebbles appear to be invalid, please enter a positive number.`
                );
                return;
            }

            if (
                typeof pebbleCount !== "undefined" &&
                typeof reason !== "undefined" &&
                typeof arguments[3] === "undefined"
            ) {
                axios
                    .get(`${helper.getForumApiString()}member/${member}/increase/${pebbleCount}`)
                    .then(res => {
                        if (Object.entries(res.data).length !== 0) {
                            receivedMessage.channel.send(
                                `${pebbleCount} pebbles have been added to ${member}'s account: ${reason}`
                            );
                        } else {
                            receivedMessage.channel.send(
                                `Something went wrong, get Dova to check the logs.`
                            );
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        receivedMessage.channel.send(
                            `I couldn't find the user ${member}, would you like to try again?`
                        );
                    });
            } else {
                receivedMessage.channel.send(
                    "Was that the right command? Try /givepebbles username, amount, reason (please don't use commas!)"
                );
            }
        } else {
            receivedMessage.channel.send(
                "I don't think you have permission to use that command..."
            );
        }
    },

    takePebbles: function (arguments, receivedMessage) {
        if (receivedMessage.member.roles.some(role => role.name === "Pebble Granting")) {
            arguments = arguments.split(",").map(argument => argument.trim());
            var member = arguments[0];
            var pebbleCount = arguments[1];
            var reason = arguments[2];

            if (!/^\+?(0|[1-9]\d*)$/.test(pebbleCount)) {
                receivedMessage.channel.send(
                    `Pebbles appear to be invalid, please enter a positive number.`
                );
                return;
            }

            if (
                typeof pebbleCount !== "undefined" &&
                typeof reason !== "undefined" &&
                typeof arguments[3] === "undefined"
            ) {
                axios
                    .get(`${helper.getForumApiString()}member/${member}/decrease/${pebbleCount}`)
                    .then(res => {
                        if (Object.entries(res.data).length !== 0) {
                            receivedMessage.channel.send(
                                `${pebbleCount} pebbles have been removed from ${member}'s account: ${reason}`
                            );
                        } else {
                            receivedMessage.channel.send(
                                `Something went wrong, get Dova to check the logs.`
                            );
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        receivedMessage.channel.send(
                            `Does ${member} have enough pebbles? Try /pebbles ${member} to check.`
                        );
                    });
            } else {
                receivedMessage.channel.send(
                    "Was that the right command? Try /takepebbles username, amount, reason (please don't use commas!)"
                );
            }
        } else {
            receivedMessage.channel.send(
                "I don't think you have permission to use that command..."
            );
        }
    },

    giveItem: function (arguments, receivedMessage) {
        if (receivedMessage.member.roles.some(role => role.name === "Item Granting")) {
            arguments = arguments.split(",").map(argument => argument.trim());
            var member = arguments[0];
            var itemName = arguments[1];
            var reason = arguments[2];

            if (
                typeof itemName !== "undefined" &&
                typeof reason !== "undefined" &&
                typeof arguments[3] === "undefined"
            ) {
                axios
                    .get(`${helper.getForumApiString()}member/${member}/giveItem/${itemName}`)
                    .then(res => {
                        if (res.status === 200) {
                            receivedMessage.channel.send(itemName + " given to " + member + " for: " + reason);
                        } else {
                            receivedMessage.channel.send("Something went wrong. Are you sure you typed everything correctly?");
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        receivedMessage.channel.send(
                            `I couldn't find the user ${member}, would you like to try again?`
                        );
                    });
            } else {
                receivedMessage.channel.send(
                    "Was that the right command? Try /giveitem username, item name, reason (please don't use commas in your reason!)"
                );
            }
        } else {
            receivedMessage.channel.send(
                "I don't think you have permission to use that command..."
            );
        }
    },

    takeItem: function (arguments, receivedMessage) {
        if (receivedMessage.member.roles.some(role => role.name === "Item Granting")) {
            arguments = arguments.split(",").map(argument => argument.trim());
            var member = arguments[0];
            var itemName = arguments[1];
            var reason = arguments[2];

            if (
                typeof itemName !== "undefined" &&
                typeof reason !== "undefined" &&
                typeof arguments[3] === "undefined"
            ) {
                axios
                    .get(`${helper.getForumApiString()}member/${member}/takeItem/${itemName}`)
                    .then(res => {
                        if (res.status === 200) {
                            receivedMessage.channel.send(itemName + " taken from " + member + " for: " + reason);
                        } else {
                            receivedMessage.channel.send("No items removed. Are you sure this user owns this item?");
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        receivedMessage.channel.send(
                            `Does ${member} have this item in their inventory?`
                        );
                    });
            } else {
                receivedMessage.channel.send(
                    "Was that the right command? Try /takeitem username, item name, reason (please don't use commas in the reason!)"
                );
            }
        } else {
            receivedMessage.channel.send(
                "I don't think you have permission to use that command..."
            );
        }
    },
}
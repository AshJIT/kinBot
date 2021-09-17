const axios = require("axios");
const helper = require("../helpers/helpers");

module.exports = {
    getUser: function (user, receivedMessage) {
        user = helper.escapeHtml(user).trim();
        axios
            .get(`${helper.getOlApiString()}gaian/name/${user}`)
            .then(res => {
                if (Object.entries(res.data).length !== 0) {
                    if (res.data.is_colourist) {
                        receivedMessage.channel.send(
                            res.data.name +
                            " has " +
                            res.data.kin_count +
                            " kin and has coloured " +
                            res.data.coloured_kin_count +
                            "! \nCheck out their kindex profile here: " + helper.getOlUri() + "owner/" +
                            res.data.slug +
                            "\nOr the kin they've colored here: " + helper.getOlUri() + "colorist/" +
                            res.data.slug
                        );
                    } else {
                        receivedMessage.channel.send(
                            res.data.name +
                            " has " +
                            res.data.kin_count +
                            " kin on the kindex! \nCheck out their kindex profile here: " + helper.getOlUri() + "owner/" +
                            res.data.slug
                        );
                    }
                } else {
                    receivedMessage.channel.send(
                        `I couldn't find the user ${user}, would you like to try again?`
                    );
                }
            })
            .catch(err => {
                console.log(err);
                receivedMessage.channel.send(
                    `I couldn't find the user ${user}, would you like to try again?`
                );
            });
    }
}
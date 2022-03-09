const axios = require("axios");
const helper = require("../helpers/helpers");

module.exports = {
    getKinBySlug: function (kin, receivedMessage) {
        axios
            .get(`${helper.getOlApiString()}kin/slug/${kin}`)
            .then(res => {
                if (Object.entries(res.data).length !== 0) {
                    receivedMessage.channel.send(
                        "Are you looking for " +
                        res.data.name +
                        "? (" + helper.getOlUri() + "kin/view/" +
                        res.data.slug +
                        ")" +
                        "\n" +
                        res.data.current_image_url
                    );
                } else {
                    receivedMessage.channel.send(
                        `I couldn't find the kin ${kin}, would you like to try again?`
                    );
                }
            })
            .catch(err => {
                console.log(err);
                receivedMessage.channel.send(
                    `I couldn't find the kin ${kin}, would you like to try again?`
                );
            });
    },

    getKin: function (kin, receivedMessage) {
        kin = helper.escapeHtml(kin).trim();

        axios
            .get(`${helper.getOlApiString()}kin/name/${kin}`)
            .then(res => {
                if (Object.entries(res.data).length !== 0) {
                    receivedMessage.channel.send(
                        "Are you looking for " +
                        res.data.name +
                        "? (" + helper.getOlUri() + "kin/view/" +
                        res.data.slug +
                        ")" +
                        "\n" +
                        res.data.current_image_url
                    );
                } else {
                    receivedMessage.channel.send(
                        `I couldn't find the kin ${kin}, would you like to try again?`
                    );
                }
            })
            .catch(err => {
                console.log(err);
                receivedMessage.channel.send(
                    `I couldn't find the kin ${kin}, would you like to try again?`
                );
            });
    }
}
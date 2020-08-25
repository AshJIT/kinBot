const axios = require("axios");
const helper = require("../helpers/helpers");

module.exports = {
    getShip: function (kinString, receivedMessage) {
        let couple = kinString.split(" & ");

        if (couple.length === 1) {
            receivedMessage.channel.send(
                `Was that the right command? Try /ship kin name & kin name!`
            );
            return;
        }

        const fetchKin = url => axios.get(url);

        const kinGetUrls = couple.map(kin => {
            let currentKin = helper.escapeHtml(kin).trim();

            return `${helper.getOlApiString()}kin/name/${currentKin}`;
        });

        const promiseArray = kinGetUrls.map(fetchKin);

        Promise.all(promiseArray)
            .then(function ([first, second]) {
                if (
                    Object.entries(first.data).length !== 0 ||
                    Object.entries(second.data).length !== 0
                ) {
                    receivedMessage.channel.send(
                        first.data.name +
                        " & " +
                        second.data.name +
                        "\n" +
                        first.data.current_image_url +
                        " " +
                        second.data.current_image_url
                    );
                } else {
                    receivedMessage.channel.send(
                        `I couldn't find those kin, would you like to try again?`
                    );
                }
            })
            .catch(err => {
                console.log(err);
                receivedMessage.channel.send(
                    `I couldn't find those kin, would you like to try again?`
                );
            });
    },

    getMysteryShip: function (params, receivedMessage) {
        let user = {};
        let kinName = {};

        if (params) {
            if (/\buser=\b/i.test(params)) {
                user = params.split("=");
            }

            if (/\bkin=\b/i.test(params)) {
                kinName = params.split("=");
            }
        }

        axios
            .get(`${helper.getOlApiString()}kin/`)
            .then(res => {
                if (Object.entries(res.data).length !== 0) {
                    let doe = res.data[Math.floor(Math.random() * res.data.length)];
                    while (doe.gender_id !== 2) {
                        doe = res.data[Math.floor(Math.random() * res.data.length)];
                    }

                    let buck = res.data[Math.floor(Math.random() * res.data.length)];
                    while (buck.gender_id !== 1) {
                        buck = res.data[Math.floor(Math.random() * res.data.length)];
                    }

                    receivedMessage.channel.send(
                        doe.name +
                        " & " +
                        buck.name +
                        "\n" +
                        doe.current_image_url +
                        " " +
                        buck.current_image_url
                    );
                } else {
                    receivedMessage.channel.send(`I'm being lazy today, try again later.`);
                }
            })
            .catch(err => {
                console.log(err);
                receivedMessage.channel.send(`I'm being lazy today, try again later.`);
            });
    }
};
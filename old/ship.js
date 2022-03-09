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
        const maleKin = axios.get(`${helper.getOlApiString()}kin/male/1`);
        const femaleKin = axios.get(`${helper.getOlApiString()}kin/female/1`);

        Promise.all([maleKin, femaleKin])
            .then(function ([male, female]) {
                if (
                    male.status === 200 &&
                    female.status === 200
                ) {
                    receivedMessage.channel.send(
                        male.data.name +
                        " & " +
                        female.data.name +
                        "\n" +
                        male.data.current_image_url +
                        " " +
                        female.data.current_image_url
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
    }
};
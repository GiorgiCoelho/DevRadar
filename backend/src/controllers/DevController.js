const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

//index, show, store, update, delete

module.exports = {
    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const res = await axios.get(`https://api.github.com/users/${github_username}`)

            //Se name não existir, pega o valor de login através de desestruturação.
            const { name = login, avatar_url, bio } = res.data;

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            const dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });

            //Filtrar conexões que estão há no máximo 10Km distância e que o 
            //novo dev tenha ao menos uma das techs filtradas
            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray
            );

            sendMessage(sendSocketMessageTo, 'new-dev', dev);

            return response.json(dev);
        }
    },

    async destroy(request, response) {
        const { id } = request.params;

        console.log(id);

        const dev = await Dev.deleteOne({ _id: id });

        return response.json(dev);
    },

    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async update(request, response) {
        const { id } = request.params;
        const { github_username, techs } = request.body;

        if (!github_username) {
            let techsArray;
            if (techs) {
                techsArray = parseStringAsArray(techs);
                request.body.techs = techsArray;
            }
            const dev = await Dev.updateOne({ _id: id }, request.body);

            return response.json(dev);
        }
    }
};


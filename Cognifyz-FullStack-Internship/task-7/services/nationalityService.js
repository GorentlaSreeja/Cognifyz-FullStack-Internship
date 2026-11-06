const axios = require("axios");

async function getNationality(name) {

    try {

        const response = await axios.get(
            `https://api.nationalize.io/?name=${name}`
        );

        return response.data;

    } catch (err) {

        throw new Error("Unable to fetch nationality data.");

    }

}

module.exports = {
    getNationality
};
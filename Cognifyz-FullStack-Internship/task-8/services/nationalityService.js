const axios = require("axios");
const cache = require("./cacheService");

async function getNationality(name) {

    const key = name.toLowerCase();

    // Check Cache
    if (cache.has(key)) {

        console.log("⚡ Serving from Cache...");

        return cache.get(key);

    }

    console.log("🌐 Fetching from Nationalize API...");

    try {

        const response = await axios.get(
            `https://api.nationalize.io/?name=${name}`
        );

        // Store in Cache
        cache.set(key, response.data);

        return response.data;

    } catch (err) {

        throw new Error("Unable to fetch nationality data.");

    }

}

module.exports = {
    getNationality
};
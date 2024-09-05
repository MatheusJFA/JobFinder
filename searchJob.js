const axios = require('axios');
const generateXLSX = require('./xlsx.js');
const queryBuilder = require('./queryBuilder.js');

const dotenv = require('dotenv');
dotenv.config();

/**
 * Search for a job in all provided websites
 * @param {String} query 
 * @param {Array<String>} websites 
 */
async function searchJob(query, websites) {
    let data = [];
    let message = '';


    /**
     * For more information look at the documentation
     * @see https://developers.google.com/custom-search/docs/xml_results?hl=en#WebSearch_Query_Parameter_Definitions
     */

    websites.map(website => {
        const builder = queryBuilder(website, query);
        data.push(builder);
    });

    let configuration = {
        method: 'post',
        url: 'https://google.serper.dev/search',
        headers: {
            'X-API-KEY': process.env.API_KEY, // Your API Key, you need to provide it on a .env file
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
    };

    await axios(configuration)
        .then(async (response) => {
            const results = response.data; // it will return an array with the results
            const { path, credits } = await generateXLSX(results, query);
            message = `The search results are saved in the file ${path} and you use ${credits} credits`;
        })
        .catch((error) => {
            message = error.message;
        });

    return { message };
}

module.exports = searchJob;
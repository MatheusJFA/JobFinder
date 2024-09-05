const axios = require('axios');
const exceljs = require('exceljs');

const websites = [
    "gupy.io",
    "solides.com.br",
    "vagas.com",
    "indeed.com.br",
    "linkedin.com",
    "infojobs.com.br",
    "boards.greenhouse.io",
    "jobs.ashbyhq.com",
    "jobs.jobvite.com",
    "myworkdayjobs.com",
    "careers.jobscore.com",
    "ats.comparably.com",
    "*.bamboohr.com",
    "*.remote.com"
];

async function searchJob(query) {
    let data = [];
    console.log(`Searching for ${query} jobs... Please wait`);


    /**
     * For more information look at the documentation
     * @see https://developers.google.com/custom-search/docs/xml_results?hl=en#WebSearch_Query_Parameter_Definitions
     */

    websites.map(website => {
        data.push({
            "q": `site:${website} ${query}`,
            "tbs": "qdr:w",
            "num": 50,
            "location": process.env.LOCATION ?? "Brazil",
            "gl": process.env.GL ?? "br",
            "hl": process.env.HL ?? "pt"
        });
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

            // it will return an array with the results
            const results = response.data;

            const workbook = new exceljs.Workbook();
            const worksheet = workbook.addWorksheet('Search Results');

            worksheet.columns = [
                { header: 'Title', key: 'title', width: 50 },
                { header: 'Link', key: 'link', width: 200 },
                { header: 'Snippet', key: 'snippet', width: 200 },
                { header: 'Date', key: 'date', width: 50 },
            ];

            let credits = response.data.length;

            for (let result of results) {
                if (result.organic) {
                    for (let organic of result.organic) {
                        worksheet.addRow({
                            title: organic.title,
                            link: organic.link,
                            snippet: organic.snippet,
                            date: organic.date || 'No date found',
                        });

                        if (organic.sitelinks) {
                            for (let sitelink of organic.sitelinks) {
                                worksheet.addRow({
                                    title: sitelink.title,
                                    link: sitelink.link,
                                    snippet: `This is related to the main link: ${organic.title}`,
                                    date:  `This is related to the main link: ${organic.title}`,
                                })
                            }
                        }
                    }
                }
            }


            worksheet.getRow(1).eachCell((cell) => {
                cell.font = { bold: true, color: { argb: 'FFFFFF' } };
                cell.fill = { type: 'pattern', pattern: 'solid' };
            });


            const date = new Date();


            // Returns the DD-MM-YYYY
            const formatedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
            const hash = Math.random().toString(36).substring(7);

            const path = `${query}-search-results-${formatedDate}-${hash}.xlsx`;

            console.log(`The search results are saved in the file ${path} and you use ${credits} credits`);

            await workbook.xlsx.writeFile(path);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = searchJob;
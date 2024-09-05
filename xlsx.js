const exceljs = require('exceljs');
const rowBuilder = require('./rowBuilder');

/**
 * Generate the XLSX file with the search results
 * 
 * @param {Promise<Object>} results - Result from the search
 * @param {String} query - User query
 * @returns {Object} - Returns the path of the file and the credits used
 */
async function generateXLSX(results, query) {
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Search Results');

    worksheet.columns = [
        { header: 'Title', key: 'title', width: 50 },
        { header: 'Link', key: 'link', width: 200 },
        { header: 'Snippet', key: 'snippet', width: 200 },
        { header: 'Date', key: 'date', width: 50 },
    ];

    let credits = results.length;

    for (let result of results) {
        if (result.organic) {
            for (let organic of result.organic) {
                worksheet.addRow(rowBuilder(organic));

                if (organic.sitelinks) {
                    for (let sitelink of organic.sitelinks) {
                        worksheet.addRow(rowBuilder(sitelink, organic));
                    }
                }
            }
        }
    }

    worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true, color: { argb: 'FFFFFF' } };
        cell.fill = { type: 'pattern', pattern: 'solid' };
    });

    // Returns the DD-MM-YYYY
    const date = new Date();

    const formatedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const hash = Math.random().toString(36).substring(7);

    const jobTitle = query.replace(/\s/g, '-').toLowerCase();

    const path = `${jobTitle}-search-results-${formatedDate}-${hash}.xlsx`;
    await workbook.xlsx.writeFile(path);

    return {path, credits};
}

module.exports = generateXLSX;
const dotenv = require('dotenv');
dotenv.config();

function queryBuilder(website, query) {
  return {
    "q": `site:${website} ${query}`,
    "tbs": "qdr:w",
    "num": 50,
    "location": process.env.LOCATION ?? "Brazil",
    "gl": process.env.GL ?? "br",
    "hl": process.env.HL ?? "pt"
  }
}

module.exports = queryBuilder;
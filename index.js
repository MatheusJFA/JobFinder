const readline = require('readline/promises');

const dotenv = require('dotenv');
const search = require('./search');
dotenv.config();

(async () => {
    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log("Welcome to the Job Finder");
    const query = await rl.question("Insert your job title so we can look up in the most websites: Ex: 'JavaScript Developer'\n > ");

    await search(query);

    rl.close(); // Close the readline
})()


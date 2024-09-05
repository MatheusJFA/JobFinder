const readline = require('readline/promises');
const searchJob = require('./searchJob');
const lookupWebsites = require('./lookupWebsites');

(async () => {
    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log("Welcome to the Job Finder");
    const query = await rl.question("Insert your job title so we can look up in the most websites: Ex: 'JavaScript Developer'\n > ");

    const jobType = await rl.question(`Choose: \n1) for full time job \n2) for freelancer job: \n > `);

    if (jobType !== '1' && jobType !== '2') {
        rl.close();
        throw new Error('Invalid option');
    }

    const jobName = jobType === '1' ? 'full-time' : 'freelancer';
    console.log(`Searching for ${jobName} jobs...`);

    const websites = lookupWebsites(jobType);
    console.log(`Searching in the following websites: ${websites.join(', ')}`);

    const { message } = await searchJob(query, websites);

    console.log(message);

    rl.close(); // Close the readline
})()


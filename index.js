const readline = require('readline/promises');

const dotenv = require('dotenv');
const searchJob = require('./searchJob');
const searchFreelancerJob = require('./searchFreelancerJob');
dotenv.config();

(async () => {
    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log("Welcome to the Job Finder");
    const query = await rl.question("Insert your job title so we can look up in the most websites: Ex: 'JavaScript Developer'\n > ");

    const jobType = await rl.question(`Choose: \n1) for full time job \n2) for freelancer job: \n > `);

    switch(jobType) {
        case '1':
            await searchJob(query);
            break;
        case '2':
            await searchFreelancerJob(query);
            break;
        default:
            console.log("Invalid option");
            break
    }

    rl.close(); // Close the readline
})()


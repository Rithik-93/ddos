const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

async function fetchData() {
    const url = process.env.url;
    console.log(`Fetching data from: ${url}`);

    const concurrency = 1000; // Number of concurrent requests
    const fetchPromises = [];

    let requestCount = 0; // Keeps track of total requests sent

    while (true) {
        for (let i = 0; i < concurrency; i++) {
            const promise = axios.get(url)
                .then(response => {
                    console.log(`Request ${++requestCount} successful`);
                    return response.data;
                })
                .catch(error => {
                    console.error(`Request ${++requestCount} failed:`, error.message);
                });

            fetchPromises.push(promise);
        }

        // Wait for current batch to complete before continuing
        await Promise.all(fetchPromises);
        fetchPromises.length = 0; // Clear array for the next batch
    }
}

fetchData().catch(console.error);

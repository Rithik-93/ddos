const axios = require('axios');
const dotenv = require('dotenv')
dotenv.config();

async function fetchData() {
    const url = process.env.url2;
    console.log(url)
    const requestCount = 1000000000000099999999000000000000;
    const concurrency = 10000;

    const fetchPromises = [];

    for (let i = 0; i < requestCount; i++) {
        const promise = axios.get(url)
            .then(response => {
                console.log(`Request ${i + 1} successful`);
                return response.data;
            })
            .catch(error => {
                console.error(`Request ${i + 1} failed:`, error.message);
            });

        fetchPromises.push(promise);

        // Implement concurrency control
        if (fetchPromises.length >= concurrency) {
            await Promise.all(fetchPromises.splice(0, concurrency));
        }
    }

    // Wait for any remaining promises
    await Promise.all(fetchPromises);
}

fetchData().catch(console.error);


fetchData()
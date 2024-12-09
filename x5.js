const axios = require('axios');

async function fetchData() {
    const url = process.env.url2;
    const requestCount = 10000000000000000000000000000000000000000000;
    const concurrency = 10000; // Limit concurrent requests

    const fetchPromises = [];

    for (let i = 0; i < requestCount; i++) {
        const promise = fetch(url, { verbose: true })
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
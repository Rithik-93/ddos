
import dotenv from 'dotenv'
dotenv.config({ path: './.env' });

async function fetchData() {
    const url = process.env.url;
    console.log(url)
}

fetchData()
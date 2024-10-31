const express = require('express');
const axios = require('axios');
const cors = require('cors'); 
const app = express();
const bodyParser = require('body-parser');
const port = 3001;

const API_KEY = '-pA9PWg97K8nRP-76aV5oP8j_p2TXoJ0_WQpBu7nRWY';
const apiUrl = 'https://api.unsplash.com/photos/random';
const apiUrl2 = 'https://api.unsplash.com/search/photos'

app.use(express.json());
app.use(cors()); 
app.use(bodyParser.json());

app.get('/api/random', async (req, res) => {
    try {
        const response = await axios.get(`${apiUrl}?count=10&client_id=${API_KEY}`);
        const data = response.data;
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching the images from Unsplash.');
    }
});


app.get('/api/search/:query', async (req, res) => {
    const { query } = req.params;
    try {
        const response = await axios.get(apiUrl2, {
            headers: {
                Authorization: `Client-ID ${API_KEY}`,
            },
            params: {
                query,
            },
        });
        res.json(response.data.results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to search for images' });
    }
});
  
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
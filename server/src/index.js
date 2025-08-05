const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

//Middleware
app.use(express.json());
app.use(cors());

//all currencies 
app.get('/getAllCurrencies', async (req, res) => {
    const nameURL = "https://api.frankfurter.dev/v1/currencies"

    try{
        const namesResponse = await axios.get(nameURL);
    const nameData = namesResponse.data;

    return res.json(Object.keys(nameData));

    }catch (err) {
        console.error(err);
    }
});

//listening port
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
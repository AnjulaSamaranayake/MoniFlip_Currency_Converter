const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

//Middleware
app.use(express.json());
app.use(cors());

//all currencies 
app.get('/getAllCurrencies', async (req, res) => {
    const nameURL = "https://api.frankfurter.dev/v1/currencies"; 

    try{
        const namesResponse = await axios.get(nameURL);
    const nameData = namesResponse.data;

    return res.json(Object.keys(nameData));

    }catch (err) {
        console.error(err);
    }
});

app.get('/getConversion', async (req, res) => {
    const {date, sourceCurrency, targetCurrency, amount} = req.query;
    
    try {
        // Use Frankfurter API which doesn't require an API key
        const dataURL = `https://api.frankfurter.app/${date}?from=${sourceCurrency}&to=${targetCurrency}&amount=${amount}`;
        
        const dataResponse = await axios.get(dataURL);
        const result = dataResponse.data.rates[targetCurrency];
        
        return res.json(result.toFixed(2));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Conversion failed' });
    }
});    

//listening port
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
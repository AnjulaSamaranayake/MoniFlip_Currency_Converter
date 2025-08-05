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

app.get('/getConversion', async (req, res) => {
    const {date, sourceCurrency, targetCurrency, amount} = req.query;

    try {
        const dataURL = `https://api.frankfurter.dev/v1/${date}?from=${sourceCurrency}&to=${targetCurrency}`;

        const dataResponse = await axios.get(dataURL);
        const rates = dataResponse.data.rates;

        //calculate the conversion
        const sourceRate = rates[sourceCurrency];
        const targetRate = rates[targetCurrency];

        const conversion = (targetRate / sourceRate) * amount;

        return res.json(conversion);
        
    } catch (err) {
        console.error(err);
    }
});    

//listening port
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
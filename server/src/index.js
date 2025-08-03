const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

//Middleware
app.use(express.json());
app.use(cors());

//listening port
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
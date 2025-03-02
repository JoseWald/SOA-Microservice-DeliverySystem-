const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.get('/esb/user/:id', async (req, res) => {
    const response = await axios.get(`http://localhost:3001/user/${req.params.id}`);
    res.json(response.data);
});

app.get('/esb/order/:id', async (req, res) => {
    const response = await axios.get(`http://localhost:3002/order/${req.params.id}`);
    res.json(response.data);
});

app.post('/esb/pay', async (req, res) => {
    const response = await axios.post('http://localhost:3003/pay', req.body);
    res.json(response.data);
});

app.listen(4000, () => console.log("ESB en écoute sur le port 4000"));

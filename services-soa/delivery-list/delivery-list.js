const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.get('/order/:id', async (req, res) => {
    const userId = req.params.id;
    const user = await axios.get(`http://localhost:3001/user/${userId}`);
    res.json({ orderId: "123ABC", user: user.data });
});

app.listen(3002, () => console.log("Service Commande sur le port 3002"));

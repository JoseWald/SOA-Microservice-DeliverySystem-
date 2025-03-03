const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const PRODUCT_SERVICE_URL = 'http://localhost:3000/produits';
const DELIVERY_SERVICE_URL = 'http://localhost:3001/livraisons';

/* Passer par l'ESB pour les produits */
// Ajout d'un produit
app.post('/esb/produits', async (req, res) => {
    try {
        const response = await axios.post(PRODUCT_SERVICE_URL, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: 'Erreur lors de l’ajout' });
    }
});

// Récupération de tous les produits
app.get('/esb/produits', async (req, res) => {
    try {
        const response = await axios.get(PRODUCT_SERVICE_URL);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: 'Erreur lors de la récupération' });
    }
});

// Mise à jour d'un produit
app.put('/esb/produits/:id', async (req, res) => {
    try {
        const response = await axios.put(`${PRODUCT_SERVICE_URL}/${req.params.id}`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: 'Erreur lors de la mise à jour' });
    }
});

// Suppression d'un produit
app.delete('/esb/produits/:id', async (req, res) => {
    try {
        const response = await axios.delete(`${PRODUCT_SERVICE_URL}/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: 'Erreur lors de la suppression' });
    }
});

// Suppression de tous les produits
app.delete('/esb/produits', async (req, res) => {
    try {
        const response = await axios.delete(PRODUCT_SERVICE_URL);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: 'Erreur lors de la suppression' });
    }
});

// Recherche d'un produit par nom
app.get('/esb/produits/recherche', async (req, res) => {
    try {
        const response = await axios.get(`${PRODUCT_SERVICE_URL}/recherche`, { params: req.query });
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: 'Erreur lors de la recherche' });
    }
});

/* 
*Passer par l'ESB pour les livraisons 
*/
// Obtenir toutes les commandes de livraisons
app.get('/esb/livraisons', async (req, res) => {
    try {
        const response = await axios.get(`${DELIVERY_SERVICE_URL}/`);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: 'Erreur lors de la récupération des livraisons' });
    }
});

// Chercher un client qui a passé une commande
app.get('/esb/livraisons/client/:nom', async (req, res) => {
    try {
        const response = await axios.get(`${DELIVERY_SERVICE_URL}/client/${req.params.nom}`);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: 'Erreur lors de la recherche du client' });
    }
});

// Supprimer une commande par ID
app.delete('/esb/livraisons/:id', async (req, res) => {
    try {
        const response = await axios.delete(`${DELIVERY_SERVICE_URL}/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: 'Erreur lors de la suppression de la commande' });
    }
});

// Supprimer toutes les commandes
app.delete('/esb/livraisons', async (req, res) => {
    try {
        const response = await axios.delete(DELIVERY_SERVICE_URL);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: 'Erreur lors de la suppression de toutes les commandes' });
    }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`ESB en écoute sur le port ${PORT}`));

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

const db = new sqlite3.Database('productDB.db', (err) => {
    if (err) console.error('Erreur lors de l’ouverture de la base de données:', err);
    else console.log('Connexion réussie à SQLite');
});

//create prod
app.post('/produits', (req, res) => {
    const { nom, prix, image } = req.body;
    db.run('INSERT INTO Produits (nom, prix, image) VALUES (?, ?, ?)', [nom, prix, image], function(err) {
        if (err) return res.status(500).json({ message: 'Erreur lors de l’ajout' });
        res.json({ id: this.lastID, nom, prix, image });
    });
});

//get all prod
app.get('/produits', (req, res) => {
    db.all('SELECT * FROM Produits', [], (err, rows) => {
        if (err) return res.status(500).json({ message: 'Erreur lors de la récupération' });
        res.json(rows);
    });
});

//update prod
app.put('/produits/:id', (req, res) => {
    const { nom, prix, image } = req.body;
    const { id } = req.params;
    db.run('UPDATE Produits SET nom = ?, prix = ?, image = ? WHERE id = ?', [nom, prix, image, id], function(err) {
        if (err) return res.status(500).json({ message: ' Erreur lors de la mise à jour' });
        if (this.changes === 0) return res.status(404).json({ message: '⚠ Produit non trouvé' });
        res.json({ id, nom, prix, image });
    });
});

//delete prod
app.delete('/produits/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM Produits WHERE id = ?', [id], function(err) {
        if (err) return res.status(500).json({ message: ' Erreur lors de la suppression' });
        if (this.changes === 0) return res.status(404).json({ message: '⚠ Produit non trouvé' });
        res.json({ message: 'Produit supprimé' });
    });
});

//delete all product
app.delete('/produits', (req, res) => {
    db.run('DELETE FROM Produits', function(err) {
        if (err) return res.status(500).json({ message: 'Erreur lors de la suppression' });
        res.json({ message: 'Tous les produits ont été supprimés' });
    });
});

//finding a product
app.get('/produits/recherche', (req, res) => {
    const { nom } = req.query;
    db.all('SELECT * FROM Produits WHERE nom LIKE ?', [`%${nom}%`], (err, rows) => {
        if (err) return res.status(500).json({ message: ' Erreur lors de la recherche' });
        res.json(rows);
    });
});
app.listen(PORT, () => console.log(`🚀 Serveur en écoute sur http://localhost:${PORT}`));


const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const path = require('path');
const dbPath = path.resolve(__dirname, '../../db/deliveryDB.db');
const cors = require('cors');
const delivery = new sqlite3.Database(dbPath, (err) => {
  if (err) {
      console.error('Erreur d’ouverture de la base de données :', err.message);
  } else {
      console.log('Connexion réussie à la base de données SQLite.');
  }
});

app.use(cors());
app.use(express.json());

// Lire toutes les livraisons
app.get('/livraisons', (req, res) => {
  delivery.all('SELECT * FROM Livraisons', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Chercher une livraison par client
app.get('/livraisons/client/:nom', (req, res) => {
  const nomClient = req.params.nom;
  delivery.all('SELECT * FROM Livraisons WHERE client = ?', [nomClient], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Supprimer une livraison par ID
app.delete('/livraisons/:id', (req, res) => {
  const id = req.params.id;
  delivery.run('DELETE FROM Livraisons WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: `Livraison avec l'ID ${id} supprimée.` });
    }
  });
});

// Supprimer toutes les livraisons
app.delete('/livraisons', (req, res) => {
  delivery.run('DELETE FROM Livraisons', function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Toutes les livraisons ont été supprimées.' });
    }
  });
});


app.listen(3001, () => {
  console.log('Serveur démarré sur http://localhost:3001');
});
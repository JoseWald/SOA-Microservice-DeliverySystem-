
const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const delivery = new sqlite3.Database('../db/deliveryDB.db');

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
  console.log('Serveur démarré sur http://localhost:3000');
});
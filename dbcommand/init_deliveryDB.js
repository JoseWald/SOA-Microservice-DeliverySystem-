const sqlite3 = require('sqlite3').verbose(); 
const delivery = new sqlite3.Database('../db/deliveryDB.db'); 


delivery.serialize(() => {
  delivery.run(`
    CREATE TABLE IF NOT EXISTS Livraisons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client TEXT NOT NULL,
      adresse TEXT NOT NULL,
      produit TEXT NOT NULL,
      quantite INTEGER NOT NULL,
      statut TEXT NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error('Erreur lors de la création de la table :', err.message);
    } else {
      console.log('Table "Livraisons" créée ou déjà existante.');
    }
  });
});


delivery.close((err) => {
  if (err) {
    console.error('Erreur lors de la fermeture de la base de données :', err.message);
  } else {
    console.log('Base de données fermée.');
  }
});
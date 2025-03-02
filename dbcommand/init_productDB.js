const sqlite3 = require('sqlite3').verbose(); 
const productDB = new sqlite3.Database('../db/productDB.db');

productDB.serialize(() => {
    productDB.run(`
      CREATE TABLE IF NOT EXISTS Produits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL,
        prix REAL NOT NULL,
        image TEXT
      )
    `, (err) => {
      if (err) {
        console.error('Erreur lors de la création de la table Produits :', err.message);
      } else {
        console.log('Table "Produits" créée ou déjà existante.');
      }
    });
  });
    productDB.close((err) => {
    if (err) {
      console.error('Erreur lors de la fermeture de la base de données :', err.message);
    } else {
      console.log('Base de données productDB fermée.');
    }
  });
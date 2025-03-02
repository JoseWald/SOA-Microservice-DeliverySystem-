require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./db');

const app = express();
app.use(express.json());


app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get('SELECT * FROM admins WHERE username = ?', [username], async (err, admin) => {
        if (err) return res.status(500).json({ message: 'Erreur serveur' });
        if (!admin) return res.status(400).json({ message: 'Utilisateur introuvable' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect' });

        const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
});

SECRET_KEY = 'superSecret_key'
function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Accès refusé, token manquant' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token invalide' });
        req.user = user; 
        next();
    });
}



app.post('/products', authenticateToken ,(req, res) => {
    const { name, price } = req.body;
    db.run('INSERT INTO products (name, price) VALUES (?, ?)', [name, price], function(err) {
        if (err) return res.status(500).json({ message: 'Erreur' });
        res.json({ id: this.lastID, name, price });
    });
});

app.get('/products', authenticateToken , (req, res) => {
    db.all('SELECT * FROM products', [], (err, rows) => {
        if (err) return res.status(500).json({ message: 'Erreur' });
        res.json(rows);
    });
});

app.put('/products/:id', authenticateToken , (req, res) => {
    const { name, price } = req.body;
    const { id } = req.params;
    db.run('UPDATE products SET name = ?, price = ? WHERE id = ?', [name, price, id], function(err) {
        if (err) return res.status(500).json({ message: 'Erreur' });
        if (this.changes === 0) return res.status(404).json({ message: 'Produit non trouvé' });
        res.json({ id, name, price });
    });
});

app.delete('/products/:id',authenticateToken ,(req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM products WHERE id = ?', [id], function(err) {
        if (err) return res.status(500).json({ message: 'Erreur' });
        if (this.changes === 0) return res.status(404).json({ message: 'Produit non trouvé' });
        res.json({ message: 'Produit supprimé' });
    });
});


app.listen(3001, () => console.log('🟢 Admin Service en écoute sur 3001'));

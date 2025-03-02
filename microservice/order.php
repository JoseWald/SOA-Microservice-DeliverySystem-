<?php
$pdo = new PDO('sqlite:orders.db');
$pdo->exec("CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    status TEXT DEFAULT 'en attente'
)");
?>

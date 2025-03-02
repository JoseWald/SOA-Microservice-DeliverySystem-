<?php
require 'database.php';

header("Content-Type: application/json");

// Récupérer les commandes
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $stmt = $pdo->query("SELECT * FROM orders");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}

// Modifier une commande
if ($_SERVER["REQUEST_METHOD"] === "PUT") {
    $input = json_decode(file_get_contents('php://input'), true);
    $stmt = $pdo->prepare("UPDATE orders SET status=? WHERE id=?");
    $stmt->execute([$input['status'], $input['id']]);
    echo json_encode(["message" => "Commande mise à jour"]);
}
?>

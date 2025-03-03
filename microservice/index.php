<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');

// Connexion aux bases de données
$db_delivery = new SQLite3('../db/deliveryDB.db');
$db_product = new SQLite3('../db/productDB.db');

$request_method = $_SERVER['REQUEST_METHOD'];
$path = trim($_SERVER['REQUEST_URI'], "/");

// Route POST /livraisons
if ($request_method === 'POST' && $path === "livraisons") {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['client'], $data['adresse'], $data['produit'], $data['statut'])) {
        // Vérifier si le produit existe dans productDB
        $stmt = $db_product->prepare("SELECT id FROM Produits WHERE nom = :produit");
        $stmt->bindValue(':produit', $data['produit'], SQLITE3_TEXT);
        $result = $stmt->execute()->fetchArray(SQLITE3_ASSOC);

        if ($result) {
            // Insérer la livraison dans deliveryDB avec la quantité
            $stmt = $db_delivery->prepare("INSERT INTO Livraisons (client, adresse, produit, quantite, statut) VALUES (:client, :adresse, :produit, :quantite, :statut)");
            $stmt->bindValue(':client', $data['client'], SQLITE3_TEXT);
            $stmt->bindValue(':adresse', $data['adresse'], SQLITE3_TEXT);
            $stmt->bindValue(':produit', $data['produit'], SQLITE3_TEXT);
            $stmt->bindValue(':quantite', $data['quantite'], SQLITE3_INTEGER);
            $stmt->bindValue(':statut', $data['statut'], SQLITE3_TEXT);
        
            if ($stmt->execute()) {
                echo json_encode(["message" => "Livraison créée avec succès"]);
            } else {
                echo json_encode(["error" => "Erreur lors de la création de la livraison"]);
            }
        } else {
            echo json_encode(["error" => "Produit inexistant"]);
        }
        
    } else {
        echo json_encode(["error" => "Données manquantes"]);
    }
} else {
    echo json_encode(["error" => "Route non trouvée"], JSON_UNESCAPED_UNICODE);
    http_response_code(404);
}

// Fermer les connexions aux bases de données
$db_delivery->close();
$db_product->close();

<?php
header('Content-Type: application/json');


$db = new SQLite3('../db/deliveryDB.db');

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['client'], $data['adresse'], $data['produit'], $data['quantite'], $data['statut'])) {
    $stmt = $db->prepare("INSERT INTO Livraisons (client, adresse, produit, quantite, statut) VALUES (:client, :adresse, :produit, :quantite, :statut)");
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
    echo json_encode(["error" => "Données manquantes"]);
}
?>

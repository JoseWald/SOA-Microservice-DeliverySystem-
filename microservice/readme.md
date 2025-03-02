# Lancer le serveur PHP (dans le dossier contenant ton script)
php -S localhost:3001

# Tester l'ajout d'une commande via cURL
curl -X POST http://localhost:3001/ \
     -H "Content-Type: application/json" \
     -d '{
        "client": "John Doe",
        "adresse": "123 Rue Principale",
        "produit": "Ordinateur portable",
        "quantite": 1,
        "statut": "En cours"
     }'

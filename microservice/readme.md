# lancer le serveur apache
sudo systemctl start apache2

# Lancer le serveur PHP (dans le dossier contenant ton script)
cd microservice
php -S localhost:3002 -t

# Tester l'ajout d'une commande via cURL
curl -X POST http://localhost:3002/livraisons \
     -H "Content-Type: application/json" \
     -d '{
        "client": "John Doe",
        "adresse": "123 Rue Principale",
        "produit": "Ordinateur portable",
        "quantite": 1,
        "statut": "En cours"
     }'

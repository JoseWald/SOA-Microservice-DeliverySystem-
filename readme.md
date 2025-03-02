
SOA = Plusieurs services indépendants (User, Order, Payment).
ESB (ici avec Express) = Point central qui fait l’intermédiaire.
Chaque service fonctionne séparément et peut être remplacé ou amélioré sans impacter les autres.


1-Installer les dépendances

2-. Lancer le projet
Dans plusieurs terminaux, démarre chaque service :

    # Démarrer les services
    node services/service-user/user-server.js
    node services/service-order/order-server.js
    node services/service-payment/payment-server.js

    # Démarrer l’ESB
    node esb.js

3-Tester l’architecture SOA
-Obtenir un utilisateur via l’ESB:curl http://localhost:4000/esb/user/1
-Récupérer une commande via l’ESB:curl http://localhost:4000/esb/order/1
-Effectuer un paiement via l’ESB:curl -X POST http://localhost:4000/esb/pay -H "Content-Type: application/json" -d '{"amount": 100}'



SOA = Plusieurs services indépendants (service de livraison et de publication de produit).
ESB (ici avec Express) = Point central qui fait l’intermédiaire.
Chaque service fonctionne séparément et peut être remplacé ou amélioré sans impacter les autres.
 
1-Installer les dépendances

2-. Lancer le projet
Dans plusieurs terminaux, démarre chaque service :

    # Démarrer les services
    node services-soa/delivery-service/delivery.js
    node services-soa/product-service/product.js


    # Démarrer l’ESB
    nodemon esb.js

3-Tester l’architecture SOA
# **API Gateway (ESB) - Documentation**

Les commandes pour tester chaque endpoint via **Postman** ou **cURL**.

---

## **Produits**

### **1. Ajouter un produit**
- **Méthode :** `POST`
- **URL :** `http://localhost:4000/esb/produits`
- **Exemple de requête JSON :**
```json
{
  "nom": "Laptop",
  "prix": 1200,
  "stock": 10,
  "image": "chemin vers l'image"
}
```

### **2. Récupérer tous les produits**
- **Méthode :** `GET`
- **URL :** `http://localhost:4000/esb/produits`

### **3. Mettre à jour un produit**
- **Méthode :** `PUT`
- **URL :** `http://localhost:4000/esb/produits/:id`
- **Exemple de requête JSON :**
```json
{
  "nom": "Laptop Gamer",
  "prix": 1500,
  "stock": 5
}
```

### **4. Supprimer un produit**
- **Méthode :** `DELETE`
- **URL :** `http://localhost:4000/esb/produits/:id`

### **5. Supprimer tous les produits**
- **Méthode :** `DELETE`
- **URL :** `http://localhost:4000/esb/produits`

### **6. Rechercher un produit par nom**
- **Méthode :** `GET`
- **URL :** `http://localhost:4000/esb/produits/recherche?nom=Laptop`

---

## **Livraisons**

### **1. Chercher une commande par nom de client**
- **Méthode :** `GET`
- **URL :** `http://localhost:4000/esb/livraisons/client/:nom`

### **2. Supprimer une commande par ID**
- **Méthode :** `DELETE`
- **URL :** `http://localhost:4000/esb/livraisons/:id`

### **3. Supprimer toutes les commandes**
- **Méthode :** `DELETE`
- **URL :** `http://localhost:4000/esb/livraisons`

---

## **Test avec cURL**

### **Exemple pour ajouter un produit**
```sh
curl -X POST http://localhost:4000/esb/produits \
     -H "Content-Type: application/json" \
     -d '{"nom":"Laptop","prix":1200,"stock":10}'
```

### **Exemple pour récupérer tous les produits**
```sh
curl -X GET http://localhost:4000/esb/produits
```

### **Exemple pour mettre à jour un produit**
```sh
curl -X PUT http://localhost:4000/esb/produits/1 \
     -H "Content-Type: application/json" \
     -d '{"nom":"Laptop Gamer","prix":1500,"stock":5}'
```

### **Exemple pour supprimer un produit**
```sh
curl -X DELETE http://localhost:4000/esb/produits/1
```

### **Exemple pour rechercher un produit par nom**
```sh
curl -X GET "http://localhost:4000/esb/produits/recherche?nom=Laptop"
```

---


## **Livraisons**

### **1. Chercher une commande par nom de client**
- **Méthode :** `GET`
- **URL :** `http://localhost:4000/esb/livraisons/client/:nom`
- **Exemple avec cURL :**
```sh
curl -X GET http://localhost:4000/esb/livraisons/client/John
```

### **2. Supprimer une commande par ID**
- **Méthode :** `DELETE`
- **URL :** `http://localhost:4000/esb/livraisons/:id`
- **Exemple avec cURL :**
```sh
curl -X DELETE http://localhost:4000/esb/livraisons/1
```

### **3. Supprimer toutes les commandes**
- **Méthode :** `DELETE`
- **URL :** `http://localhost:4000/esb/livraisons`
- **Exemple avec cURL :**
```sh
curl -X DELETE http://localhost:4000/esb/livraisons
```
### **4. Get all commande**
- **Méthode :** `GET`
- **URL :** `http://localhost:4000/esb/livraisons/`
- **Exemple avec cURL :**
```sh
curl -X GET http://localhost:4000/esb/livraisons/

-----------------------------------------------------------------------------------------------------------------------------
Microservice = serveur php qui permet au client de passer une commande
Lisez son fichier readme pour  le tester
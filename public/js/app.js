document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    fetchDeliveries();

    // Gestion des formulaires
    document.getElementById('add-product-form').addEventListener('submit', addProduct);
    document.getElementById('search-product-form').addEventListener('submit', searchProduct);
    document.getElementById('add-delivery-form').addEventListener('submit', addDelivery);
    document.getElementById('search-delivery-form').addEventListener('submit', searchDelivery);
});

// Fonction pour récupérer les produits
async function fetchProducts() {
    try {
        const response = await fetch('/esb/produits');
        const products = await response.json();
        const productList = document.getElementById('product-list');
        productList.innerHTML = products.map(product => `
            <div class="bg-white p-4 rounded-lg shadow-md">
                <h3 class="text-xl font-bold">${product.nom}</h3>
                <p class="text-gray-700">Prix: ${product.prix} €</p>
                <img src="${product.image}" alt="${product.nom}" class="mt-2 w-full h-32 object-cover">
                <button onclick="deleteProduct(${product.id})" class="mt-2 w-full bg-red-500 text-white p-2 rounded">Supprimer</button>
            </div>
        `).join('');
    } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
    }
}

// Fonction pour ajouter un produit
async function addProduct(event) {
    event.preventDefault();
    const product = {
        nom: document.getElementById('product-name').value,
        prix: document.getElementById('product-price').value,
        image: document.getElementById('product-image').value
    };

    try {
        const response = await fetch('/esb/produits', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        });
        if (response.ok) {
            fetchProducts(); // Rafraîchir la liste des produits
        }
    } catch (error) {
        console.error('Erreur lors de l’ajout du produit:', error);
    }
}

// Fonction pour rechercher un produit
async function searchProduct(event) {
    event.preventDefault();
    const nom = document.getElementById('search-product-name').value;

    try {
        const response = await fetch(`/esb/produits/recherche?nom=${nom}`);
        const products = await response.json();
        const productList = document.getElementById('product-list');
        productList.innerHTML = products.map(product => `
            <div class="bg-white p-4 rounded-lg shadow-md">
                <h3 class="text-xl font-bold">${product.nom}</h3>
                <p class="text-gray-700">Prix: ${product.prix} €</p>
                <img src="${product.image}" alt="${product.nom}" class="mt-2 w-full h-32 object-cover">
                <button onclick="deleteProduct(${product.id})" class="mt-2 w-full bg-red-500 text-white p-2 rounded">Supprimer</button>
            </div>
        `).join('');
    } catch (error) {
        console.error('Erreur lors de la recherche du produit:', error);
    }
}

// Fonction pour supprimer un produit
async function deleteProduct(id) {
    try {
        const response = await fetch(`/esb/produits/${id}`, { method: 'DELETE' });
        if (response.ok) {
            fetchProducts(); // Rafraîchir la liste des produits
        }
    } catch (error) {
        console.error('Erreur lors de la suppression du produit:', error);
    }
}

// Fonction pour récupérer les livraisons
async function fetchDeliveries() {
    try {
        const response = await fetch('/esb/livraisons');
        const deliveries = await response.json();
        const deliveryList = document.getElementById('delivery-list');
        deliveryList.innerHTML = deliveries.map(delivery => `
            <div class="bg-white p-4 rounded-lg shadow-md">
                <h3 class="text-xl font-bold">${delivery.client}</h3>
                <p class="text-gray-700">Adresse: ${delivery.adresse}</p>
                <p class="text-gray-700">Produit: ${delivery.produit}</p>
                <p class="text-gray-700">Quantité: ${delivery.quantite}</p>
                <p class="text-gray-700">Statut: ${delivery.statut}</p>
                <button onclick="deleteDelivery(${delivery.id})" class="mt-2 w-full bg-red-500 text-white p-2 rounded">Supprimer</button>
            </div>
        `).join('');
    } catch (error) {
        console.error('Erreur lors de la récupération des livraisons:', error);
    }
}

// Fonction pour ajouter une livraison
async function addDelivery(event) {
    event.preventDefault();
    const delivery = {
        client: document.getElementById('delivery-client').value,
        adresse: document.getElementById('delivery-address').value,
        produit: document.getElementById('delivery-product').value,
        quantite: document.getElementById('delivery-quantity').value,
        statut: document.getElementById('delivery-status').value
    };

    try {
        const response = await fetch('/esb/livraisons', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(delivery)
        });
        if (response.ok) {
            fetchDeliveries(); // Rafraîchir la liste des livraisons
        }
    } catch (error) {
        console.error('Erreur lors de l’ajout de la livraison:', error);
    }
}

// Fonction pour rechercher une livraison par client
async function searchDelivery(event) {
    event.preventDefault();
    const client = document.getElementById('search-delivery-client').value;

    try {
        const response = await fetch(`/esb/livraisons/client/${client}`);
        const deliveries = await response.json();
        const deliveryList = document.getElementById('delivery-list');
        deliveryList.innerHTML = deliveries.map(delivery => `
            <div class="bg-white p-4 rounded-lg shadow-md">
                <h3 class="text-xl font-bold">${delivery.client}</h3>
                <p class="text-gray-700">Adresse: ${delivery.adresse}</p>
                <p class="text-gray-700">Produit: ${delivery.produit}</p>
                <p class="text-gray-700">Quantité: ${delivery.quantite}</p>
                <p class="text-gray-700">Statut: ${delivery.statut}</p>
                <button onclick="deleteDelivery(${delivery.id})" class="mt-2 w-full bg-red-500 text-white p-2 rounded">Supprimer</button>
            </div>
        `).join('');
    } catch (error) {
        console.error('Erreur lors de la recherche de la livraison:', error);
    }
}

// Fonction pour supprimer une livraison
async function deleteDelivery(id) {
    try {
        const response = await fetch(`/esb/livraisons/${id}`, { method: 'DELETE' });
        if (response.ok) {
            fetchDeliveries(); // Rafraîchir la liste des livraisons
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de la livraison:', error);
    }
}
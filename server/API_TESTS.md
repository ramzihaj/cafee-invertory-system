# 🧪 Tests API - Café Inventory System

## Configuration

**Base URL**: `http://localhost:5000`

Après chaque requête de login, copiez le `token` retourné et utilisez-le dans le header `Authorization: Bearer TOKEN` pour les autres requêtes.

---

## 1️⃣ Authentification

### Login Admin
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@cafe.com",
  "password": "password123"
}
```

**Réponse attendue**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "Admin Café",
      "email": "admin@cafe.com",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Obtenir mon profil
```http
GET /api/auth/me
Authorization: Bearer VOTRE_TOKEN
```

---

## 2️⃣ Dashboard

### Statistiques globales
```http
GET /api/dashboard/stats
Authorization: Bearer VOTRE_TOKEN
```

**Réponse attendue**: Statistiques complètes avec produits, alertes, mouvements, etc.

### Statistiques par période
```http
GET /api/dashboard/period-stats?period=week
Authorization: Bearer VOTRE_TOKEN
```

Paramètres `period`: `day`, `week`, `month`, `year`

---

## 3️⃣ Produits

### Liste tous les produits
```http
GET /api/products
Authorization: Bearer VOTRE_TOKEN
```

### Produits en stock bas (alertes)
```http
GET /api/products/alerts/low-stock
Authorization: Bearer VOTRE_TOKEN
```

### Rechercher des produits
```http
GET /api/products?search=café
Authorization: Bearer VOTRE_TOKEN
```

### Filtrer par catégorie
```http
GET /api/products?category=1
Authorization: Bearer VOTRE_TOKEN
```

### Détails d'un produit
```http
GET /api/products/1
Authorization: Bearer VOTRE_TOKEN
```

### Créer un nouveau produit (Admin/Manager)
```http
POST /api/products
Authorization: Bearer VOTRE_TOKEN
Content-Type: application/json

{
  "name": "Espresso Intenso",
  "categoryId": 1,
  "supplierId": 1,
  "description": "Café espresso très corsé",
  "unit": "kg",
  "currentStock": 20,
  "minStock": 5,
  "maxStock": 50,
  "unitPrice": 30.00
}
```

### Mettre à jour un produit (Admin/Manager)
```http
PUT /api/products/1
Authorization: Bearer VOTRE_TOKEN
Content-Type: application/json

{
  "name": "Grains Arabica Premium",
  "unitPrice": 28.00,
  "minStock": 15
}
```

### Supprimer un produit (Admin)
```http
DELETE /api/products/1
Authorization: Bearer VOTRE_TOKEN
```

---

## 4️⃣ Catégories

### Liste toutes les catégories
```http
GET /api/categories
Authorization: Bearer VOTRE_TOKEN
```

### Créer une catégorie (Admin/Manager)
```http
POST /api/categories
Authorization: Bearer VOTRE_TOKEN
Content-Type: application/json

{
  "name": "Chocolats",
  "description": "Chocolats chauds et poudres",
  "icon": "chocolate",
  "color": "#8B4513"
}
```

---

## 5️⃣ Fournisseurs

### Liste tous les fournisseurs
```http
GET /api/suppliers
Authorization: Bearer VOTRE_TOKEN
```

### Détails d'un fournisseur
```http
GET /api/suppliers/1
Authorization: Bearer VOTRE_TOKEN
```

### Créer un fournisseur (Admin/Manager)
```http
POST /api/suppliers
Authorization: Bearer VOTRE_TOKEN
Content-Type: application/json

{
  "name": "Café du Monde",
  "company": "Café du Monde SAS",
  "email": "contact@cafedumonde.fr",
  "phone": "0142424242",
  "addressStreet": "10 Rue de la Paix",
  "addressCity": "Paris",
  "addressPostalCode": "75002",
  "addressCountry": "France",
  "notes": "Livraison le mardi et jeudi"
}
```

### Mettre à jour un fournisseur (Admin/Manager)
```http
PUT /api/suppliers/1
Authorization: Bearer VOTRE_TOKEN
Content-Type: application/json

{
  "phone": "0145678901",
  "notes": "Nouveau numéro de téléphone"
}
```

---

## 6️⃣ Mouvements de Stock

### Liste tous les mouvements
```http
GET /api/movements
Authorization: Bearer VOTRE_TOKEN
```

### Filtrer les mouvements
```http
GET /api/movements?type=entry&limit=20
Authorization: Bearer VOTRE_TOKEN
```

Paramètres disponibles:
- `type`: `entry`, `exit`, `adjustment`, `return`
- `product`: ID du produit
- `startDate`: Date de début (ISO)
- `endDate`: Date de fin (ISO)
- `limit`: Nombre max de résultats (défaut: 100)

### Historique d'un produit
```http
GET /api/movements/product/1
Authorization: Bearer VOTRE_TOKEN
```

### Enregistrer une ENTRÉE de stock (achat)
```http
POST /api/movements
Authorization: Bearer VOTRE_TOKEN
Content-Type: application/json

{
  "productId": 1,
  "type": "entry",
  "quantity": 50,
  "reason": "purchase",
  "supplierId": 1,
  "unitPrice": 25.50,
  "notes": "Commande n°12345"
}
```

### Enregistrer une SORTIE de stock (vente)
```http
POST /api/movements
Authorization: Bearer VOTRE_TOKEN
Content-Type: application/json

{
  "productId": 1,
  "type": "exit",
  "quantity": 10,
  "reason": "sale",
  "notes": "Vente du jour"
}
```

### Ajustement de stock (inventaire)
```http
POST /api/movements
Authorization: Bearer VOTRE_TOKEN
Content-Type: application/json

{
  "productId": 1,
  "type": "adjustment",
  "quantity": 45,
  "reason": "inventory",
  "notes": "Correction après inventaire physique"
}
```

### Déclaration de perte
```http
POST /api/movements
Authorization: Bearer VOTRE_TOKEN
Content-Type: application/json

{
  "productId": 13,
  "type": "exit",
  "quantity": 5,
  "reason": "waste",
  "notes": "Croissants périmés"
}
```

---

## 7️⃣ Tests de Permissions

### Tentative d'accès sans token
```http
GET /api/products
```
**Résultat attendu**: `401 Unauthorized`

### Employé essayant de créer un produit
```http
# 1. Se connecter en tant qu'employé
POST /api/auth/login
Content-Type: application/json

{
  "email": "employee@cafe.com",
  "password": "password123"
}

# 2. Essayer de créer un produit
POST /api/products
Authorization: Bearer TOKEN_EMPLOYEE
Content-Type: application/json

{
  "name": "Test",
  "categoryId": 1
}
```
**Résultat attendu**: `403 Forbidden`

---

## 📊 Résumé des Permissions

| Action | Admin | Manager | Employé |
|--------|-------|---------|---------|
| Voir produits/stats | ✅ | ✅ | ✅ |
| Créer produit | ✅ | ✅ | ❌ |
| Modifier produit | ✅ | ✅ | ❌ |
| Supprimer produit | ✅ | ❌ | ❌ |
| Mouvements stock | ✅ | ✅ | ✅ |
| Gérer fournisseurs | ✅ | ✅ | ❌ |
| Gérer catégories | ✅ | ✅ | ❌ |

---

## 🔍 Codes de Statut HTTP

- `200` - Succès
- `201` - Créé avec succès
- `400` - Requête invalide
- `401` - Non authentifié
- `403` - Non autorisé (permissions insuffisantes)
- `404` - Ressource non trouvée
- `500` - Erreur serveur

---

## 💡 Conseils

1. **Toujours copier le token** après le login et l'utiliser dans les headers
2. **Utilisez Thunder Client** (VS Code) ou **Postman** pour tester facilement
3. **Vérifiez les permissions** selon votre rôle
4. **Le seeding** génère 50 mouvements aléatoires pour les tests

Bon testing! 🚀

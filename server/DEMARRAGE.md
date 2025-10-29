# 🚀 Guide de Démarrage Rapide

## 1️⃣ Configuration de l'environnement

Créez un fichier `.env` à la racine du dossier `server` avec le contenu suivant :

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration (SQLite)
DB_PATH=./database/cafe_inventory.sqlite

# JWT Configuration
JWT_SECRET=votre_secret_jwt_super_securise_changez_moi
JWT_EXPIRE=7d

# Frontend URL
CLIENT_URL=http://localhost:3000
```

**IMPORTANT**: Changez `JWT_SECRET` par une valeur unique et sécurisée !

## 2️⃣ Installation des dépendances

Les dépendances sont déjà installées. Si vous avez des problèmes, relancez :

```bash
cd server
npm install
```

## 3️⃣ Initialiser la base de données

Créez la base de données et ajoutez des données de test :

```bash
npm run seed
```

Cela va créer :
- ✅ 3 utilisateurs (admin, manager, employé)
- ✅ 8 catégories de produits
- ✅ 4 fournisseurs
- ✅ 26 produits
- ✅ 50 mouvements de stock

## 4️⃣ Démarrer le serveur

**Mode développement (avec auto-reload)** :
```bash
npm run dev
```

**Mode production** :
```bash
npm start
```

Le serveur démarrera sur **http://localhost:5000**

## 5️⃣ Tester l'API

### Connexion (Login)
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@cafe.com",
  "password": "password123"
}
```

### Obtenir tous les produits
```bash
GET http://localhost:5000/api/products
Authorization: Bearer VOTRE_TOKEN
```

### Dashboard statistiques
```bash
GET http://localhost:5000/api/dashboard/stats
Authorization: Bearer VOTRE_TOKEN
```

## 👤 Comptes de test

Après le seed, vous pouvez vous connecter avec :

| Email | Mot de passe | Rôle |
|-------|--------------|------|
| admin@cafe.com | password123 | Administrateur |
| manager@cafe.com | password123 | Manager |
| employee@cafe.com | password123 | Employé |

## 📁 Structure de la base de données

La base de données SQLite sera créée dans : `server/database/cafe_inventory.sqlite`

## 🔧 Commandes utiles

```bash
# Démarrer le serveur en dev
npm run dev

# Démarrer le serveur en production
npm start

# Réinitialiser et remplir la base de données
npm run seed
```

## 🐛 Résolution de problèmes

### La base de données ne se crée pas
- Vérifiez que le dossier `database/` existe
- Vérifiez les permissions du dossier
- Supprimez le fichier `.sqlite` et relancez `npm run seed`

### Erreur "Token invalide"
- Vérifiez que le `JWT_SECRET` est bien défini dans `.env`
- Reconnectez-vous pour obtenir un nouveau token

### Port 5000 déjà utilisé
- Changez le port dans `.env` : `PORT=5001`

## 📚 Endpoints disponibles

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Profil utilisateur
- `PUT /api/auth/profile` - Mise à jour du profil
- `PUT /api/auth/password` - Changement de mot de passe

### Produits
- `GET /api/products` - Liste des produits
- `GET /api/products/:id` - Détails d'un produit
- `POST /api/products` - Créer un produit (Admin/Manager)
- `PUT /api/products/:id` - Modifier un produit (Admin/Manager)
- `DELETE /api/products/:id` - Supprimer un produit (Admin)
- `GET /api/products/alerts/low-stock` - Produits en stock bas

### Catégories
- `GET /api/categories` - Liste des catégories
- `GET /api/categories/:id` - Détails d'une catégorie
- `POST /api/categories` - Créer une catégorie (Admin/Manager)
- `PUT /api/categories/:id` - Modifier une catégorie (Admin/Manager)
- `DELETE /api/categories/:id` - Supprimer une catégorie (Admin)

### Fournisseurs
- `GET /api/suppliers` - Liste des fournisseurs
- `GET /api/suppliers/:id` - Détails d'un fournisseur
- `POST /api/suppliers` - Créer un fournisseur (Admin/Manager)
- `PUT /api/suppliers/:id` - Modifier un fournisseur (Admin/Manager)
- `DELETE /api/suppliers/:id` - Supprimer un fournisseur (Admin)

### Mouvements
- `GET /api/movements` - Liste des mouvements
- `POST /api/movements` - Créer un mouvement
- `GET /api/movements/product/:productId` - Historique d'un produit

### Dashboard
- `GET /api/dashboard/stats` - Statistiques globales
- `GET /api/dashboard/period-stats` - Statistiques par période

## ✨ Prochaines étapes

1. ✅ Backend fonctionnel avec SQLite
2. ⏳ Créer le frontend React
3. ⏳ Implémenter l'export PDF/Excel
4. ⏳ Ajouter les notifications email

Bon développement ! ☕

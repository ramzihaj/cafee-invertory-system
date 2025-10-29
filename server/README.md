# ☕ Café Inventory System - Backend

Système de gestion de stock pour café utilisant **Node.js**, **Express**, **Sequelize** et **SQLite**.

## 🚀 Installation

### 1. Installer les dépendances
```bash
npm install
```

### 2. Configurer l'environnement
Créez un fichier `.env` à la racine du dossier `server` en copiant `.env.example` :
```bash
cp .env.example .env
```

Modifiez les valeurs dans `.env` selon vos besoins :
```env
PORT=5000
NODE_ENV=development
DB_PATH=./database/cafe_inventory.sqlite
JWT_SECRET=votre_secret_jwt_unique_et_securise
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

### 3. Démarrer le serveur

**Mode développement (avec auto-reload) :**
```bash
npm run dev
```

**Mode production :**
```bash
npm start
```

### 4. Initialiser la base de données avec des données de test (optionnel)
```bash
npm run seed
```

## 📁 Structure du projet

```
server/
├── config/          # Configuration (database, etc.)
├── models/          # Modèles Sequelize
├── routes/          # Routes API
├── controllers/     # Logique métier
├── middleware/      # Middleware (auth, validation, etc.)
├── utils/           # Utilitaires
├── seeders/         # Données de test
├── database/        # Fichiers SQLite
└── index.js         # Point d'entrée
```

## 🔌 API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Profil utilisateur

### Produits
- `GET /api/products` - Liste des produits
- `POST /api/products` - Créer un produit
- `GET /api/products/:id` - Détails d'un produit
- `PUT /api/products/:id` - Modifier un produit
- `DELETE /api/products/:id` - Supprimer un produit

### Fournisseurs
- `GET /api/suppliers` - Liste des fournisseurs
- `POST /api/suppliers` - Créer un fournisseur
- `PUT /api/suppliers/:id` - Modifier un fournisseur
- `DELETE /api/suppliers/:id` - Supprimer un fournisseur

### Mouvements de stock
- `GET /api/movements` - Historique des mouvements
- `POST /api/movements` - Enregistrer un mouvement

### Dashboard & Rapports
- `GET /api/dashboard/stats` - Statistiques globales
- `GET /api/reports/stock` - Rapport de stock
- `GET /api/reports/sales` - Rapport des ventes

## 🗄️ Base de données

Le système utilise **SQLite** comme base de données. Le fichier est créé automatiquement dans `database/cafe_inventory.sqlite`.

Pour réinitialiser la base de données, supprimez simplement le fichier `.sqlite` et redémarrez le serveur.

## 👤 Utilisateurs par défaut (après seed)

- **Admin**: admin@cafe.com / password123
- **Manager**: manager@cafe.com / password123
- **Employee**: employee@cafe.com / password123

## 🛠️ Technologies

- **Express** - Framework web
- **Sequelize** - ORM pour SQL
- **SQLite** - Base de données
- **JWT** - Authentification
- **bcryptjs** - Hachage des mots de passe
- **express-validator** - Validation des données

## 📝 Licence

ISC

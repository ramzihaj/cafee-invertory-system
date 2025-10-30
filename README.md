# ☕ Café Inventory System

Système complet de gestion de stock pour café, développé avec la stack **MERN** (SQLite remplace MongoDB).

![Stack](https://img.shields.io/badge/Stack-MERN-green)
![Database](https://img.shields.io/badge/Database-SQLite-blue)
![Frontend](https://img.shields.io/badge/Frontend-React%2018-61dafb)
![Backend](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933)

## 🎯 Fonctionnalités Principales

### 🔐 Système de Rôles Multi-Niveaux
✅ **Admin** - Gestion complète + utilisateurs + statistiques globales  
✅ **Manager** - Gestion stock + fournisseurs + rapports  
✅ **Employé** - Prise de commandes + tables assignées  

### 📊 Dashboards Personnalisés
✅ **Dashboard Admin** - KPIs, performance employés, chiffre d'affaires  
✅ **Dashboard Manager** - Stock, alertes, top produits, commandes  
✅ **Dashboard Employé** - Commandes du jour, tables, ventes personnelles  

### 🛒 Gestion des Commandes
✅ **Prise de commandes** - Interface intuitive pour employés  
✅ **Panier intelligent** - Vérification stock en temps réel  
✅ **Gestion des tables** - Attribution et statuts  
✅ **Suivi des commandes** - Statuts multiples (pending → paid)  

### 📦 Gestion Complète du Stock
✅ **Produits** - CRUD complet avec 16 produits de démo  
✅ **Catégories** - 5 catégories avec couleurs personnalisées  
✅ **Fournisseurs** - 3 fournisseurs configurés  
✅ **Mouvements** - Entrées/Sorties/Ajustements/Retours  
✅ **Alertes** - Notifications stock faible automatiques  

### 👥 Gestion des Utilisateurs
✅ **Création d'utilisateurs** - Par l'admin uniquement  
✅ **Système de coupons** - Codes d'accès uniques pour inscription  
✅ **Inscription sécurisée** - Avec validation de coupon  
✅ **Statistiques** - Performance par employé  

### 🎨 Interface Moderne
✅ **Modèle 3D** - Tasse de café animée en CSS pur  
✅ **Design responsive** - Mobile, Tablet, Desktop  
✅ **Animations fluides** - Transitions et effets  
✅ **Navigation par rôle** - Menu adapté aux permissions  

### 📈 Rapports & Analytics
✅ **Statistiques en temps réel** - Vue d'ensemble complète  
✅ **Export CSV** - Téléchargement des rapports  
✅ **Graphiques** - Visualisation des données  
✅ **Top produits** - Classement par ventes  

## 📸 Captures d'écran

(L'application est prête à être testée - voir section Démarrage Rapide)

## 🚀 Démarrage Rapide

### Prérequis
- Node.js >= 16.x
- npm >= 8.x
- PowerShell (Windows)

### 🎯 Installation Automatique (Recommandé)

**Méthode la plus simple - Un seul script pour tout configurer !**

```powershell
# Depuis le dossier racine du projet
.\setup.ps1
```

Ce script va automatiquement :
- ✅ Vérifier les dépendances (Node.js, npm)
- ✅ Installer toutes les dépendances Backend & Frontend
- ✅ Initialiser la base de données avec données de démo
- ✅ Démarrer les deux serveurs (Backend + Frontend)
- ✅ Ouvrir l'application dans votre navigateur

### 📝 Installation Manuelle

Si vous préférez installer manuellement :

1. **Cloner le projet** (si applicable)
```bash
git clone <repo-url>
cd "Invertory Systeme"
```

2. **Backend - Installation et démarrage**
```bash
cd server
npm install
node seeders/demo-data.js    # Initialiser avec 16 produits de démo
npm run dev                   # Port 5000
```

3. **Frontend - Installation et démarrage** (nouveau terminal)
```bash
cd client
npm install
npm run dev     # Port 5173
```

4. **Accéder à l'application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

### 👤 Comptes de Test

| Email | Mot de passe | Rôle | Accès |
|-------|--------------|------|-------|
| admin@cafe.com | password123 | Admin | Accès complet + Utilisateurs |
| manager@cafe.com | password123 | Manager | Stock + Fournisseurs + Rapports |
| employee@cafe.com | password123 | Employé | Commandes + Tables assignées |
| sophie@cafe.com | password123 | Employé | Commandes + Tables assignées |

### 📊 Données de Démonstration

Après le seeding, vous aurez :
- 👥 **4 utilisateurs** (1 Admin, 1 Manager, 2 Employés)
- 📂 **5 catégories** (Boissons chaudes/froides, Pâtisseries, Snacks, Desserts)
- 🚚 **3 fournisseurs** configurés
- ☕ **16 produits** variés avec stocks
- 🪑 **8 tables** configurées et assignées

## 📁 Structure du Projet

```
Invertory Systeme/
├── server/                 # Backend Node.js + Express
│   ├── config/            # Configuration DB
│   ├── models/            # Modèles Sequelize
│   ├── controllers/       # Logique métier
│   ├── routes/            # Routes API
│   ├── middleware/        # Auth & validation
│   ├── seeders/           # Données de test
│   ├── database/          # Fichiers SQLite
│   └── index.js           # Point d'entrée
│
├── client/                 # Frontend React + Vite
│   ├── src/
│   │   ├── components/    # Composants réutilisables
│   │   ├── pages/         # Pages principales
│   │   ├── store/         # State management
│   │   ├── lib/           # Utilitaires
│   │   └── App.jsx        # Routes
│   ├── index.html
│   └── vite.config.js
│
└── README.md
```

## 🛠️ Technologies Utilisées

### Backend
- **Node.js** + **Express** - Serveur API REST
- **Sequelize** - ORM pour SQLite
- **SQLite** - Base de données légère
- **JWT** - Authentification sécurisée
- **bcryptjs** - Hachage des mots de passe

### Frontend
- **React 18** - Bibliothèque UI moderne
- **Vite** - Build tool ultra-rapide
- **TailwindCSS** - Framework CSS utilitaire
- **React Query** - Gestion de données serveur
- **Zustand** - State management léger
- **Lucide React** - Icônes
- **React Router v6** - Navigation
- **Axios** - Client HTTP

## 📚 Documentation

### 📖 Guides Complets
- **[GUIDE_COMPLET.md](GUIDE_COMPLET.md)** - Guide d'utilisation détaillé par rôle
- **[IMPLEMENTATION.md](IMPLEMENTATION.md)** - Documentation technique complète
- **[GUIDE_RAPIDE.md](GUIDE_RAPIDE.md)** - Démarrage rapide

### 🛠️ Scripts Utiles
- `.\setup.ps1` - Configuration et lancement automatique
- `.\start.ps1` - Démarrage rapide des serveurs
- `npm run seed` - Réinitialiser la base de données

## 🔌 API Endpoints

### 🔐 Authentification
- `POST /api/auth/login` - Connexion
- `POST /api/auth/register` - Inscription (avec coupon)
- `GET /api/auth/me` - Profil utilisateur
- `PUT /api/auth/profile` - Modifier profil
- `PUT /api/auth/password` - Changer mot de passe

### 👥 Utilisateurs (Admin)
- `GET /api/users` - Liste des utilisateurs
- `POST /api/users` - Créer un utilisateur
- `PUT /api/users/:id` - Modifier un utilisateur
- `DELETE /api/users/:id` - Désactiver un utilisateur
- `GET /api/users/:id/stats` - Statistiques utilisateur

### 🎫 Coupons (Admin)
- `POST /api/coupons` - Générer un coupon
- `GET /api/coupons` - Liste des coupons
- `POST /api/coupons/verify` - Vérifier un coupon (public)
- `PUT /api/coupons/use` - Utiliser un coupon (public)
- `DELETE /api/coupons/:id` - Supprimer un coupon

### 🛒 Commandes
- `POST /api/orders` - Créer une commande (Employé)
- `GET /api/orders` - Liste des commandes (filtrée par rôle)
- `GET /api/orders/:id` - Détails d'une commande
- `PUT /api/orders/:id/status` - Mettre à jour le statut

### 🪑 Tables (Admin/Manager)
- `GET /api/tables` - Liste des tables
- `POST /api/tables` - Créer une table
- `PUT /api/tables/:id` - Modifier une table
- `DELETE /api/tables/:id` - Désactiver une table

### ☕ Produits (Admin/Manager)
- `GET /api/products` - Liste des produits
- `GET /api/products/:id` - Détails produit
- `POST /api/products` - Créer un produit
- `PUT /api/products/:id` - Modifier un produit
- `DELETE /api/products/:id` - Supprimer un produit
- `GET /api/products/alerts/low-stock` - Alertes stock bas

### 📂 Catégories (Admin/Manager)
- `GET /api/categories` - Liste des catégories
- `POST /api/categories` - Créer une catégorie
- `PUT /api/categories/:id` - Modifier une catégorie
- `DELETE /api/categories/:id` - Supprimer une catégorie

### 🚚 Fournisseurs (Admin/Manager)
- `GET /api/suppliers` - Liste des fournisseurs
- `POST /api/suppliers` - Créer un fournisseur
- `PUT /api/suppliers/:id` - Modifier un fournisseur
- `DELETE /api/suppliers/:id` - Désactiver un fournisseur

### 📊 Mouvements (Admin/Manager)
- `GET /api/movements` - Historique des mouvements
- `POST /api/movements` - Enregistrer un mouvement
- `GET /api/movements/product/:id` - Historique d'un produit

### 📈 Dashboard & Rapports
- `GET /api/dashboard/stats` - Statistiques globales
- `GET /api/dashboard/period-stats` - Statistiques par période
- `GET /api/reports/export` - Export CSV

### 🔒 Permissions
- **Public**: Vérification de coupon, inscription
- **Employé**: Commandes, tables assignées
- **Manager**: + Stock, fournisseurs, catégories, rapports
- **Admin**: + Utilisateurs, tous les paramètres

[Documentation détaillée disponible dans GUIDE_COMPLET.md](GUIDE_COMPLET.md)

## 🎨 Design

**Palette de Couleurs**
- Marron café (#8B4513) - Couleur principale
- Beige/Crème (#F5EDE0) - Couleur secondaire
- Vert (#10B981) - Succès/Entrées
- Rouge (#EF4444) - Alertes/Sorties
- Blanc (#FFFFFF) - Fond

**Typographie**
- Police: Inter (Google Fonts)
- Style: Moderne, épuré, lisible

## 🔐 Sécurité

- ✅ Authentification JWT avec expiration
- ✅ Mots de passe hachés avec bcrypt
- ✅ Validation des données côté serveur
- ✅ Protection des routes par rôle
- ✅ Headers CORS configurés

## 📊 Données de Test Complètes

Après l'exécution du seeder (`node seeders/demo-data.js`), la base contient :

### 👥 Utilisateurs (4)
- **Admin Principal** (admin@cafe.com) - Accès complet
- **Manager Dupont** (manager@cafe.com) - Gestion stock
- **Serveur Martin** (employee@cafe.com) - Commandes
- **Serveur Sophie** (sophie@cafe.com) - Commandes

### 📂 Catégories (5)
- Boissons Chaudes (#8B4513)
- Boissons Froides (#4A90E2)
- Pâtisseries (#F4A460)
- Snacks Salés (#90EE90)
- Desserts (#FFB6C1)

### 🚚 Fournisseurs (3)
- Torréfaction Parisienne (Café)
- Boulangerie Artisanale (Viennoiseries)
- Produits Laitiers Bio (Lait, crème)

### ☕ Produits (16)
Stocks configurés avec prix, SKU, codes-barres, et seuils min/max :
- 5 Boissons chaudes (Espresso, Cappuccino, Latte, Thé, Chocolat)
- 3 Boissons froides (Café glacé, Smoothie, Jus d'orange)
- 3 Pâtisseries (Croissant, Pain au chocolat, Muffin)
- 2 Snacks (Sandwich, Quiche)
- 3 Desserts (Tiramisu, Tarte citron, Brownie)

### 🪑 Tables (8)
- Capacités variées (2 à 8 places)
- Tables assignées aux employés
- Statuts disponible/occupé/réservé

## 🐛 Résolution de Problèmes

### Le serveur ne démarre pas
- Vérifiez que le port 5000 est libre
- Assurez-vous que le fichier `.env` existe dans `server/`
- Vérifiez les logs d'erreur dans le terminal

### Le frontend ne se connecte pas au backend
- Vérifiez que le serveur backend est démarré
- Le proxy Vite redirige `/api` vers `localhost:5000`
- Vérifiez la console du navigateur pour les erreurs

### Base de données corrompue
```bash
cd server
rm database/*.sqlite   # Supprimer la base
npm run seed          # Recréer avec données de test
```

## 🚀 Déploiement

### Backend
- Utiliser un service comme Render, Railway, ou Heroku
- Variables d'environnement à configurer (voir `.env.example`)

### Frontend
- Build: `npm run build` dans `client/`
- Déployer sur Vercel, Netlify, ou serveur statique
- Configurer la variable `VITE_API_URL`

## ✅ Fonctionnalités Complétées

- [x] ✅ Système de rôles multi-niveaux (Admin/Manager/Employé)
- [x] ✅ Dashboards personnalisés par rôle
- [x] ✅ Gestion complète des utilisateurs avec coupons
- [x] ✅ Prise de commandes avec panier intelligent
- [x] ✅ Gestion des tables et attribution
- [x] ✅ 16 produits de démonstration
- [x] ✅ Modèle 3D de café animé (CSS pur)
- [x] ✅ Export CSV des rapports
- [x] ✅ Vérification de stock en temps réel
- [x] ✅ Interface responsive et moderne
- [x] ✅ Authentification JWT sécurisée
- [x] ✅ Scripts de démarrage automatique

## 🚀 Améliorations Futures Suggérées

### 📊 Analytics & Reporting
- [ ] Graphiques avancés (Recharts/Chart.js)
- [ ] Export PDF professionnel
- [ ] Rapports financiers détaillés
- [ ] Prévisions de stock (Machine Learning)

### 🔔 Notifications & Communication
- [ ] Notifications push en temps réel (WebSocket)
- [ ] Alertes email automatiques
- [ ] SMS pour commandes prêtes
- [ ] Notifications sur stock critique

### 💳 Paiements & Caisse
- [ ] Intégration paiement (Stripe/PayPal)
- [ ] Gestion de caisse quotidienne
- [ ] Tickets de caisse imprimables
- [ ] Remises et promotions

### 📱 Mobile & UX
- [ ] Application mobile (React Native)
- [ ] Mode sombre
- [ ] PWA (Progressive Web App)
- [ ] QR Codes pour tables
- [ ] Commande client via QR Code

### 🌐 Fonctionnalités Avancées
- [ ] Multi-restaurant/Multi-site
- [ ] Programme de fidélité client
- [ ] Réservations en ligne
- [ ] Menu digital pour clients
- [ ] Intégration réseaux sociaux

### 🔧 Technique
- [ ] Tests unitaires et E2E
- [ ] CI/CD pipeline
- [ ] Docker containerization
- [ ] Backup automatique base de données
- [ ] Multi-langue (i18n)
- [ ] Logs et monitoring (Sentry)

## 👥 Contributeurs

Développé par Cascade AI pour la gestion de stock café.

## 📄 Licence

ISC

---

## 💡 Support

Pour toute question ou problème :
1. Consultez la documentation dans `/server/DEMARRAGE.md`
2. Vérifiez les tests API dans `/server/API_TESTS.md`
3. Examinez les logs du serveur et du navigateur

**Bon développement ! ☕**

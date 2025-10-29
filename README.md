# ☕ Café Inventory System

Système complet de gestion de stock pour café, développé avec la stack **MERN** (SQLite remplace MongoDB).

![Stack](https://img.shields.io/badge/Stack-MERN-green)
![Database](https://img.shields.io/badge/Database-SQLite-blue)
![Frontend](https://img.shields.io/badge/Frontend-React%2018-61dafb)
![Backend](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933)

## 🎯 Fonctionnalités Principales

✅ **Tableau de bord** - Vue globale du stock, alertes, et ventes  
✅ **Gestion des produits** - CRUD complet avec catégories  
✅ **Entrées/Sorties de stock** - Suivi des mouvements en temps réel  
✅ **Fournisseurs** - Gestion et historique des commandes  
✅ **Rapports & Statistiques** - Consommation et produits populaires  
✅ **Authentification** - 3 rôles (Admin, Manager, Employé)  
✅ **Alertes automatiques** - Notifications de réapprovisionnement  
✅ **Design moderne** - Interface responsive et intuitive  

## 📸 Captures d'écran

(L'application est prête à être testée - voir section Démarrage Rapide)

## 🚀 Démarrage Rapide

### Prérequis
- Node.js >= 16.x
- npm >= 8.x

### Installation Complète

1. **Cloner le projet** (si applicable)
```bash
git clone <repo-url>
cd "Invertory Systeme"
```

2. **Backend - Installation et démarrage**
```bash
cd server
npm install
npm run seed    # Initialiser la base de données avec données de test
npm run dev     # Démarrer le serveur (port 5000)
```

3. **Frontend - Installation et démarrage** (dans un nouveau terminal)
```bash
cd client
npm install
npm run dev     # Démarrer l'interface (port 3000)
```

4. **Accéder à l'application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Comptes de Test

| Email | Mot de passe | Rôle |
|-------|--------------|------|
| admin@cafe.com | password123 | Administrateur |
| manager@cafe.com | password123 | Manager |
| employee@cafe.com | password123 | Employé |

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

- [Guide de Démarrage Backend](server/DEMARRAGE.md)
- [Tests API](server/API_TESTS.md)
- [Documentation Frontend](client/README.md)

## 🔌 API Endpoints

### Authentification
- `POST /api/auth/login` - Connexion
- `POST /api/auth/register` - Inscription
- `GET /api/auth/me` - Profil utilisateur

### Produits
- `GET /api/products` - Liste des produits
- `POST /api/products` - Créer un produit (Admin/Manager)
- `PUT /api/products/:id` - Modifier un produit (Admin/Manager)
- `DELETE /api/products/:id` - Supprimer un produit (Admin)
- `GET /api/products/alerts/low-stock` - Produits en stock bas

### Mouvements
- `GET /api/movements` - Historique des mouvements
- `POST /api/movements` - Enregistrer un mouvement
- `GET /api/movements/product/:id` - Historique d'un produit

### Dashboard
- `GET /api/dashboard/stats` - Statistiques globales
- `GET /api/dashboard/period-stats` - Statistiques par période

[Voir la documentation complète des endpoints](server/API_TESTS.md)

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

## 📊 Données de Test

Après l'exécution de `npm run seed`, la base contient :
- 3 utilisateurs (admin, manager, employé)
- 8 catégories de produits
- 4 fournisseurs
- 26 produits variés
- 50 mouvements de stock historiques

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

## 📝 TODO / Améliorations Futures

- [ ] Export PDF/Excel fonctionnel
- [ ] Notifications email automatiques
- [ ] Graphiques avancés (Recharts)
- [ ] Module de commandes fournisseurs
- [ ] Historique d'inventaire complet
- [ ] Mode sombre
- [ ] Application mobile (React Native)
- [ ] Multi-langue (i18n)
- [ ] Backup automatique de la base

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

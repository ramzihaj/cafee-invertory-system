# ☕ Café Inventory System - Frontend

Interface web moderne pour la gestion de stock café, construite avec **React**, **Vite**, et **TailwindCSS**.

## 🚀 Démarrage Rapide

### 1. Installer les dépendances
```bash
npm install
```

### 2. Démarrer le serveur de développement
```bash
npm run dev
```

L'application sera accessible sur **http://localhost:3000**

### 3. Build pour production
```bash
npm run build
```

## 🎨 Technologies

- **React 18** - Bibliothèque UI
- **Vite** - Build tool ultra-rapide
- **React Router v6** - Navigation
- **TailwindCSS** - Styling moderne
- **React Query** - Gestion de données serveur
- **Zustand** - State management
- **Lucide React** - Icônes
- **React Hook Form** - Gestion de formulaires
- **React Hot Toast** - Notifications
- **date-fns** - Manipulation de dates

## 📁 Structure du Projet

```
client/
├── src/
│   ├── components/      # Composants réutilisables
│   │   └── Layout.jsx   # Layout principal avec sidebar
│   ├── pages/           # Pages de l'application
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Products.jsx
│   │   ├── Categories.jsx
│   │   ├── Suppliers.jsx
│   │   ├── Movements.jsx
│   │   ├── Reports.jsx
│   │   └── Profile.jsx
│   ├── store/           # State management (Zustand)
│   │   └── authStore.js
│   ├── lib/             # Utilitaires
│   │   └── api.js       # Configuration Axios
│   ├── App.jsx          # Routes principales
│   ├── main.jsx         # Point d'entrée
│   └── index.css        # Styles globaux
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## 🎯 Fonctionnalités

### ✅ Authentification
- Connexion sécurisée avec JWT
- 3 rôles : Admin, Manager, Employé
- Gestion de session automatique

### 📊 Dashboard
- Vue d'ensemble en temps réel
- Statistiques clés (produits, stock, mouvements)
- Top 5 produits vendus
- Alertes de stock bas

### 📦 Gestion des Produits
- Liste complète avec recherche
- Informations détaillées (stock, prix, catégorie)
- Alertes visuelles pour stock faible
- Filtres par catégorie et statut

### 🏷️ Catégories
- Vue en grille avec icônes colorées
- Compteur de produits par catégorie
- Interface intuitive

### 🚚 Fournisseurs
- Cartes détaillées par fournisseur
- Coordonnées complètes
- Statut actif/inactif
- Nombre de produits fournis

### 📈 Mouvements de Stock
- Historique complet des transactions
- Types : Entrées, Sorties, Ajustements, Retours
- Filtres par date et type
- Traçabilité complète (utilisateur, date)

### 📄 Rapports
- Génération de rapports PDF/Excel
- Rapport de stock
- Rapport des ventes
- Historique des mouvements

## 🎨 Design System

### Couleurs Principales
- **Coffee Brown**: `#8b5a33` - Thème café chaleureux
- **Cream**: `#f5ede0` - Tons neutres doux
- **Accents**: Vert (succès), Rouge (alertes), Bleu (info)

### Composants CSS Personnalisés
- `.btn` - Boutons avec variants (primary, secondary, danger, success)
- `.card` - Cartes avec ombre et bordure
- `.badge` - Tags colorés
- `.input` - Champs de formulaire stylisés

## 🔐 Comptes de Démonstration

| Email | Mot de passe | Rôle |
|-------|--------------|------|
| admin@cafe.com | password123 | Administrateur |
| manager@cafe.com | password123 | Manager |
| employee@cafe.com | password123 | Employé |

## 📱 Responsive Design

L'application est entièrement responsive :
- **Mobile First** - Optimisé pour téléphones
- **Tablette** - Adaptation automatique
- **Desktop** - Expérience complète

## 🔄 Proxy API

Vite est configuré pour proxyfier les requêtes API :
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`
- Les requêtes `/api/*` sont automatiquement redirigées vers le backend

## 🛠️ Commandes Disponibles

```bash
# Développement
npm run dev

# Build production
npm run build

# Preview du build
npm run preview
```

## 📝 Notes de Développement

### State Management
- **Zustand** pour l'authentification (store global)
- **React Query** pour les données serveur (cache automatique)

### Routing
- Routes protégées avec authentification
- Redirection automatique selon le statut de connexion

### API Client
- Axios configuré avec intercepteurs
- Token JWT automatiquement ajouté aux headers
- Gestion automatique des erreurs 401

## 🚀 Prochaines Améliorations

- [ ] Modales de création/édition (Produits, Catégories, Fournisseurs)
- [ ] Export PDF/Excel fonctionnel
- [ ] Graphiques de statistiques (Recharts)
- [ ] Notifications push pour alertes
- [ ] Mode sombre
- [ ] Internationalisation (i18n)
- [ ] Pagination des listes
- [ ] Filtres avancés

## 📄 Licence

ISC

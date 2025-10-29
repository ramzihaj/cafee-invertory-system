# 🚀 Guide d'Installation - Café Inventory System

## Étape 1 : Configuration du Backend

### 1.1 Créer le fichier .env

Dans le dossier `server/`, créez un fichier `.env` avec ce contenu :

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration (SQLite)
DB_PATH=./database/cafe_inventory.sqlite

# JWT Configuration
JWT_SECRET=changez_cette_cle_secrete_par_une_valeur_unique_et_securisee_ici
JWT_EXPIRE=7d

# Frontend URL
CLIENT_URL=http://localhost:3000

# Upload Configuration
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880
```

**⚠️ IMPORTANT** : Changez `JWT_SECRET` par une chaîne aléatoire et sécurisée !

### 1.2 Installer les dépendances backend

```bash
cd server
npm install
```

### 1.3 Initialiser la base de données

```bash
npm run seed
```

✅ Cette commande va créer :
- La base de données SQLite
- 3 utilisateurs (admin, manager, employé)
- 8 catégories
- 4 fournisseurs
- 26 produits
- 50 mouvements de stock

### 1.4 Démarrer le serveur backend

```bash
npm run dev
```

✅ Le serveur est maintenant accessible sur http://localhost:5000

---

## Étape 2 : Configuration du Frontend

### 2.1 Installer les dépendances frontend

Ouvrez un **nouveau terminal** :

```bash
cd client
npm install
```

### 2.2 Démarrer le frontend

```bash
npm run dev
```

✅ L'interface web est maintenant accessible sur http://localhost:3000

---

## Étape 3 : Test de l'Application

### 3.1 Accéder à l'application

Ouvrez votre navigateur et allez sur : **http://localhost:3000**

### 3.2 Se connecter

Utilisez un de ces comptes de test :

| Email | Mot de passe | Rôle |
|-------|--------------|------|
| admin@cafe.com | password123 | Administrateur (tous les droits) |
| manager@cafe.com | password123 | Manager (gestion sans suppression) |
| employee@cafe.com | password123 | Employé (consultation et mouvements) |

### 3.3 Explorer l'application

Une fois connecté, vous pouvez :
- ✅ Voir le dashboard avec les statistiques
- ✅ Consulter les produits et leur stock
- ✅ Voir les alertes de stock bas
- ✅ Consulter l'historique des mouvements
- ✅ Gérer les catégories et fournisseurs (selon votre rôle)

---

## 🎯 Récapitulatif des Commandes

### Backend (Terminal 1)
```bash
cd server
npm install                 # Installation
npm run seed               # Initialisation DB
npm run dev                # Démarrage serveur
```

### Frontend (Terminal 2)
```bash
cd client
npm install                 # Installation
npm run dev                # Démarrage interface
```

---

## 📁 Vérification de l'Installation

Après l'installation, vous devriez avoir cette structure :

```
Invertory Systeme/
├── server/
│   ├── node_modules/      ✅ Installé
│   ├── database/
│   │   └── cafe_inventory.sqlite  ✅ Créé par seed
│   ├── .env               ✅ À créer manuellement
│   └── ...
├── client/
│   ├── node_modules/      ✅ Installé
│   └── ...
└── README.md
```

---

## 🐛 Problèmes Courants

### Erreur "Cannot find module"
```bash
# Réinstaller les dépendances
cd server
rm -rf node_modules package-lock.json
npm install

cd ../client
rm -rf node_modules package-lock.json
npm install
```

### Erreur "Port 5000 already in use"
- Changez le port dans `server/.env` : `PORT=5001`
- Mettez à jour le proxy dans `client/vite.config.js` si nécessaire

### Base de données corrompue
```bash
cd server
rm database/*.sqlite
npm run seed
```

### Le frontend ne charge pas les données
1. Vérifiez que le backend est bien démarré (http://localhost:5000)
2. Ouvrez la console du navigateur (F12) pour voir les erreurs
3. Vérifiez que vous êtes bien connecté

---

## 🔐 Sécurité

⚠️ **Points importants** :
- Changez `JWT_SECRET` avant toute utilisation en production
- Ne commitez jamais le fichier `.env`
- Utilisez des mots de passe forts en production

---

## 🎉 C'est Prêt !

Votre application de gestion de stock est maintenant opérationnelle !

**URLs importantes** :
- Frontend : http://localhost:3000
- Backend API : http://localhost:5000
- Documentation API : Voir `server/API_TESTS.md`

**Prochaines étapes** :
1. Explorez l'interface et les fonctionnalités
2. Testez les différents rôles d'utilisateur
3. Consultez la documentation pour l'utilisation avancée
4. Personnalisez selon vos besoins

Bon développement ! ☕

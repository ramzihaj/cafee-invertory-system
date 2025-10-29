# ⚡ Guide Rapide - Démarrage en 5 minutes

## 📋 Checklist Pré-Installation

- [ ] Node.js installé (v16 ou supérieur)
- [ ] npm installé
- [ ] 2 terminaux ouverts

---

## 🚀 Démarrage en 3 Étapes

### ✅ ÉTAPE 1 : Backend (Terminal 1)

```bash
cd server
```

**Si première installation** :
```bash
npm install
```

**Créer le fichier `.env`** dans `server/` avec ce contenu minimum :
```env
PORT=5000
NODE_ENV=development
DB_PATH=./database/cafe_inventory.sqlite
JWT_SECRET=votre_secret_tres_securise_changez_moi_123456789
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

**Initialiser la base de données** (première fois uniquement) :
```bash
npm run seed
```

**Démarrer le serveur** :
```bash
npm run dev
```

✅ **Résultat attendu** :
```
✅ Connexion SQLite établie avec succès
✅ Modèles synchronisés avec la base de données
🚀 Serveur démarré sur le port 5000
📍 Environnement: development
```

---

### ✅ ÉTAPE 2 : Frontend (Terminal 2)

```bash
cd client
```

**Si première installation** :
```bash
npm install
```

**Démarrer l'interface** :
```bash
npm run dev
```

✅ **Résultat attendu** :
```
  VITE v4.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

---

### ✅ ÉTAPE 3 : Connexion

1. Ouvrir http://localhost:3000 dans votre navigateur

2. Se connecter avec un compte de test :
   - **Admin** : `admin@cafe.com` / `password123`
   - **Manager** : `manager@cafe.com` / `password123`
   - **Employé** : `employee@cafe.com` / `password123`

3. Explorer l'application ! 🎉

---

## 📊 Données Disponibles Après Installation

Le seeding crée automatiquement :

| Type | Quantité | Exemples |
|------|----------|----------|
| Utilisateurs | 3 | Admin, Manager, Employé |
| Catégories | 8 | Café, Lait, Sucre, Pâtisseries, etc. |
| Fournisseurs | 4 | Café France, Laiterie Moderne, etc. |
| Produits | 26 | Arabica, Croissants, Lait entier, etc. |
| Mouvements | 50 | Entrées et sorties variées |

---

## 🎯 Commandes Essentielles

### Backend
```bash
npm run dev      # Démarrer en mode développement
npm start        # Démarrer en mode production
npm run seed     # Réinitialiser la base de données
```

### Frontend
```bash
npm run dev      # Démarrer le dev server
npm run build    # Build pour production
npm run preview  # Prévisualiser le build
```

---

## 🔗 URLs Importantes

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | Interface web principale |
| Backend | http://localhost:5000 | API REST |
| API Test | http://localhost:5000/api | Endpoint de test |

---

## 🐛 Dépannage Express

### ❌ "Port 5000 already in use"
**Solution** : Changez le port dans `server/.env`
```env
PORT=5001
```

### ❌ "Cannot find module"
**Solution** : Réinstallez les dépendances
```bash
cd server
rm -rf node_modules
npm install

cd ../client  
rm -rf node_modules
npm install
```

### ❌ "JWT_SECRET is not defined"
**Solution** : Vérifiez que le fichier `server/.env` existe et contient `JWT_SECRET`

### ❌ Frontend ne charge pas les données
**Solution** :
1. Vérifiez que le backend est démarré (http://localhost:5000)
2. Reconnectez-vous si nécessaire
3. Vérifiez la console du navigateur (F12)

### ❌ Base de données corrompue
**Solution** : Réinitialisez-la
```bash
cd server
rm database/*.sqlite
npm run seed
```

---

## 📚 Documentation Complète

- 📖 [README Principal](README.md)
- 🚀 [Installation Détaillée](INSTALLATION.md)
- 🔧 [Guide Backend](server/DEMARRAGE.md)
- 🧪 [Tests API](server/API_TESTS.md)
- 💻 [Guide Frontend](client/README.md)

---

## ✨ Fonctionnalités Principales

### 👉 Tableau de Bord
- Vue d'ensemble des stocks
- Statistiques en temps réel
- Top 5 produits vendus
- Alertes de stock bas

### 👉 Gestion des Produits
- Liste complète avec recherche
- Création/modification/suppression
- Catégorisation
- Alertes visuelles de stock

### 👉 Mouvements de Stock
- Enregistrement des entrées/sorties
- Historique complet
- Traçabilité par utilisateur
- Filtres avancés

### 👉 Fournisseurs
- Gestion des contacts
- Historique des commandes
- Produits fournis

### 👉 Rapports
- Export PDF/Excel (à venir)
- Statistiques détaillées
- Analyse des ventes

---

## 🎨 Interface

✅ Design moderne et épuré  
✅ Thème café (marron/beige)  
✅ Responsive (mobile, tablette, desktop)  
✅ Icônes Lucide React  
✅ Notifications toast

---

## 🔐 Rôles et Permissions

| Action | Admin | Manager | Employé |
|--------|-------|---------|---------|
| Voir données | ✅ | ✅ | ✅ |
| Mouvements stock | ✅ | ✅ | ✅ |
| Créer/Modifier | ✅ | ✅ | ❌ |
| Supprimer | ✅ | ❌ | ❌ |

---

## 💡 Conseils d'Utilisation

1. **Commencez par le Dashboard** pour avoir une vue d'ensemble
2. **Testez avec différents rôles** pour comprendre les permissions
3. **Explorez les alertes de stock bas** dans le dashboard
4. **Enregistrez des mouvements** pour voir la traçabilité
5. **Utilisez la recherche** dans la page Produits

---

## 🎉 Prêt à Démarrer !

1. ✅ Backend démarré → http://localhost:5000
2. ✅ Frontend démarré → http://localhost:3000
3. ✅ Connecté avec un compte de test
4. ✅ Explorez l'application !

**Besoin d'aide ?** Consultez la [documentation complète](README.md)

Bon développement ! ☕

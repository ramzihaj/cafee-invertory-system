# 🚀 Démarrage Rapide - Café Inventory System

## ⚡ Méthode 1 : Script Automatique (RECOMMANDÉ)

### Démarrer l'application
```powershell
.\start.ps1
```
**ou** double-clic sur `start.ps1`

Le script va automatiquement :
- ✅ Libérer les ports 5000 et 3000 si occupés
- ✅ Démarrer le backend
- ✅ Démarrer le frontend
- ✅ Ouvrir le navigateur

### Arrêter l'application
```powershell
.\stop.ps1
```
**ou** double-clic sur `stop.ps1`

---

## 🔧 Méthode 2 : Manuel

### Terminal 1 - Backend
```powershell
cd server
npm run dev
```

### Terminal 2 - Frontend
```powershell
cd client
npm run dev
```

### Ouvrir le navigateur
http://localhost:3000

---

## 🔐 Connexion

- **Email** : `admin@cafe.com`
- **Mot de passe** : `password123`

**Autres comptes** :
- Manager : `manager@cafe.com` / `password123`
- Employé : `employee@cafe.com` / `password123`

---

## ❌ Problème : Port déjà utilisé ?

Si vous voyez l'erreur `EADDRINUSE: address already in use`, c'est qu'un processus utilise déjà le port.

### Solution Rapide
```powershell
# Exécutez le script d'arrêt
.\stop.ps1

# Puis redémarrez
.\start.ps1
```

### Solution Manuelle
```powershell
# Trouver le processus sur le port 5000
netstat -ano | findstr :5000

# Arrêter le processus (remplacez PID par le numéro trouvé)
taskkill /PID <PID> /F
```

---

## 📁 Structure

```
Invertory Systeme/
├── start.ps1          ⭐ Script de démarrage automatique
├── stop.ps1           ⭐ Script d'arrêt
├── START.bat          💻 Alternative Windows (.bat)
├── STOP.bat           💻 Alternative Windows (.bat)
├── server/            🔙 Backend (port 5000)
└── client/            🎨 Frontend (port 3000)
```

---

## 🔄 Réinitialiser la Base de Données

```powershell
cd server
npm run seed
```

Cela recrée :
- 3 utilisateurs
- 8 catégories
- 4 fournisseurs
- 26 produits
- 50 mouvements de stock

---

## 🧪 Tester l'API

```powershell
cd server
.\test-api.ps1
```

---

## 📚 Documentation Complète

- [README Principal](README.md)
- [Guide d'Installation](INSTALLATION.md)
- [Guide Rapide](GUIDE_RAPIDE.md)
- [Tests API](server/API_TESTS.md)
- [Documentation Backend](server/DEMARRAGE.md)

---

## 💡 Astuces

### Redémarrer rapidement le serveur backend
Dans le terminal backend, tapez : `rs` + Entrée

### Vérifier les processus actifs
```powershell
# Ports utilisés
netstat -ano | findstr :5000
netstat -ano | findstr :3000
```

### Problème de dépendances
```powershell
# Backend
cd server
rm -rf node_modules
npm install

# Frontend
cd client
rm -rf node_modules
npm install
```

---

## ✅ Checklist de Démarrage

- [ ] Node.js installé (v16+)
- [ ] Dépendances installées (`npm install` dans server/ et client/)
- [ ] Fichier `.env` créé dans `server/` (voir `.env.example`)
- [ ] Base de données initialisée (`npm run seed`)
- [ ] Ports 5000 et 3000 libres
- [ ] Script `start.ps1` exécuté

---

## 🎉 C'est Prêt !

L'application devrait être accessible sur **http://localhost:3000**

Bon développement ! ☕

# 📚 Guide Complet - Système de Gestion Café

## 🚀 Démarrage Rapide

### 1. Installation et Configuration

```bash
# Installer les dépendances Backend
cd server
npm install

# Installer les dépendances Frontend
cd ../client
npm install
```

### 2. Configuration de la Base de Données

```bash
# Dans le dossier server
cd server

# Créer la base de données avec des données de démonstration
node seeders/demo-data.js
```

✅ **Données créées:**
- 4 utilisateurs (1 Admin, 1 Manager, 2 Employés)
- 5 catégories de produits
- 3 fournisseurs
- 16 produits variés (cafés, pâtisseries, desserts)
- 8 tables configurées

### 3. Lancer l'Application

```bash
# Terminal 1 - Backend (depuis le dossier server)
npm run dev
# Serveur sur http://localhost:5000

# Terminal 2 - Frontend (depuis le dossier client)
npm run dev
# Application sur http://localhost:5173
```

---

## 👤 Comptes de Démonstration

### 🔐 Connexion

| Rôle | Email | Mot de passe | Accès |
|------|-------|--------------|-------|
| **Admin** | admin@cafe.com | password123 | Accès complet |
| **Manager** | manager@cafe.com | password123 | Gestion stock + fournisseurs |
| **Employé** | employee@cafe.com | password123 | Prise de commandes |
| **Employé 2** | sophie@cafe.com | password123 | Prise de commandes |

---

## 🎯 Fonctionnalités par Rôle

### 🧑‍💼 ADMIN - Administrateur

**Accès complet au système:**

#### 1. **Dashboard Admin**
- 📊 Chiffre d'affaires global
- 📈 Nombre total de commandes
- 👥 Liste et statistiques des employés
- 🏆 Classement des employés par performance
- 📦 Alertes de stock

#### 2. **Gestion des Utilisateurs** (`/users`)
- ✅ Créer de nouveaux utilisateurs (Manager/Employé)
- ✅ Modifier les informations utilisateurs
- ✅ Désactiver des comptes
- ✅ Générer des coupons d'accès
- ✅ Voir les statistiques par employé

**Générer un Coupon:**
1. Cliquer sur "Générer Coupon"
2. Sélectionner le rôle (Manager ou Employé)
3. Définir la durée d'expiration
4. Le code unique est généré automatiquement
5. Partager le code avec le nouvel utilisateur

#### 3. **Gestion des Tables** (`/tables`)
- ✅ Créer/Modifier/Supprimer des tables
- ✅ Définir la capacité
- ✅ Assigner des serveurs aux tables
- ✅ Voir le statut en temps réel

#### 4. **Gestion Complète**
- ✅ Tous les droits Manager
- ✅ Accès aux rapports complets
- ✅ Export des données

---

### 🧑‍🔧 MANAGER - Gestionnaire

**Gestion du stock et des opérations:**

#### 1. **Dashboard Manager**
- 📊 Vue d'ensemble du stock
- 🏆 Top 5 produits vendus
- ⚠️ Alertes stock faible
- 📦 Statistiques inventaire

#### 2. **Gestion des Produits** (`/products`)
- ✅ Ajouter de nouveaux produits
- ✅ Modifier les prix et stocks
- ✅ Activer/Désactiver des produits
- ✅ Configurer les seuils min/max
- ✅ Gérer les codes-barres

**Ajouter un Produit:**
1. Cliquer sur "Nouveau Produit"
2. Remplir les informations:
   - Nom, Description
   - Catégorie, Fournisseur
   - Prix unitaire, Unité de mesure
   - Stock actuel, min et max
   - SKU et code-barres
3. Valider

#### 3. **Gestion des Catégories** (`/categories`)
- ✅ Créer des catégories
- ✅ Personnaliser les couleurs
- ✅ Organiser les produits

#### 4. **Gestion des Fournisseurs** (`/suppliers`)
- ✅ Ajouter des fournisseurs
- ✅ Gérer les contacts
- ✅ Historique des commandes

#### 5. **Mouvements de Stock** (`/movements`)
- ✅ Enregistrer entrées/sorties
- ✅ Ajustements de stock
- ✅ Retours fournisseurs
- ✅ Traçabilité complète

**Types de Mouvements:**
- 📈 **Entrée**: Réception de stock
- 📉 **Sortie**: Vente ou consommation
- 🔄 **Ajustement**: Correction de stock
- ↩️ **Retour**: Retour fournisseur

#### 6. **Rapports** (`/reports`)
- ✅ Statistiques périodiques
- ✅ Export CSV
- ✅ Analyse par catégorie
- ✅ Valeur du stock

#### 7. **Gestion des Tables** (`/tables`)
- ✅ Configurer les tables
- ✅ Assigner aux employés
- ✅ Voir les statuts

---

### 🧑‍🍳 EMPLOYÉ - Serveur

**Prise de commandes:**

#### 1. **Dashboard Employé**
- 📊 Commandes du jour
- 🪑 Tables assignées
- 💰 Ventes personnelles
- ⏱️ Commandes en cours

#### 2. **Prise de Commandes** (`/orders`)

**Interface Optimisée:**

##### **Sélection de Table:**
- Vue visuelle des tables disponibles
- Code couleur (Vert = Disponible, Rouge = Occupée)
- Uniquement les tables assignées ou libres
- Capacité affichée

##### **Menu Produits:**
- Grille visuelle des produits
- Prix et catégories
- Indication de stock
- Ajout au panier en un clic

##### **Panier Intelligent:**
- ✅ Ouverture automatique à l'ajout
- ✅ Vérification de stock en temps réel
- ✅ Calcul automatique des totaux
- ✅ Modification des quantités
- ✅ Notes pour la cuisine
- ✅ Résumé clair avant validation

**Créer une Commande:**
1. Sélectionner une table
2. Ajouter des produits au panier
3. Ajuster les quantités si besoin
4. Ajouter des notes (optionnel)
5. Cliquer sur "Confirmer la Commande"
6. ✅ Stock mis à jour automatiquement
7. ✅ Table marquée comme occupée

##### **Suivi des Commandes:**
- Voir l'historique du jour
- Statuts en temps réel
- Marquer comme livré

---

## 📝 Fonctionnalités Détaillées

### 🎟️ Système de Coupons

**Pour l'Admin:**
1. Générer un coupon avec rôle et expiration
2. Partager le code généré (ex: A3B2C1D4)

**Pour le Nouvel Utilisateur:**
1. Aller sur `/register`
2. Entrer le code coupon
3. Remplir le formulaire d'inscription
4. Le rôle est assigné automatiquement
5. Le coupon est marqué comme utilisé

### 🛒 Panier de Commande Amélioré

**Fonctionnalités:**
- ✅ Design moderne avec animations
- ✅ Vérification de stock automatique
- ✅ Alertes si stock insuffisant
- ✅ Affichage du stock disponible
- ✅ Sous-totaux par article
- ✅ Total en temps réel
- ✅ Bouton "Vider le panier"
- ✅ Validation impossible sans table
- ✅ Notes personnalisées

**Contrôles de Sécurité:**
- Impossible d'ajouter plus que le stock
- Vérification à chaque modification
- Table obligatoire avant validation
- Mise à jour automatique du stock

### ☕ Modèle 3D Amélioré

**Caractéristiques:**
- 🎨 Tasse de café réaliste en CSS pur
- 🔄 Rotation automatique
- 💨 Effet de vapeur animée
- ✨ Effet hover avec zoom
- 🥄 Cuillère apparaît au survol
- 🎯 Ombres et reflets réalistes
- 📐 Code bien structuré et commenté

**Props disponibles:**
```jsx
<Coffee3D 
  size={200}              // Taille en pixels
  animate={true}          // Animation on/off
  steamEffect="continuous" // 'continuous', 'pulse', 'none'
/>
```

### 📊 Produits de Démonstration

**16 Produits Créés:**

**Boissons Chaudes:**
- Espresso - 2.50€
- Cappuccino - 3.50€
- Latte Macchiato - 4.00€
- Thé Vert - 2.80€
- Chocolat Chaud - 3.80€

**Boissons Froides:**
- Café Glacé - 4.50€
- Smoothie Fraise - 5.50€
- Jus d'Orange Pressé - 4.20€

**Pâtisseries:**
- Croissant Beurre - 1.80€
- Pain au Chocolat - 2.00€
- Muffin Myrtille - 3.20€

**Snacks Salés:**
- Sandwich Poulet - 6.50€
- Quiche Lorraine - 5.80€

**Desserts:**
- Tiramisu - 5.50€
- Tarte Citron - 4.80€
- Brownie Chocolat - 3.50€

---

## 🎨 Interface Utilisateur

### Design System

**Couleurs:**
- 🟫 Coffee: Marron principal (#8B4513)
- ☕ Coffee Dark: Marron foncé (#654321)
- 🥛 Cream: Crème (#F5E6D3)
- 🔴 Danger: Rouge (#EF4444)
- 🟢 Success: Vert (#10B981)
- 🔵 Primary: Bleu (#3B82F6)

**Composants:**
- Buttons: Primary, Secondary, Danger
- Badges: Success, Warning, Danger, Info
- Cards: Shadow, Hover effects
- Modals: Centered, Responsive
- Forms: Validation inline
- Tables: Striped, Hover

### Responsive Design

- 📱 **Mobile First**: Optimisé pour mobile
- 💻 **Desktop**: Sidebar fixe
- 📲 **Tablet**: Adaptation automatique
- 🎯 **Touch Friendly**: Boutons adaptés

---

## 🔒 Sécurité

### Backend
- ✅ JWT Authentication
- ✅ Password hashing (bcrypt)
- ✅ Role-based middleware
- ✅ Input validation
- ✅ SQL injection protection (Sequelize)

### Frontend
- ✅ Protected routes
- ✅ Role-based navigation
- ✅ Token storage (localStorage)
- ✅ Auto logout on token expiry

---

## 📦 Structure des Données

### Produits
```javascript
{
  name: "Espresso",
  sku: "BH-ESP-001",
  barcode: "3450123456789",
  categoryId: 1,
  supplierId: 1,
  unitPrice: 2.50,
  currentStock: 150,
  minStock: 30,
  maxStock: 200
}
```

### Commandes
```javascript
{
  orderNumber: "ORD-1234567890-123",
  tableId: 1,
  employeeId: 3,
  totalAmount: 12.50,
  status: "pending",
  items: [
    {
      productId: 1,
      quantity: 2,
      unitPrice: 2.50,
      subtotal: 5.00
    }
  ]
}
```

---

## 🐛 Résolution de Problèmes

### Le serveur ne démarre pas
```bash
# Vérifier les dépendances
cd server
npm install

# Vérifier le port
# Changer PORT dans .env si 5000 est occupé
```

### La base de données est vide
```bash
# Réexécuter le seeder
node seeders/demo-data.js
```

### Les produits ne s'affichent pas
```bash
# Vérifier que le serveur est lancé
# Vérifier l'URL de l'API dans client/src/lib/api.js
```

### Erreur de connexion
```bash
# Vérifier les credentials
# Réinitialiser avec le seeder
```

---

## 📈 Prochaines Fonctionnalités Suggérées

1. **Notifications en temps réel** (WebSocket)
2. **Impression de tickets** cuisine
3. **Gestion de paiements** (Cash/Carte)
4. **Statistiques avancées** (Graphiques)
5. **QR Codes** pour tables
6. **Programme de fidélité**
7. **Réservations** en ligne
8. **Multi-langue**

---

## 🤝 Support

Pour toute question ou problème:
1. Vérifier ce guide
2. Consulter IMPLEMENTATION.md
3. Vérifier les logs serveur
4. Vérifier la console navigateur

---

## ✨ Résumé des Améliorations

### ✅ Complété
- [x] Système de rôles complet (Admin/Manager/Employé)
- [x] Dashboards personnalisés par rôle
- [x] Gestion des utilisateurs et coupons
- [x] Prise de commandes avec panier intelligent
- [x] Gestion des tables
- [x] 16 produits de démonstration
- [x] Modèle 3D de café amélioré
- [x] Interface moderne et responsive
- [x] Vérifications de stock en temps réel
- [x] Export CSV des rapports
- [x] Inscription avec coupon

### 🎯 Prêt pour Production

Le système est maintenant complet et prêt à l'emploi avec :
- ✅ Base de données peuplée
- ✅ Utilisateurs de test
- ✅ Interface intuitive
- ✅ Sécurité implémentée
- ✅ Documentation complète

**Bon service! ☕**

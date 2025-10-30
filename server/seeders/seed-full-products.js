const { sequelize, User, Category, Supplier, Product, Table } = require('../models');

// Données des produits par catégorie (15 par catégorie)
const productsData = {
  'Boissons Chaudes': [
    { name: 'Espresso', price: 2.50, emoji: '☕', stock: 150 },
    { name: 'Cappuccino', price: 3.50, emoji: '☕', stock: 140 },
    { name: 'Latte Macchiato', price: 4.00, emoji: '☕', stock: 135 },
    { name: 'Americano', price: 2.80, emoji: '☕', stock: 145 },
    { name: 'Café Crème', price: 3.20, emoji: '☕', stock: 130 },
    { name: 'Thé Vert', price: 2.80, emoji: '🍵', stock: 120 },
    { name: 'Thé Noir Earl Grey', price: 2.80, emoji: '🍵', stock: 115 },
    { name: 'Chocolat Chaud', price: 3.80, emoji: '🍫', stock: 110 },
    { name: 'Moka', price: 4.20, emoji: '☕', stock: 125 },
    { name: 'Café Viennois', price: 3.90, emoji: '☕', stock: 128 },
    { name: 'Ristretto', price: 2.30, emoji: '☕', stock: 142 },
    { name: 'Flat White', price: 3.70, emoji: '☕', stock: 132 },
    { name: 'Thé Menthe', price: 3.00, emoji: '🍵', stock: 118 },
    { name: 'Infusion Verveine', price: 2.60, emoji: '🍵', stock: 105 },
    { name: 'Chai Latte', price: 4.10, emoji: '☕', stock: 122 }
  ],
  'Boissons Froides': [
    { name: 'Café Glacé', price: 4.50, emoji: '🧊', stock: 95 },
    { name: 'Smoothie Fraise', price: 5.50, emoji: '🍓', stock: 85 },
    { name: 'Jus d\'Orange Pressé', price: 4.20, emoji: '🍊', stock: 100 },
    { name: 'Smoothie Mangue', price: 5.80, emoji: '🥭', stock: 80 },
    { name: 'Limonade Maison', price: 3.80, emoji: '🍋', stock: 92 },
    { name: 'Thé Glacé Pêche', price: 3.90, emoji: '🍑', stock: 88 },
    { name: 'Milkshake Vanille', price: 5.20, emoji: '🍦', stock: 75 },
    { name: 'Milkshake Chocolat', price: 5.20, emoji: '🍫', stock: 78 },
    { name: 'Smoothie Banane', price: 5.30, emoji: '🍌', stock: 82 },
    { name: 'Frappuccino Caramel', price: 5.90, emoji: '🧊', stock: 70 },
    { name: 'Jus de Pomme', price: 3.80, emoji: '🍎', stock: 95 },
    { name: 'Smoothie Fruits Rouges', price: 5.70, emoji: '🫐', stock: 77 },
    { name: 'Citronnade Menthe', price: 4.00, emoji: '🍋', stock: 90 },
    { name: 'Lait Frappé Fraise', price: 4.80, emoji: '🍓', stock: 73 },
    { name: 'Mocaccino Glacé', price: 5.40, emoji: '🧊', stock: 68 }
  ],
  'Pâtisseries': [
    { name: 'Croissant Beurre', price: 1.80, emoji: '🥐', stock: 60 },
    { name: 'Pain au Chocolat', price: 2.00, emoji: '🥐', stock: 55 },
    { name: 'Muffin Myrtille', price: 3.20, emoji: '🧁', stock: 48 },
    { name: 'Éclair au Chocolat', price: 3.80, emoji: '🍫', stock: 42 },
    { name: 'Chouquette', price: 0.80, emoji: '🧁', stock: 90 },
    { name: 'Chausson aux Pommes', price: 2.50, emoji: '🍎', stock: 50 },
    { name: 'Cookie Pépites Chocolat', price: 2.20, emoji: '🍪', stock: 65 },
    { name: 'Macaron Framboise', price: 2.80, emoji: '🍰', stock: 58 },
    { name: 'Brioche Sucrée', price: 2.30, emoji: '🍞', stock: 52 },
    { name: 'Tarte Amandine', price: 3.50, emoji: '🥧', stock: 45 },
    { name: 'Palmier Caramélisé', price: 1.90, emoji: '🥐', stock: 62 },
    { name: 'Cannelé Bordelais', price: 2.60, emoji: '🧁', stock: 48 },
    { name: 'Donut Glacé', price: 2.90, emoji: '🍩', stock: 54 },
    { name: 'Scone Nature', price: 2.40, emoji: '🥐', stock: 51 },
    { name: 'Financier Pistache', price: 2.70, emoji: '🧁', stock: 46 }
  ],
  'Snacks Salés': [
    { name: 'Sandwich Poulet', price: 6.50, emoji: '🥪', stock: 35 },
    { name: 'Quiche Lorraine', price: 5.80, emoji: '🥧', stock: 32 },
    { name: 'Croque-Monsieur', price: 5.50, emoji: '🥪', stock: 38 },
    { name: 'Salade César', price: 7.50, emoji: '🥗', stock: 28 },
    { name: 'Panini Jambon', price: 5.20, emoji: '🥪', stock: 40 },
    { name: 'Wrap Végétarien', price: 6.80, emoji: '🌯', stock: 30 },
    { name: 'Bagel Saumon', price: 7.20, emoji: '🥯', stock: 25 },
    { name: 'Pizza Margherita', price: 8.50, emoji: '🍕', stock: 22 },
    { name: 'Sandwich Club', price: 7.80, emoji: '🥪', stock: 30 },
    { name: 'Salade Niçoise', price: 7.90, emoji: '🥗', stock: 26 },
    { name: 'Quiche Végétarienne', price: 5.50, emoji: '🥧', stock: 33 },
    { name: 'Croissant Jambon Fromage', price: 4.20, emoji: '🥐', stock: 45 },
    { name: 'Focaccia Tomate', price: 5.90, emoji: '🍞', stock: 28 },
    { name: 'Tartine Avocado', price: 6.90, emoji: '🥑', stock: 31 },
    { name: 'Bowl Poke Saumon', price: 9.50, emoji: '🍱', stock: 20 }
  ],
  'Desserts': [
    { name: 'Tiramisu', price: 5.50, emoji: '🍰', stock: 35 },
    { name: 'Tarte Citron Meringuée', price: 4.80, emoji: '🥧', stock: 38 },
    { name: 'Brownie Chocolat', price: 3.50, emoji: '🍫', stock: 48 },
    { name: 'Cheesecake Fruits Rouges', price: 5.80, emoji: '🍰', stock: 32 },
    { name: 'Mousse au Chocolat', price: 4.20, emoji: '🍫', stock: 42 },
    { name: 'Crème Brûlée', price: 4.90, emoji: '🍮', stock: 36 },
    { name: 'Fondant au Chocolat', price: 5.20, emoji: '🍫', stock: 40 },
    { name: 'Tarte Tatin', price: 4.50, emoji: '🥧', stock: 34 },
    { name: 'Panna Cotta Vanille', price: 4.60, emoji: '🍮', stock: 38 },
    { name: 'Crumble Pomme', price: 4.30, emoji: '🍎', stock: 41 },
    { name: 'Profiteroles', price: 5.90, emoji: '🍰', stock: 29 },
    { name: 'Forêt Noire', price: 6.20, emoji: '🍰', stock: 27 },
    { name: 'Éclair Café', price: 3.90, emoji: '☕', stock: 45 },
    { name: 'Paris-Brest', price: 5.40, emoji: '🧁', stock: 31 },
    { name: 'Mille-Feuille', price: 4.70, emoji: '🍰', stock: 36 }
  ]
};

const seedFullProducts = async () => {
  try {
    console.log('🌱 Début du seeding COMPLET - 75 produits avec images...\n');

    // Sync database
    await sequelize.sync({ force: true });
    console.log('✅ Base de données synchronisée\n');

    // 1. Créer les utilisateurs
    console.log('👥 Création des utilisateurs...');
    const users = await User.bulkCreate([
      {
        name: 'Admin Principal',
        email: 'admin@cafe.com',
        password: 'password123',
        role: 'admin',
        phone: '06 12 34 56 78',
        isActive: true
      },
      {
        name: 'Manager Dupont',
        email: 'manager@cafe.com',
        password: 'password123',
        role: 'manager',
        phone: '06 23 45 67 89',
        isActive: true
      },
      {
        name: 'Serveur Martin',
        email: 'employee@cafe.com',
        password: 'password123',
        role: 'employee',
        phone: '06 34 56 78 90',
        isActive: true
      },
      {
        name: 'Serveur Sophie',
        email: 'sophie@cafe.com',
        password: 'password123',
        role: 'employee',
        phone: '06 45 67 89 01',
        isActive: true
      }
    ], {
      individualHooks: true  // IMPORTANT: Active les hooks beforeSave pour hasher les passwords
    });
    console.log(`✅ ${users.length} utilisateurs créés (mots de passe hashés)\n`);

    // 2. Créer les catégories
    console.log('📂 Création des catégories...');
    const categories = await Category.bulkCreate([
      {
        name: 'Boissons Chaudes',
        description: 'Cafés, thés et chocolats chauds',
        color: '#8B4513'
      },
      {
        name: 'Boissons Froides',
        description: 'Cafés glacés, smoothies et jus',
        color: '#4A90E2'
      },
      {
        name: 'Pâtisseries',
        description: 'Croissants, pains au chocolat et viennoiseries',
        color: '#F4A460'
      },
      {
        name: 'Snacks Salés',
        description: 'Sandwichs, salades et plats',
        color: '#90EE90'
      },
      {
        name: 'Desserts',
        description: 'Gâteaux, tartes et desserts maison',
        color: '#FFB6C1'
      }
    ]);
    console.log(`✅ ${categories.length} catégories créées\n`);

    // 3. Créer les fournisseurs
    console.log('🚚 Création des fournisseurs...');
    const suppliers = await Supplier.bulkCreate([
      {
        name: 'Torréfaction Parisienne',
        company: 'Café Premium SA',
        email: 'contact@torrefaction-paris.fr',
        phone: '01 23 45 67 89',
        addressStreet: '15 Rue du Commerce',
        addressCity: 'Paris',
        addressPostalCode: '75015',
        addressCountry: 'France',
        isActive: true
      },
      {
        name: 'Boulangerie Artisanale',
        company: 'Le Fournil d\'Or',
        email: 'commandes@fournil.fr',
        phone: '01 34 56 78 90',
        addressStreet: '8 Avenue des Boulangers',
        addressCity: 'Lyon',
        addressPostalCode: '69002',
        addressCountry: 'France',
        isActive: true
      },
      {
        name: 'Produits Laitiers Bio',
        company: 'BioLait France',
        email: 'contact@biolait.fr',
        phone: '01 45 67 89 01',
        addressStreet: '22 Rue Verte',
        addressCity: 'Nantes',
        addressPostalCode: '44000',
        addressCountry: 'France',
        isActive: true
      }
    ]);
    console.log(`✅ ${suppliers.length} fournisseurs créés\n`);

    // 4. Créer 75 PRODUITS (15 par catégorie)
    console.log('☕ Création de 75 produits avec emojis...');
    const allProducts = [];
    let productCounter = 1;

    for (const category of categories) {
      const categoryProducts = productsData[category.name];
      
      console.log(`  📦 ${category.name}: 15 produits...`);
      
      for (let i = 0; i < categoryProducts.length; i++) {
        const prod = categoryProducts[i];
        const skuCode = category.name.substring(0, 2).toUpperCase();
        
        allProducts.push({
          name: prod.name,
          description: `Délicieux ${prod.name.toLowerCase()}`,
          sku: `${skuCode}-${String(productCounter).padStart(3, '0')}`,
          barcode: `345${category.id}${String(productCounter).padStart(7, '0')}`,
          categoryId: category.id,
          supplierId: suppliers[productCounter % suppliers.length].id,
          unitPrice: prod.price,
          unit: ['Boissons Chaudes', 'Boissons Froides'].includes(category.name) ? 'tasse' : 'pièce',
          currentStock: prod.stock,
          minStock: Math.floor(prod.stock * 0.2),
          maxStock: Math.floor(prod.stock * 1.5),
          imageUrl: prod.emoji,
          isActive: true
        });
        
        productCounter++;
      }
    }

    const products = await Product.bulkCreate(allProducts);
    console.log(`✅ ${products.length} produits créés avec images emoji\n`);

    // 5. Créer les tables
    console.log('🪑 Création des tables...');
    const tables = await Table.bulkCreate([
      { number: 1, capacity: 2, status: 'available', assignedTo: users[2].id },
      { number: 2, capacity: 4, status: 'available', assignedTo: users[2].id },
      { number: 3, capacity: 4, status: 'available', assignedTo: users[3].id },
      { number: 4, capacity: 6, status: 'available', assignedTo: users[3].id },
      { number: 5, capacity: 2, status: 'available', assignedTo: users[2].id },
      { number: 6, capacity: 8, status: 'available', assignedTo: users[3].id },
      { number: 7, capacity: 4, status: 'available', assignedTo: users[2].id },
      { number: 8, capacity: 6, status: 'available', assignedTo: users[3].id }
    ]);
    console.log(`✅ ${tables.length} tables créées\n`);

    // Résumé final
    console.log('═══════════════════════════════════════════════');
    console.log('🎉 SEEDING TERMINÉ AVEC SUCCÈS !');
    console.log('═══════════════════════════════════════════════');
    console.log(`👥 Utilisateurs: ${users.length}`);
    console.log(`📂 Catégories: ${categories.length}`);
    console.log(`🚚 Fournisseurs: ${suppliers.length}`);
    console.log(`☕ Produits: ${products.length} (15 par catégorie avec emojis)`);
    console.log(`🪑 Tables: ${tables.length}`);
    console.log('═══════════════════════════════════════════════\n');
    
    console.log('📊 Répartition des produits:');
    for (const category of categories) {
      const count = products.filter(p => p.categoryId === category.id).length;
      console.log(`   ${category.name}: ${count} produits`);
    }
    
    console.log('\n🔐 Comptes de test:');
    console.log('   Admin:    admin@cafe.com / password123');
    console.log('   Manager:  manager@cafe.com / password123');
    console.log('   Employé1: employee@cafe.com / password123');
    console.log('   Employé2: sophie@cafe.com / password123\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors du seeding:', error);
    process.exit(1);
  }
};

// Exécuter le seeding
seedFullProducts();

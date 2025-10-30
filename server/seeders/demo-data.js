const { sequelize, User, Category, Supplier, Product, Table } = require('../models');

const seedDemoData = async () => {
  try {
    console.log('🌱 Début du seeding de données de démonstration...');

    // Sync database
    await sequelize.sync({ force: true });
    console.log('✅ Base de données synchronisée');

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
    ]);
    console.log(`✅ ${users.length} utilisateurs créés`);

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
        description: 'Sandwichs, salades et quiches',
        color: '#90EE90'
      },
      {
        name: 'Desserts',
        description: 'Gâteaux, tartes et desserts maison',
        color: '#FFB6C1'
      }
    ]);
    console.log(`✅ ${categories.length} catégories créées`);

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
        notes: 'Fournisseur principal de café en grains',
        isActive: true
      },
      {
        name: 'Boulangerie Artisanale',
        company: 'Le Fournil d\'Or',
        email: 'commandes@fournil.fr',
        phone: '01 34 56 78 90',
        addressStreet: '8 Avenue des Boulangers',
        addressCity: 'Lyon',
        addressPostalCode: '69001',
        addressCountry: 'France',
        notes: 'Livraison quotidienne de viennoiseries fraîches',
        isActive: true
      },
      {
        name: 'Produits Laitiers Bio',
        company: 'Lait & Fromage',
        email: 'info@laitbio.fr',
        phone: '01 45 67 89 01',
        addressStreet: '22 Rue de la Ferme',
        addressCity: 'Rennes',
        addressPostalCode: '35000',
        addressCountry: 'France',
        notes: 'Produits bio et locaux',
        isActive: true
      }
    ]);
    console.log(`✅ ${suppliers.length} fournisseurs créés`);

    // 4. Créer les produits
    console.log('☕ Création des produits...');
    const products = await Product.bulkCreate([
      // Boissons Chaudes
      {
        name: 'Espresso',
        description: 'Café court et intense',
        sku: 'BH-ESP-001',
        barcode: '3450123456789',
        categoryId: categories[0].id,
        supplierId: suppliers[0].id,
        unitPrice: 2.50,
        unit: 'tasse',
        currentStock: 150,
        minStock: 30,
        maxStock: 200,
        isActive: true
      },
      {
        name: 'Cappuccino',
        description: 'Espresso avec mousse de lait onctueuse',
        sku: 'BH-CAP-002',
        barcode: '3450123456790',
        categoryId: categories[0].id,
        supplierId: suppliers[0].id,
        unitPrice: 3.50,
        unit: 'tasse',
        currentStock: 120,
        minStock: 25,
        maxStock: 180,
        isActive: true
      },
      {
        name: 'Latte Macchiato',
        description: 'Café au lait avec trois couches distinctes',
        sku: 'BH-LAT-003',
        barcode: '3450123456791',
        categoryId: categories[0].id,
        supplierId: suppliers[0].id,
        unitPrice: 4.00,
        unit: 'tasse',
        currentStock: 100,
        minStock: 20,
        maxStock: 150,
        isActive: true
      },
      {
        name: 'Thé Vert',
        description: 'Thé vert bio sencha',
        sku: 'BH-THV-004',
        barcode: '3450123456792',
        categoryId: categories[0].id,
        supplierId: suppliers[0].id,
        unitPrice: 2.80,
        unit: 'tasse',
        currentStock: 80,
        minStock: 15,
        maxStock: 120,
        isActive: true
      },
      {
        name: 'Chocolat Chaud',
        description: 'Chocolat chaud avec chantilly',
        sku: 'BH-CHO-005',
        barcode: '3450123456793',
        categoryId: categories[0].id,
        supplierId: suppliers[2].id,
        unitPrice: 3.80,
        unit: 'tasse',
        currentStock: 90,
        minStock: 20,
        maxStock: 130,
        isActive: true
      },

      // Boissons Froides
      {
        name: 'Café Glacé',
        description: 'Espresso sur glace avec lait froid',
        sku: 'BF-GLF-006',
        barcode: '3450123456794',
        categoryId: categories[1].id,
        supplierId: suppliers[0].id,
        unitPrice: 4.50,
        unit: 'verre',
        currentStock: 70,
        minStock: 15,
        maxStock: 100,
        isActive: true
      },
      {
        name: 'Smoothie Fraise',
        description: 'Smoothie aux fruits frais',
        sku: 'BF-SMF-007',
        barcode: '3450123456795',
        categoryId: categories[1].id,
        supplierId: suppliers[2].id,
        unitPrice: 5.50,
        unit: 'verre',
        currentStock: 50,
        minStock: 10,
        maxStock: 80,
        isActive: true
      },
      {
        name: 'Jus d\'Orange Pressé',
        description: 'Jus d\'orange fraîchement pressé',
        sku: 'BF-JOR-008',
        barcode: '3450123456796',
        categoryId: categories[1].id,
        supplierId: suppliers[2].id,
        unitPrice: 4.20,
        unit: 'verre',
        currentStock: 60,
        minStock: 12,
        maxStock: 90,
        isActive: true
      },

      // Pâtisseries
      {
        name: 'Croissant Beurre',
        description: 'Croissant pur beurre artisanal',
        sku: 'PT-CRO-009',
        barcode: '3450123456797',
        categoryId: categories[2].id,
        supplierId: suppliers[1].id,
        unitPrice: 1.80,
        unit: 'pièce',
        currentStock: 45,
        minStock: 10,
        maxStock: 60,
        isActive: true
      },
      {
        name: 'Pain au Chocolat',
        description: 'Viennoiserie avec deux barres de chocolat',
        sku: 'PT-PAC-010',
        barcode: '3450123456798',
        categoryId: categories[2].id,
        supplierId: suppliers[1].id,
        unitPrice: 2.00,
        unit: 'pièce',
        currentStock: 40,
        minStock: 8,
        maxStock: 55,
        isActive: true
      },
      {
        name: 'Muffin Myrtille',
        description: 'Muffin aux myrtilles fraîches',
        sku: 'PT-MUF-011',
        barcode: '3450123456799',
        categoryId: categories[2].id,
        supplierId: suppliers[1].id,
        unitPrice: 3.20,
        unit: 'pièce',
        currentStock: 30,
        minStock: 8,
        maxStock: 45,
        isActive: true
      },

      // Snacks Salés
      {
        name: 'Sandwich Poulet Crudités',
        description: 'Pain complet, poulet, salade, tomate',
        sku: 'SN-SPC-012',
        barcode: '3450123456800',
        categoryId: categories[3].id,
        supplierId: suppliers[1].id,
        unitPrice: 6.50,
        unit: 'pièce',
        currentStock: 25,
        minStock: 5,
        maxStock: 35,
        isActive: true
      },
      {
        name: 'Quiche Lorraine',
        description: 'Quiche maison au jambon et fromage',
        sku: 'SN-QUI-013',
        barcode: '3450123456801',
        categoryId: categories[3].id,
        supplierId: suppliers[1].id,
        unitPrice: 5.80,
        unit: 'part',
        currentStock: 20,
        minStock: 5,
        maxStock: 30,
        isActive: true
      },

      // Desserts
      {
        name: 'Tiramisu',
        description: 'Tiramisu maison au café',
        sku: 'DS-TIR-014',
        barcode: '3450123456802',
        categoryId: categories[4].id,
        supplierId: suppliers[1].id,
        unitPrice: 5.50,
        unit: 'part',
        currentStock: 15,
        minStock: 5,
        maxStock: 25,
        isActive: true
      },
      {
        name: 'Tarte Citron',
        description: 'Tarte au citron meringuée',
        sku: 'DS-TAC-015',
        barcode: '3450123456803',
        categoryId: categories[4].id,
        supplierId: suppliers[1].id,
        unitPrice: 4.80,
        unit: 'part',
        currentStock: 18,
        minStock: 5,
        maxStock: 28,
        isActive: true
      },
      {
        name: 'Brownie Chocolat',
        description: 'Brownie au chocolat noir intense',
        sku: 'DS-BRO-016',
        barcode: '3450123456804',
        categoryId: categories[4].id,
        supplierId: suppliers[1].id,
        unitPrice: 3.50,
        unit: 'pièce',
        currentStock: 22,
        minStock: 6,
        maxStock: 32,
        isActive: true
      }
    ]);
    console.log(`✅ ${products.length} produits créés`);

    // 5. Créer les tables
    console.log('🪑 Création des tables...');
    const tables = await Table.bulkCreate([
      { number: 1, capacity: 2, status: 'available', assignedTo: users[2].id, isActive: true },
      { number: 2, capacity: 4, status: 'available', assignedTo: users[2].id, isActive: true },
      { number: 3, capacity: 4, status: 'available', assignedTo: users[3].id, isActive: true },
      { number: 4, capacity: 2, status: 'available', assignedTo: users[3].id, isActive: true },
      { number: 5, capacity: 6, status: 'available', assignedTo: users[2].id, isActive: true },
      { number: 6, capacity: 4, status: 'available', assignedTo: users[3].id, isActive: true },
      { number: 7, capacity: 2, status: 'available', isActive: true },
      { number: 8, capacity: 8, status: 'available', isActive: true },
    ]);
    console.log(`✅ ${tables.length} tables créées`);

    console.log('\n✨ Seeding terminé avec succès!');
    console.log('\n📊 Résumé:');
    console.log(`   👥 ${users.length} utilisateurs`);
    console.log(`   📂 ${categories.length} catégories`);
    console.log(`   🚚 ${suppliers.length} fournisseurs`);
    console.log(`   ☕ ${products.length} produits`);
    console.log(`   🪑 ${tables.length} tables`);
    console.log('\n🔐 Comptes de test:');
    console.log('   Admin:    admin@cafe.com / password123');
    console.log('   Manager:  manager@cafe.com / password123');
    console.log('   Employé:  employee@cafe.com / password123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors du seeding:', error);
    process.exit(1);
  }
};

// Exécuter le seeder
seedDemoData();

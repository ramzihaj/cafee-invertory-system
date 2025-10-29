const dotenv = require('dotenv');
const { connectDB, sequelize } = require('../config/database');
const { User, Category, Supplier, Product, Movement } = require('../models');

dotenv.config();

const seedData = async () => {
  try {
    console.log('🌱 Démarrage du seeding...');

    // Connexion à la base de données
    await connectDB();

    // Supprimer toutes les données existantes
    await sequelize.sync({ force: true });
    console.log('🗑️  Base de données réinitialisée');

    // Créer des utilisateurs
    const users = await User.bulkCreate([
      {
        name: 'Admin Café',
        email: 'admin@cafe.com',
        password: 'password123',
        role: 'admin',
        phone: '0612345678'
      },
      {
        name: 'Manager Café',
        email: 'manager@cafe.com',
        password: 'password123',
        role: 'manager',
        phone: '0623456789'
      },
      {
        name: 'Employé Café',
        email: 'employee@cafe.com',
        password: 'password123',
        role: 'employee',
        phone: '0634567890'
      }
    ], { individualHooks: true });
    console.log('✅ Utilisateurs créés');

    // Créer des catégories
    const categories = await Category.bulkCreate([
      { name: 'Café', description: 'Grains et café moulu', icon: 'coffee', color: '#8B4513' },
      { name: 'Lait', description: 'Produits laitiers', icon: 'milk', color: '#F5F5DC' },
      { name: 'Sucre & Édulcorants', description: 'Sucres et alternatives', icon: 'sugar', color: '#FFFFFF' },
      { name: 'Pâtisseries', description: 'Viennoiseries et gâteaux', icon: 'croissant', color: '#F4A460' },
      { name: 'Sirops', description: 'Sirops aromatisés', icon: 'bottle', color: '#FF6347' },
      { name: 'Thé & Tisanes', description: 'Thés et infusions', icon: 'tea', color: '#90EE90' },
      { name: 'Tasses & Accessoires', description: 'Matériel de service', icon: 'cup', color: '#D3D3D3' },
      { name: 'Emballages', description: 'Gobelets, couvercles, etc.', icon: 'box', color: '#DEB887' }
    ]);
    console.log('✅ Catégories créées');

    // Créer des fournisseurs
    const suppliers = await Supplier.bulkCreate([
      {
        name: 'Café France',
        company: 'Café France SAS',
        email: 'contact@cafefrance.fr',
        phone: '0145678901',
        addressStreet: '15 Rue du Commerce',
        addressCity: 'Paris',
        addressPostalCode: '75001',
        addressCountry: 'France'
      },
      {
        name: 'Laiterie Moderne',
        company: 'Laiterie Moderne SARL',
        email: 'commande@laiteriemoderne.fr',
        phone: '0156789012',
        addressStreet: '8 Avenue des Fermiers',
        addressCity: 'Lyon',
        addressPostalCode: '69001',
        addressCountry: 'France'
      },
      {
        name: 'Pâtisserie Artisanale',
        company: 'Pâtisserie Artisanale',
        email: 'info@patisserie-art.fr',
        phone: '0167890123',
        addressStreet: '22 Boulevard des Gourmets',
        addressCity: 'Marseille',
        addressPostalCode: '13001',
        addressCountry: 'France'
      },
      {
        name: 'Emballages Pro',
        company: 'Emballages Pro',
        email: 'vente@emballagespro.fr',
        phone: '0178901234',
        addressStreet: '45 Zone Industrielle',
        addressCity: 'Toulouse',
        addressPostalCode: '31000',
        addressCountry: 'France'
      }
    ]);
    console.log('✅ Fournisseurs créés');

    // Créer des produits
    const products = await Product.bulkCreate([
      // Cafés
      { name: 'Grains Arabica', categoryId: categories[0].id, supplierId: suppliers[0].id, unit: 'kg', currentStock: 50, minStock: 10, maxStock: 100, unitPrice: 25.50 },
      { name: 'Grains Robusta', categoryId: categories[0].id, supplierId: suppliers[0].id, unit: 'kg', currentStock: 30, minStock: 10, maxStock: 80, unitPrice: 18.00 },
      { name: 'Café Moulu Classique', categoryId: categories[0].id, supplierId: suppliers[0].id, unit: 'kg', currentStock: 25, minStock: 15, maxStock: 60, unitPrice: 22.00 },
      { name: 'Café Décaféiné', categoryId: categories[0].id, supplierId: suppliers[0].id, unit: 'kg', currentStock: 15, minStock: 5, maxStock: 40, unitPrice: 28.00 },
      
      // Lait
      { name: 'Lait Entier', categoryId: categories[1].id, supplierId: suppliers[1].id, unit: 'L', currentStock: 80, minStock: 20, maxStock: 150, unitPrice: 1.20 },
      { name: 'Lait Demi-Écrémé', categoryId: categories[1].id, supplierId: suppliers[1].id, unit: 'L', currentStock: 60, minStock: 20, maxStock: 120, unitPrice: 1.10 },
      { name: 'Lait Végétal Soja', categoryId: categories[1].id, supplierId: suppliers[1].id, unit: 'L', currentStock: 40, minStock: 10, maxStock: 80, unitPrice: 2.50 },
      { name: 'Lait Végétal Amande', categoryId: categories[1].id, supplierId: suppliers[1].id, unit: 'L', currentStock: 35, minStock: 10, maxStock: 70, unitPrice: 3.00 },
      { name: 'Crème Liquide', categoryId: categories[1].id, supplierId: suppliers[1].id, unit: 'L', currentStock: 25, minStock: 10, maxStock: 50, unitPrice: 4.50 },
      
      // Sucre
      { name: 'Sucre Blanc', categoryId: categories[2].id, supplierId: suppliers[0].id, unit: 'kg', currentStock: 100, minStock: 20, maxStock: 200, unitPrice: 1.50 },
      { name: 'Sucre Roux', categoryId: categories[2].id, supplierId: suppliers[0].id, unit: 'kg', currentStock: 45, minStock: 15, maxStock: 100, unitPrice: 2.00 },
      { name: 'Édulcorant Stévia', categoryId: categories[2].id, supplierId: suppliers[0].id, unit: 'paquet', currentStock: 200, minStock: 50, maxStock: 400, unitPrice: 0.15 },
      
      // Pâtisseries
      { name: 'Croissants', categoryId: categories[3].id, supplierId: suppliers[2].id, unit: 'pièce', currentStock: 120, minStock: 30, maxStock: 200, unitPrice: 0.80 },
      { name: 'Pains au Chocolat', categoryId: categories[3].id, supplierId: suppliers[2].id, unit: 'pièce', currentStock: 100, minStock: 30, maxStock: 180, unitPrice: 0.90 },
      { name: 'Muffins', categoryId: categories[3].id, supplierId: suppliers[2].id, unit: 'pièce', currentStock: 80, minStock: 20, maxStock: 150, unitPrice: 1.20 },
      { name: 'Cookies', categoryId: categories[3].id, supplierId: suppliers[2].id, unit: 'pièce', currentStock: 150, minStock: 40, maxStock: 250, unitPrice: 0.60 },
      
      // Sirops
      { name: 'Sirop Vanille', categoryId: categories[4].id, supplierId: suppliers[0].id, unit: 'L', currentStock: 15, minStock: 5, maxStock: 30, unitPrice: 8.50 },
      { name: 'Sirop Caramel', categoryId: categories[4].id, supplierId: suppliers[0].id, unit: 'L', currentStock: 12, minStock: 5, maxStock: 25, unitPrice: 8.50 },
      { name: 'Sirop Noisette', categoryId: categories[4].id, supplierId: suppliers[0].id, unit: 'L', currentStock: 10, minStock: 5, maxStock: 20, unitPrice: 9.00 },
      
      // Thé
      { name: 'Thé Noir', categoryId: categories[5].id, supplierId: suppliers[0].id, unit: 'paquet', currentStock: 50, minStock: 10, maxStock: 100, unitPrice: 6.00 },
      { name: 'Thé Vert', categoryId: categories[5].id, supplierId: suppliers[0].id, unit: 'paquet', currentStock: 40, minStock: 10, maxStock: 80, unitPrice: 7.00 },
      { name: 'Tisane Verveine', categoryId: categories[5].id, supplierId: suppliers[0].id, unit: 'paquet', currentStock: 30, minStock: 8, maxStock: 60, unitPrice: 5.50 },
      
      // Accessoires
      { name: 'Gobelets Carton 25cl', categoryId: categories[7].id, supplierId: suppliers[3].id, unit: 'paquet', currentStock: 500, minStock: 100, maxStock: 1000, unitPrice: 0.05 },
      { name: 'Gobelets Carton 50cl', categoryId: categories[7].id, supplierId: suppliers[3].id, unit: 'paquet', currentStock: 400, minStock: 100, maxStock: 800, unitPrice: 0.08 },
      { name: 'Couvercles', categoryId: categories[7].id, supplierId: suppliers[3].id, unit: 'paquet', currentStock: 800, minStock: 150, maxStock: 1500, unitPrice: 0.02 },
      { name: 'Serviettes', categoryId: categories[7].id, supplierId: suppliers[3].id, unit: 'paquet', currentStock: 300, minStock: 50, maxStock: 600, unitPrice: 0.01 }
    ]);
    console.log('✅ Produits créés');

    // Créer quelques mouvements de stock
    const movements = [];
    const movementTypes = ['entry', 'exit'];
    const reasons = ['purchase', 'sale', 'waste'];

    for (let i = 0; i < 50; i++) {
      const product = products[Math.floor(Math.random() * products.length)];
      const type = movementTypes[Math.floor(Math.random() * movementTypes.length)];
      const quantity = Math.floor(Math.random() * 20) + 1;
      const previousStock = product.currentStock;
      const newStock = type === 'entry' ? previousStock + quantity : Math.max(0, previousStock - quantity);
      
      // Date aléatoire dans les 30 derniers jours
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 30));

      movements.push({
        productId: product.id,
        type,
        quantity,
        reason: type === 'entry' ? 'purchase' : 'sale',
        userId: users[Math.floor(Math.random() * users.length)].id,
        supplierId: type === 'entry' ? product.supplierId : null,
        unitPrice: product.unitPrice,
        totalPrice: product.unitPrice * quantity,
        previousStock,
        newStock,
        date
      });
    }

    await Movement.bulkCreate(movements);
    console.log('✅ Mouvements de stock créés');

    console.log('\n🎉 Seeding terminé avec succès!\n');
    console.log('📧 Utilisateurs créés:');
    console.log('   - admin@cafe.com / password123 (Admin)');
    console.log('   - manager@cafe.com / password123 (Manager)');
    console.log('   - employee@cafe.com / password123 (Employé)\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors du seeding:', error);
    process.exit(1);
  }
};

seedData();

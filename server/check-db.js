const { sequelize, User, Product, Category } = require('./models');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion DB reussie');
    
    const users = await User.findAll();
    console.log(`\n👥 Utilisateurs: ${users.length}`);
    users.forEach(u => console.log(`   - ${u.email} (${u.role})`));
    
    const products = await Product.findAll();
    console.log(`\n📦 Produits: ${products.length}`);
    
    const categories = await Category.findAll();
    console.log(`📂 Categories: ${categories.length}`);
    
    // Test de login avec bcrypt
    const bcrypt = require('bcryptjs');
    const admin = await User.findOne({ where: { email: 'admin@cafe.com' } });
    
    if (admin) {
      const isMatch = await bcrypt.compare('password123', admin.password);
      console.log(`\n🔑 Test mot de passe admin: ${isMatch ? 'OK' : 'ECHEC'}`);
    } else {
      console.log('\n❌ Utilisateur admin introuvable!');
    }
    
    await sequelize.close();
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
})();

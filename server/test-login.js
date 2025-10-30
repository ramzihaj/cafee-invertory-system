const { User } = require('./models');
const bcrypt = require('bcryptjs');

const testLogin = async () => {
  try {
    console.log('🔍 Test de connexion...\n');

    // Trouver l'admin
    const admin = await User.findOne({ where: { email: 'admin@cafe.com' } });
    
    if (!admin) {
      console.log('❌ Utilisateur admin@cafe.com non trouvé !');
      console.log('⚠️ Vous devez relancer le seed: npm run seed:full');
      process.exit(1);
    }

    console.log('✅ Utilisateur trouvé:', admin.name);
    console.log('📧 Email:', admin.email);
    console.log('🔐 Password (hashé):', admin.password.substring(0, 20) + '...');
    console.log('👤 Rôle:', admin.role);
    
    // Test du mot de passe
    const testPassword = 'password123';
    console.log('\n🧪 Test du mot de passe "password123"...');
    
    const isValid = await bcrypt.compare(testPassword, admin.password);
    
    if (isValid) {
      console.log('✅ Mot de passe VALIDE - Login devrait fonctionner !');
    } else {
      console.log('❌ Mot de passe INVALIDE - Le hash ne correspond pas !');
      console.log('⚠️ SOLUTION: Relancez le seed avec: npm run seed:full');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
};

testLogin();

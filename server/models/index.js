const { sequelize } = require('../config/database');
const User = require('./User');
const Category = require('./Category');
const Supplier = require('./Supplier');
const Product = require('./Product');
const Movement = require('./Movement');

// Définir les relations entre les modèles

// Category - Product (1:N)
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

// Supplier - Product (1:N)
Supplier.hasMany(Product, { foreignKey: 'supplierId', as: 'products' });
Product.belongsTo(Supplier, { foreignKey: 'supplierId', as: 'supplier' });

// Product - Movement (1:N)
Product.hasMany(Movement, { foreignKey: 'productId', as: 'movements' });
Movement.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

// User - Movement (1:N)
User.hasMany(Movement, { foreignKey: 'userId', as: 'movements' });
Movement.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Supplier - Movement (1:N)
Supplier.hasMany(Movement, { foreignKey: 'supplierId', as: 'movements' });
Movement.belongsTo(Supplier, { foreignKey: 'supplierId', as: 'supplier' });

module.exports = {
  sequelize,
  User,
  Category,
  Supplier,
  Product,
  Movement
};

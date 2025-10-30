const { sequelize } = require('../config/database');
const User = require('./User');
const Category = require('./Category');
const Supplier = require('./Supplier');
const Product = require('./Product');
const Movement = require('./Movement');
const Coupon = require('./Coupon');
const Table = require('./Table');
const Order = require('./Order');
const OrderItem = require('./OrderItem');

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

// User - Coupon (créateur)
User.hasMany(Coupon, { foreignKey: 'createdBy', as: 'couponsCreated' });
Coupon.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

// User - Coupon (utilisateur)
User.hasMany(Coupon, { foreignKey: 'usedBy', as: 'couponsUsed' });
Coupon.belongsTo(User, { foreignKey: 'usedBy', as: 'user' });

// User - Table (serveur assigné)
User.hasMany(Table, { foreignKey: 'assignedTo', as: 'assignedTables' });
Table.belongsTo(User, { foreignKey: 'assignedTo', as: 'assignedEmployee' });

// Table - Order (1:N)
Table.hasMany(Order, { foreignKey: 'tableId', as: 'orders' });
Order.belongsTo(Table, { foreignKey: 'tableId', as: 'table' });

// User - Order (employé)
User.hasMany(Order, { foreignKey: 'employeeId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'employeeId', as: 'employee' });

// Order - OrderItem (1:N)
Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

// Product - OrderItem (1:N)
Product.hasMany(OrderItem, { foreignKey: 'productId', as: 'orderItems' });
OrderItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

module.exports = {
  sequelize,
  User,
  Category,
  Supplier,
  Product,
  Movement,
  Coupon,
  Table,
  Order,
  OrderItem
};

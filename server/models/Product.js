const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Le nom du produit est requis' }
    }
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categories',
      key: 'id'
    },
    validate: {
      notNull: { msg: 'La catégorie est requise' }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  unit: {
    type: DataTypes.ENUM('kg', 'g', 'L', 'mL', 'pièce', 'paquet'),
    defaultValue: 'pièce'
  },
  currentStock: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    validate: {
      min: { args: [0], msg: 'Le stock ne peut pas être négatif' }
    }
  },
  minStock: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 10,
    validate: {
      notNull: { msg: 'Le stock minimum est requis' }
    }
  },
  maxStock: {
    type: DataTypes.FLOAT,
    defaultValue: 1000
  },
  unitPrice: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  supplierId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'suppliers',
      key: 'id'
    }
  },
  barcode: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'products',
  timestamps: true
});

// Méthode virtuelle pour vérifier si le stock est bas
Product.prototype.isLowStock = function() {
  return this.currentStock <= this.minStock;
};

module.exports = Product;

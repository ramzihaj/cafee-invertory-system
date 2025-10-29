const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Movement = sequelize.define('Movement', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id'
    }
  },
  type: {
    type: DataTypes.ENUM('entry', 'exit', 'adjustment', 'return'),
    allowNull: false,
    validate: {
      notNull: { msg: 'Le type de mouvement est requis' }
    }
  },
  quantity: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      notNull: { msg: 'La quantité est requise' },
      min: { args: [0], msg: 'La quantité ne peut pas être négative' }
    }
  },
  reason: {
    type: DataTypes.ENUM('purchase', 'sale', 'waste', 'theft', 'inventory', 'return', 'other'),
    defaultValue: 'other'
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  supplierId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'suppliers',
      key: 'id'
    }
  },
  unitPrice: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  previousStock: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  newStock: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'movements',
  timestamps: true,
  indexes: [
    { fields: ['productId', 'date'] },
    { fields: ['type', 'date'] },
    { fields: ['userId'] }
  ]
});

module.exports = Movement;

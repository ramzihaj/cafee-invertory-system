const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Table = sequelize.define('Table', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    validate: {
      min: { args: [1], msg: 'Le numéro doit être positif' }
    }
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 4,
    validate: {
      min: { args: [1], msg: 'La capacité doit être au moins 1' }
    }
  },
  status: {
    type: DataTypes.ENUM('available', 'occupied', 'reserved'),
    defaultValue: 'available'
  },
  assignedTo: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'tables',
  timestamps: true
});

module.exports = Table;

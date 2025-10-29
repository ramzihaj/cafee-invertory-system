const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: { msg: 'Le nom de la catégorie est requis' }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  icon: {
    type: DataTypes.STRING,
    defaultValue: 'box'
  },
  color: {
    type: DataTypes.STRING,
    defaultValue: '#8B4513'
  }
}, {
  tableName: 'categories',
  timestamps: true
});

module.exports = Category;

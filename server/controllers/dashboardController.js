const { Product, Movement, Category, Supplier } = require('../models');
const { Op, fn, col, literal } = require('sequelize');

// @desc    Obtenir les statistiques du dashboard
// @route   GET /api/dashboard/stats
// @access  Private
exports.getDashboardStats = async (req, res, next) => {
  try {
    // Statistiques générales
    const totalProducts = await Product.count({ where: { isActive: true } });
    const totalCategories = await Category.count();
    const totalSuppliers = await Supplier.count({ where: { isActive: true } });

    // Produits en stock bas
    const allProducts = await Product.findAll({ where: { isActive: true } });
    const lowStockProducts = allProducts.filter(p => p.isLowStock());
    const lowStockCount = lowStockProducts.length;

    // Valeur totale du stock
    const stockValue = await Product.sum('currentStock', {
      where: { isActive: true }
    });

    // Mouvements du jour
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayMovements = await Movement.count({
      where: {
        date: { [Op.gte]: today }
      }
    });

    // Mouvements récents (derniers 7 jours)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentEntries = await Movement.count({
      where: {
        type: 'entry',
        date: { [Op.gte]: sevenDaysAgo }
      }
    });

    const recentExits = await Movement.count({
      where: {
        type: 'exit',
        date: { [Op.gte]: sevenDaysAgo }
      }
    });

    // Top 5 produits les plus vendus (sorties)
    const topProducts = await Movement.findAll({
      attributes: [
        'productId',
        [fn('SUM', col('quantity')), 'totalQuantity']
      ],
      where: {
        type: 'exit',
        date: { [Op.gte]: sevenDaysAgo }
      },
      group: ['productId'],
      order: [[literal('totalQuantity'), 'DESC']],
      limit: 5,
      include: [{ model: Product, as: 'product' }]
    });

    res.json({
      success: true,
      data: {
        overview: {
          totalProducts,
          totalCategories,
          totalSuppliers,
          lowStockCount,
          stockValue: Math.round(stockValue || 0),
          todayMovements
        },
        movements: {
          recentEntries,
          recentExits
        },
        topProducts: topProducts.map(item => ({
          product: item.product,
          quantity: parseFloat(item.dataValues.totalQuantity)
        })),
        alerts: {
          lowStock: lowStockProducts.slice(0, 10) // Top 10 des alertes
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtenir les statistiques par période
// @route   GET /api/dashboard/period-stats
// @access  Private
exports.getPeriodStats = async (req, res, next) => {
  try {
    const { period = 'week' } = req.query; // day, week, month, year

    let startDate = new Date();
    
    switch (period) {
      case 'day':
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'week':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      default:
        startDate.setDate(startDate.getDate() - 7);
    }

    const movements = await Movement.findAll({
      where: {
        date: { [Op.gte]: startDate }
      },
      include: [{ model: Product, as: 'product' }],
      order: [['date', 'ASC']]
    });

    // Grouper par type
    const entries = movements.filter(m => m.type === 'entry');
    const exits = movements.filter(m => m.type === 'exit');

    const totalEntries = entries.reduce((sum, m) => sum + parseFloat(m.quantity), 0);
    const totalExits = exits.reduce((sum, m) => sum + parseFloat(m.quantity), 0);
    const totalEntriesValue = entries.reduce((sum, m) => sum + parseFloat(m.totalPrice), 0);
    const totalExitsValue = exits.reduce((sum, m) => sum + parseFloat(m.totalPrice), 0);

    res.json({
      success: true,
      period,
      data: {
        entries: {
          count: entries.length,
          quantity: totalEntries,
          value: totalEntriesValue
        },
        exits: {
          count: exits.length,
          quantity: totalExits,
          value: totalExitsValue
        },
        movements
      }
    });
  } catch (error) {
    next(error);
  }
};

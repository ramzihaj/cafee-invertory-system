const { Movement, Product, User, Supplier, Category } = require('../models');
const { Op } = require('sequelize');

// @desc    Obtenir tous les mouvements
// @route   GET /api/movements
// @access  Private
exports.getAllMovements = async (req, res, next) => {
  try {
    const { product, type, startDate, endDate, limit = 100 } = req.query;

    const where = {};

    if (product) where.productId = product;
    if (type) where.type = type;
    
    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date[Op.gte] = new Date(startDate);
      if (endDate) where.date[Op.lte] = new Date(endDate);
    }

    const movements = await Movement.findAll({
      where,
      include: [
        { model: Product, as: 'product', include: [{ model: Category, as: 'category' }] },
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        { model: Supplier, as: 'supplier' }
      ],
      order: [['date', 'DESC']],
      limit: parseInt(limit)
    });

    res.json({
      success: true,
      count: movements.length,
      data: movements
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Créer un mouvement de stock
// @route   POST /api/movements
// @access  Private
exports.createMovement = async (req, res, next) => {
  try {
    const { productId, type, quantity, reason, notes, supplierId, unitPrice } = req.body;

    // Validation
    if (!productId || !type || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'Produit, type et quantité requis'
      });
    }

    // Récupérer le produit
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé'
      });
    }

    const previousStock = product.currentStock;
    let newStock = previousStock;

    // Calculer le nouveau stock selon le type de mouvement
    switch (type) {
      case 'entry':
        newStock = previousStock + parseFloat(quantity);
        break;
      case 'exit':
        newStock = previousStock - parseFloat(quantity);
        if (newStock < 0) {
          return res.status(400).json({
            success: false,
            message: 'Stock insuffisant pour cette opération'
          });
        }
        break;
      case 'adjustment':
        newStock = parseFloat(quantity);
        break;
      case 'return':
        newStock = previousStock + parseFloat(quantity);
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Type de mouvement invalide'
        });
    }

    // Calculer le prix total
    const price = unitPrice || product.unitPrice || 0;
    const totalPrice = price * quantity;

    // Créer le mouvement
    const movement = await Movement.create({
      productId,
      type,
      quantity: parseFloat(quantity),
      reason,
      notes,
      userId: req.user.id,
      supplierId,
      unitPrice: price,
      totalPrice,
      previousStock,
      newStock,
      date: new Date()
    });

    // Mettre à jour le stock du produit
    await product.update({ currentStock: newStock });

    // Récupérer le mouvement complet avec les relations
    const fullMovement = await Movement.findByPk(movement.id, {
      include: [
        { model: Product, as: 'product' },
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        { model: Supplier, as: 'supplier' }
      ]
    });

    res.status(201).json({
      success: true,
      data: fullMovement
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtenir l'historique d'un produit
// @route   GET /api/movements/product/:productId
// @access  Private
exports.getProductHistory = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { limit = 50 } = req.query;

    const movements = await Movement.findAll({
      where: { productId },
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        { model: Supplier, as: 'supplier' }
      ],
      order: [['date', 'DESC']],
      limit: parseInt(limit)
    });

    res.json({
      success: true,
      count: movements.length,
      data: movements
    });
  } catch (error) {
    next(error);
  }
};

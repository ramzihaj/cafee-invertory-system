const { Order, OrderItem, Product, User, Table, Movement } = require('../models');
const { sequelize } = require('../config/database');

// @desc    Créer une commande (Employee)
// @route   POST /api/orders
// @access  Private (Employee)
exports.createOrder = async (req, res, next) => {
  const t = await sequelize.transaction();

  try {
    const { tableId, items, notes } = req.body;

    // Vérifier la table
    const table = await Table.findByPk(tableId);
    if (!table) {
      await t.rollback();
      return res.status(404).json({
        success: false,
        message: 'Table non trouvée'
      });
    }

    // Vérifier si l'employé peut servir cette table
    if (table.assignedTo && table.assignedTo !== req.user.id) {
      await t.rollback();
      return res.status(403).json({
        success: false,
        message: 'Cette table n\'est pas assignée à vous'
      });
    }

    // Générer un numéro de commande
    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Créer la commande
    const order = await Order.create({
      orderNumber,
      tableId,
      employeeId: req.user.id,
      notes
    }, { transaction: t });

    let totalAmount = 0;

    // Créer les items de la commande
    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      
      if (!product) {
        await t.rollback();
        return res.status(404).json({
          success: false,
          message: `Produit ${item.productId} non trouvé`
        });
      }

      // Vérifier le stock
      if (product.currentStock < item.quantity) {
        await t.rollback();
        return res.status(400).json({
          success: false,
          message: `Stock insuffisant pour ${product.name}`
        });
      }

      const subtotal = parseFloat(product.unitPrice) * parseFloat(item.quantity);
      totalAmount += subtotal;

      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: product.unitPrice,
        subtotal,
        notes: item.notes
      }, { transaction: t });

      // Créer un mouvement de sortie
      await Movement.create({
        productId: item.productId,
        type: 'exit',
        quantity: item.quantity,
        reason: `Commande ${orderNumber}`,
        userId: req.user.id,
        unitPrice: product.unitPrice,
        totalPrice: subtotal,
        previousStock: product.currentStock,
        newStock: product.currentStock - item.quantity,
        date: new Date()
      }, { transaction: t });

      // Mettre à jour le stock
      await product.update({
        currentStock: product.currentStock - item.quantity
      }, { transaction: t });
    }

    // Mettre à jour le montant total
    await order.update({ totalAmount }, { transaction: t });

    // Mettre à jour le statut de la table
    await table.update({ status: 'occupied' }, { transaction: t });

    await t.commit();

    // Récupérer la commande complète
    const fullOrder = await Order.findByPk(order.id, {
      include: [
        { 
          model: OrderItem, 
          as: 'items',
          include: [{ model: Product, as: 'product' }]
        },
        { model: Table, as: 'table' },
        { model: User, as: 'employee', attributes: ['id', 'name'] }
      ]
    });

    res.status(201).json({
      success: true,
      data: fullOrder
    });
  } catch (error) {
    await t.rollback();
    next(error);
  }
};

// @desc    Obtenir toutes les commandes
// @route   GET /api/orders
// @access  Private
exports.getAllOrders = async (req, res, next) => {
  try {
    const { status, employeeId, startDate, endDate } = req.query;
    const where = {};

    if (status) where.status = status;
    
    // Si c'est un employé, ne montrer que ses commandes
    if (req.user.role === 'employee') {
      where.employeeId = req.user.id;
    } else if (employeeId) {
      where.employeeId = employeeId;
    }

    const orders = await Order.findAll({
      where,
      include: [
        { 
          model: OrderItem, 
          as: 'items',
          include: [{ model: Product, as: 'product' }]
        },
        { model: Table, as: 'table' },
        { model: User, as: 'employee', attributes: ['id', 'name'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mettre à jour le statut d'une commande
// @route   PUT /api/orders/:id/status
// @access  Private
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Commande non trouvée'
      });
    }

    await order.update({ status });

    // Si la commande est payée, libérer la table
    if (status === 'paid') {
      await order.update({ paidAt: new Date() });
      const table = await Table.findByPk(order.tableId);
      if (table) {
        await table.update({ status: 'available' });
      }
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtenir une commande par ID
// @route   GET /api/orders/:id
// @access  Private
exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        { 
          model: OrderItem, 
          as: 'items',
          include: [{ model: Product, as: 'product' }]
        },
        { model: Table, as: 'table' },
        { model: User, as: 'employee', attributes: ['id', 'name'] }
      ]
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Commande non trouvée'
      });
    }

    // Si c'est un employé, vérifier qu'il peut voir cette commande
    if (req.user.role === 'employee' && order.employeeId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Accès non autorisé'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};

module.exports = exports;

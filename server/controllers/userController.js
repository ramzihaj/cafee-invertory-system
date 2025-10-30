const { User, Order, OrderItem, Coupon } = require('../models');
const { Op } = require('sequelize');

// @desc    Obtenir tous les utilisateurs (Admin only)
// @route   GET /api/users
// @access  Private (Admin)
exports.getAllUsers = async (req, res, next) => {
  try {
    const { role, isActive } = req.query;
    const where = {};

    if (role) where.role = role;
    if (isActive !== undefined) where.isActive = isActive === 'true';

    const users = await User.findAll({
      where,
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Créer un utilisateur (Admin only)
// @route   POST /api/users
// @access  Private (Admin)
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, role, phone } = req.body;

    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'Cet email est déjà utilisé'
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      phone
    });

    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mettre à jour un utilisateur (Admin only)
// @route   PUT /api/users/:id
// @access  Private (Admin)
exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    // Ne pas permettre la modification du mot de passe via cette route
    const { password, ...updateData } = req.body;

    await user.update(updateData);

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Supprimer un utilisateur (Admin only)
// @route   DELETE /api/users/:id
// @access  Private (Admin)
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    // Soft delete
    await user.update({ isActive: false });

    res.json({
      success: true,
      message: 'Utilisateur désactivé avec succès'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtenir les statistiques d'un employé (Admin/Manager)
// @route   GET /api/users/:id/stats
// @access  Private (Admin/Manager)
exports.getUserStats = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { startDate, endDate } = req.query;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    const where = { employeeId: id, status: 'paid' };
    
    if (startDate || endDate) {
      where.paidAt = {};
      if (startDate) where.paidAt[Op.gte] = new Date(startDate);
      if (endDate) where.paidAt[Op.lte] = new Date(endDate);
    }

    const orders = await Order.findAll({
      where,
      include: [{ model: OrderItem, as: 'items' }]
    });

    const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.totalAmount), 0);
    const totalOrders = orders.length;

    res.json({
      success: true,
      data: {
        user,
        stats: {
          totalOrders,
          totalRevenue,
          averageOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = exports;

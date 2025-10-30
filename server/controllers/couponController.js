const { Coupon, User } = require('../models');
const crypto = require('crypto');

// @desc    Générer un coupon (Admin only)
// @route   POST /api/coupons
// @access  Private (Admin)
exports.generateCoupon = async (req, res, next) => {
  try {
    const { role, expiresIn } = req.body;

    // Générer un code unique
    const code = crypto.randomBytes(4).toString('hex').toUpperCase();

    const couponData = {
      code,
      role,
      createdBy: req.user.id
    };

    if (expiresIn) {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + parseInt(expiresIn));
      couponData.expiresAt = expiryDate;
    }

    const coupon = await Coupon.create(couponData);

    res.status(201).json({
      success: true,
      data: coupon
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtenir tous les coupons (Admin only)
// @route   GET /api/coupons
// @access  Private (Admin)
exports.getAllCoupons = async (req, res, next) => {
  try {
    const { isUsed, role } = req.query;
    const where = {};

    if (isUsed !== undefined) where.isUsed = isUsed === 'true';
    if (role) where.role = role;

    const coupons = await Coupon.findAll({
      where,
      include: [
        { model: User, as: 'creator', attributes: ['id', 'name', 'email'] },
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      count: coupons.length,
      data: coupons
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Vérifier un coupon
// @route   POST /api/coupons/verify
// @access  Public
exports.verifyCoupon = async (req, res, next) => {
  try {
    const { code } = req.body;

    const coupon = await Coupon.findOne({ where: { code } });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Code invalide'
      });
    }

    if (coupon.isUsed) {
      return res.status(400).json({
        success: false,
        message: 'Ce code a déjà été utilisé'
      });
    }

    if (coupon.expiresAt && new Date() > new Date(coupon.expiresAt)) {
      return res.status(400).json({
        success: false,
        message: 'Ce code a expiré'
      });
    }

    res.json({
      success: true,
      data: {
        role: coupon.role,
        code: coupon.code
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Utiliser un coupon lors de l'inscription
// @route   PUT /api/coupons/use
// @access  Public
exports.useCoupon = async (req, res, next) => {
  try {
    const { code, userId } = req.body;

    const coupon = await Coupon.findOne({ where: { code } });

    if (!coupon || coupon.isUsed) {
      return res.status(400).json({
        success: false,
        message: 'Code invalide ou déjà utilisé'
      });
    }

    await coupon.update({
      isUsed: true,
      usedBy: userId,
      usedAt: new Date()
    });

    res.json({
      success: true,
      message: 'Code utilisé avec succès'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Supprimer un coupon (Admin only)
// @route   DELETE /api/coupons/:id
// @access  Private (Admin)
exports.deleteCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.findByPk(req.params.id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Coupon non trouvé'
      });
    }

    await coupon.destroy();

    res.json({
      success: true,
      message: 'Coupon supprimé avec succès'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = exports;

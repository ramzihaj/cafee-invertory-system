const { Product, Category, Supplier } = require('../models');
const { Op } = require('sequelize');

// @desc    Obtenir tous les produits
// @route   GET /api/products
// @access  Private
exports.getAllProducts = async (req, res, next) => {
  try {
    const { search, category, lowStock, isActive } = req.query;

    const where = {};

    if (search) {
      where.name = { [Op.like]: `%${search}%` };
    }

    if (category) {
      where.categoryId = category;
    }

    if (isActive !== undefined) {
      where.isActive = isActive === 'true';
    }

    const products = await Product.findAll({
      where,
      include: [
        { model: Category, as: 'category' },
        { model: Supplier, as: 'supplier' }
      ],
      order: [['name', 'ASC']]
    });

    // Filtrer les produits en stock bas si demandé
    let filteredProducts = products;
    if (lowStock === 'true') {
      filteredProducts = products.filter(p => p.isLowStock());
    }

    res.json({
      success: true,
      count: filteredProducts.length,
      data: filteredProducts
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtenir un produit par ID
// @route   GET /api/products/:id
// @access  Private
exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        { model: Category, as: 'category' },
        { model: Supplier, as: 'supplier' }
      ]
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Créer un nouveau produit
// @route   POST /api/products
// @access  Private (Admin/Manager)
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    const fullProduct = await Product.findByPk(product.id, {
      include: [
        { model: Category, as: 'category' },
        { model: Supplier, as: 'supplier' }
      ]
    });

    res.status(201).json({
      success: true,
      data: fullProduct
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mettre à jour un produit
// @route   PUT /api/products/:id
// @access  Private (Admin/Manager)
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé'
      });
    }

    await product.update(req.body);

    const updatedProduct = await Product.findByPk(product.id, {
      include: [
        { model: Category, as: 'category' },
        { model: Supplier, as: 'supplier' }
      ]
    });

    res.json({
      success: true,
      data: updatedProduct
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Supprimer un produit (soft delete)
// @route   DELETE /api/products/:id
// @access  Private (Admin)
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé'
      });
    }

    // Soft delete
    await product.update({ isActive: false });

    res.json({
      success: true,
      message: 'Produit désactivé avec succès'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtenir les produits en stock bas
// @route   GET /api/products/alerts/low-stock
// @access  Private
exports.getLowStockProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        isActive: true
      },
      include: [
        { model: Category, as: 'category' },
        { model: Supplier, as: 'supplier' }
      ]
    });

    const lowStockProducts = products.filter(p => p.isLowStock());

    res.json({
      success: true,
      count: lowStockProducts.length,
      data: lowStockProducts
    });
  } catch (error) {
    next(error);
  }
};

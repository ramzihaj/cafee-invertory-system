const { Category, Product } = require('../models');

// @desc    Obtenir toutes les catégories
// @route   GET /api/categories
// @access  Private
exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product, as: 'products' }],
      order: [['name', 'ASC']]
    });

    res.json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtenir une catégorie par ID
// @route   GET /api/categories/:id
// @access  Private
exports.getCategory = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product, as: 'products' }]
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Catégorie non trouvée'
      });
    }

    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Créer une nouvelle catégorie
// @route   POST /api/categories
// @access  Private (Admin/Manager)
exports.createCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);

    res.status(201).json({
      success: true,
      data: category
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mettre à jour une catégorie
// @route   PUT /api/categories/:id
// @access  Private (Admin/Manager)
exports.updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Catégorie non trouvée'
      });
    }

    await category.update(req.body);

    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Supprimer une catégorie
// @route   DELETE /api/categories/:id
// @access  Private (Admin)
exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Catégorie non trouvée'
      });
    }

    // Vérifier s'il y a des produits liés
    const productsCount = await Product.count({ where: { categoryId: req.params.id } });
    
    if (productsCount > 0) {
      return res.status(400).json({
        success: false,
        message: 'Impossible de supprimer une catégorie contenant des produits'
      });
    }

    await category.destroy();

    res.json({
      success: true,
      message: 'Catégorie supprimée avec succès'
    });
  } catch (error) {
    next(error);
  }
};

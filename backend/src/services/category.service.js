const { Category, Article } = require('../models');
const { Op } = require('sequelize');

class CategoryService {
  /**
   * Get all categories
   */
  async getAllCategories(options = {}) {
    const { includeInactive = false, includeArticleCount = false } = options;

    const where = {};
    if (!includeInactive) {
      where.isActive = true;
    }

    const queryOptions = {
      where,
      order: [['name', 'ASC']]
    };

    if (includeArticleCount) {
      queryOptions.attributes = {
        include: [
          [
            require('sequelize').fn('COUNT', require('sequelize').col('articles.id')),
            'articleCount'
          ]
        ]
      };
      queryOptions.include = [{
        model: Article,
        as: 'articles',
        attributes: [],
        where: { status: 'published' },
        required: false
      }];
      queryOptions.group = ['Category.id'];
    }

    const categories = await Category.findAll(queryOptions);

    return categories;
  }

  /**
   * Get category by ID
   */
  async getCategoryById(id) {
    const category = await Category.findByPk(id);

    if (!category) {
      throw { status: 404, message: 'Category not found' };
    }

    return category;
  }

  /**
   * Get category by slug
   */
  async getCategoryBySlug(slug) {
    const category = await Category.findOne({ where: { slug } });

    if (!category) {
      throw { status: 404, message: 'Category not found' };
    }

    return category;
  }

  /**
   * Create new category
   */
  async createCategory(categoryData) {
    const { name, description } = categoryData;

    // Check if category already exists
    const existingCategory = await Category.findOne({
      where: { name: { [Op.iLike]: name } }
    });

    if (existingCategory) {
      throw { status: 409, message: 'Category with this name already exists' };
    }

    const category = await Category.create({
      name,
      description
    });

    return category;
  }

  /**
   * Update category
   */
  async updateCategory(id, updateData) {
    const category = await Category.findByPk(id);

    if (!category) {
      throw { status: 404, message: 'Category not found' };
    }

    // Check if name already exists (if updating name)
    if (updateData.name && updateData.name !== category.name) {
      const existingCategory = await Category.findOne({
        where: {
          name: { [Op.iLike]: updateData.name },
          id: { [Op.ne]: id }
        }
      });

      if (existingCategory) {
        throw { status: 409, message: 'Category with this name already exists' };
      }
    }

    const allowedFields = ['name', 'description', 'isActive'];
    const filteredData = {};
    allowedFields.forEach(field => {
      if (updateData[field] !== undefined) {
        filteredData[field] = updateData[field];
      }
    });

    // Update slug if name changed
    if (filteredData.name) {
      filteredData.slug = filteredData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    await category.update(filteredData);

    return category;
  }

  /**
   * Delete category
   */
  async deleteCategory(id) {
    const category = await Category.findByPk(id);

    if (!category) {
      throw { status: 404, message: 'Category not found' };
    }

    // Check if category has articles
    const articleCount = await Article.count({ where: { categoryId: id } });

    if (articleCount > 0) {
      throw { status: 400, message: 'Cannot delete category with existing articles. Please reassign or delete articles first.' };
    }

    await category.destroy();

    return { message: 'Category deleted successfully' };
  }
}

module.exports = new CategoryService();

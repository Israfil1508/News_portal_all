const { Article, User, Category } = require('../models');
const { Op } = require('sequelize');

class ArticleService {
  /**
   * Get all articles (public - only published)
   */
  async getPublicArticles(options = {}) {
    const { page = 1, limit = 10, categoryId, categorySlug, search, featured } = options;
    const offset = (page - 1) * limit;

    const where = { status: 'published' };

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { summary: { [Op.like]: `%${search}%` } },
        { content: { [Op.like]: `%${search}%` } }
      ];
    }

    if (featured === true) {
      where.isFeatured = true;
    }

    const includeOptions = [
      {
        model: User,
        as: 'author',
        attributes: ['id', 'username', 'firstName', 'lastName']
      },
      {
        model: Category,
        as: 'category',
        attributes: ['id', 'name', 'slug']
      }
    ];

    // Filter by category slug if provided
    if (categorySlug) {
      includeOptions[1].where = { slug: categorySlug };
      includeOptions[1].required = true;
    }

    const { count, rows } = await Article.findAndCountAll({
      where,
      include: includeOptions,
      limit,
      offset,
      order: [['publishedAt', 'DESC']],
      distinct: true
    });

    return {
      articles: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    };
  }

  /**
   * Get all articles (admin/editor - all statuses)
   */
  async getAllArticles(options = {}, user) {
    const { page = 1, limit = 10, status, categoryId, search, authorId } = options;
    const offset = (page - 1) * limit;

    const where = {};

    // Editors can only see their own articles
    if (user.role === 'editor') {
      where.authorId = user.id;
    } else if (authorId) {
      where.authorId = authorId;
    }

    if (status) {
      where.status = status;
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { summary: { [Op.like]: `%${search}%` } }
      ];
    }

    const { count, rows } = await Article.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'username', 'firstName', 'lastName']
        },
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name', 'slug']
        }
      ],
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      distinct: true
    });

    return {
      articles: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    };
  }

  /**
   * Get article by ID
   */
  async getArticleById(id, includeUnpublished = false) {
    const where = { id };

    if (!includeUnpublished) {
      where.status = 'published';
    }

    const article = await Article.findOne({
      where,
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'username', 'firstName', 'lastName']
        },
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name', 'slug']
        }
      ]
    });

    if (!article) {
      throw { status: 404, message: 'Article not found' };
    }

    return article;
  }

  /**
   * Get article by slug
   */
  async getArticleBySlug(slug, incrementView = true) {
    const article = await Article.findOne({
      where: { slug, status: 'published' },
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'username', 'firstName', 'lastName']
        },
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name', 'slug']
        }
      ]
    });

    if (!article) {
      throw { status: 404, message: 'Article not found' };
    }

    // Increment view count
    if (incrementView) {
      await article.increment('viewCount');
    }

    return article;
  }

  /**
   * Create new article
   */
  async createArticle(articleData, authorId, userRole = 'editor') {
    const { title, summary, content, imageUrl, categoryId, status, isFeatured } = articleData;

    // Verify category exists
    const category = await Category.findByPk(categoryId);
    if (!category) {
      throw { status: 400, message: 'Invalid category' };
    }

    // Determine final status based on user role
    let finalStatus = status || 'draft';
    
    // Editor can only create draft or pending articles
    if (userRole === 'editor') {
      if (finalStatus === 'published') {
        finalStatus = 'pending'; // Editor's "publish" goes to pending for approval
      }
    }

    const article = await Article.create({
      title,
      summary,
      content,
      imageUrl,
      categoryId,
      authorId,
      status: finalStatus,
      isFeatured: userRole === 'admin' ? (isFeatured || false) : false, // Only admin can feature
      publishedAt: finalStatus === 'published' ? new Date() : null
    });

    return this.getArticleById(article.id, true);
  }

  /**
   * Update article
   */
  async updateArticle(id, updateData, user) {
    const article = await Article.findByPk(id);

    if (!article) {
      throw { status: 404, message: 'Article not found' };
    }

    // Check permissions
    if (user.role === 'editor' && article.authorId !== user.id) {
      throw { status: 403, message: 'You can only edit your own articles' };
    }

    // Verify category if updating
    if (updateData.categoryId) {
      const category = await Category.findByPk(updateData.categoryId);
      if (!category) {
        throw { status: 400, message: 'Invalid category' };
      }
    }

    const allowedFields = ['title', 'summary', 'content', 'imageUrl', 'categoryId', 'status'];
    
    // Only admin can set isFeatured
    if (user.role === 'admin') {
      allowedFields.push('isFeatured');
    }
    
    const filteredData = {};
    allowedFields.forEach(field => {
      if (updateData[field] !== undefined) {
        filteredData[field] = updateData[field];
      }
    });

    // Editor can only set draft or pending, not published directly
    if (user.role === 'editor' && filteredData.status === 'published') {
      filteredData.status = 'pending'; // Goes to pending for admin approval
    }

    // Set publishedAt if status changed to published (only by admin)
    if (filteredData.status === 'published' && article.status !== 'published') {
      filteredData.publishedAt = new Date();
    }

    await article.update(filteredData);

    return this.getArticleById(article.id, true);
  }

  /**
   * Delete article
   */
  async deleteArticle(id, user) {
    const article = await Article.findByPk(id);

    if (!article) {
      throw { status: 404, message: 'Article not found' };
    }

    // Only admin can delete (already checked in middleware, but extra safety)
    if (user.role !== 'admin') {
      throw { status: 403, message: 'Only admin can delete articles' };
    }

    await article.destroy();

    return { message: 'Article deleted successfully' };
  }

  /**
   * Get featured articles
   */
  async getFeaturedArticles(limit = 5) {
    const articles = await Article.findAll({
      where: {
        status: 'published',
        isFeatured: true
      },
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'username', 'firstName', 'lastName']
        },
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name', 'slug']
        }
      ],
      limit,
      order: [['publishedAt', 'DESC']]
    });

    return articles;
  }

  /**
   * Get latest articles
   */
  async getLatestArticles(limit = 10) {
    const articles = await Article.findAll({
      where: { status: 'published' },
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'username', 'firstName', 'lastName']
        },
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name', 'slug']
        }
      ],
      limit,
      order: [['publishedAt', 'DESC']]
    });

    return articles;
  }
}

module.exports = new ArticleService();

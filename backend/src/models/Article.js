'use strict';

module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING(220),
      allowNull: false,
      unique: true
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: 'image_url'
    },
    status: {
      type: DataTypes.ENUM('draft', 'pending', 'published', 'archived'),
      defaultValue: 'draft'
    },
    viewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'view_count'
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'is_featured'
    },
    publishedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'published_at'
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'author_id',
      references: {
        model: 'users',
        key: 'id'
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'category_id',
      references: {
        model: 'categories',
        key: 'id'
      }
    }
  }, {
    tableName: 'articles',
    timestamps: true,
    underscored: true,
    hooks: {
      beforeValidate: (article) => {
        if (article.title && !article.slug) {
          const timestamp = Date.now();
          article.slug = article.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
            .substring(0, 200) + '-' + timestamp;
        }
      },
      beforeUpdate: (article) => {
        if (article.changed('status') && article.status === 'published' && !article.publishedAt) {
          article.publishedAt = new Date();
        }
      }
    }
  });

  Article.associate = function(models) {
    // Article belongs to User (Author)
    Article.belongsTo(models.User, {
      foreignKey: 'authorId',
      as: 'author'
    });

    // Article belongs to Category
    Article.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'category'
    });
  };

  return Article;
};

const authValidation = require('./auth.validation');
const userValidation = require('./user.validation');
const categoryValidation = require('./category.validation');
const articleValidation = require('./article.validation');
const { handleValidationErrors } = require('./validate');

module.exports = {
  ...authValidation,
  ...userValidation,
  ...categoryValidation,
  ...articleValidation,
  handleValidationErrors
};

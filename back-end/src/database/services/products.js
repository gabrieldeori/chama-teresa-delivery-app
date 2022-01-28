const models = require('../models');
const utils = require('../utils');

async function getAll() {
  const products = await models.Product.findAll();
  if (!products || products.length <= 0) return utils.errors.noProducts;
  const sendToFrontEnd = {
    success: true,
    message: 'Produtos Carregados',
    data: products,
  };
  return { sendToFrontEnd, statusCode: utils.status.OK };
}

module.exports = {
  getAll,
};

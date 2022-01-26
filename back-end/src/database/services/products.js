const models = require('../models');
const { errors, status } = require('../utils');

async function getAll() {
  const products = await models.Product.findAll();
  if (!products || products.length <= 0) return errors.noProducts;
  const sendToFrontEnd = {
    success: true,
    message: 'Produtos Carregados',
    data: products,
  };
  return { sendToFrontEnd, statusCode: status.OK };
}

module.exports = {
  getAll,
};

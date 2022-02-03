const models = require('../models');
const services = require('../services');
const utils = require('../utils');

async function create(req, res, nex) {
  const { products, userId, sellerId, totalPrice, deliveryAddress, deliveryNumber } = req.body;
  const saleInfo = {
    products,
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    statusOrder: utils.orderStatus.pendente,
  };

  const response = await services.orders.create(saleInfo);
  if (response.error) return nex(response);
  return res.status(response.statusCode).json(response.sendToFrontEnd);
}

async function getById(req, res, nex) {
  const { id } = req.params;
  const response = await services.orders.getById({ id });
  if (response.error) return nex(response);
  return res.status(response.statusCode).json(response.sendToFrontEnd);
}

async function getByUserId(req, res, nex) {
  const { email } = req.user;
  const { id } = await models.User.findOne({ where: { email } });
  const { dataValues: { role } } = await models.User.findOne({ where: { id } });
  const response = await services.orders.getByUserId({ role, id });
  if (response.error) return nex(response);
  return res.status(response.statusCode).json(response.sendToFrontEnd);
}

module.exports = {
  create,
  getById,
  getByUserId,
};

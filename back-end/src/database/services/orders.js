const models = require('../models');
const utils = require('../utils');
const { internalServerError } = require('../utils/errors');

async function changeStatus(id, status) {
  await models.Sale.update({ status }, { where: { id } });
  const sendToFrontEnd = {
    success: true,
    message: 'Status Atualizado',
    data: null,
  };
  return { sendToFrontEnd, statusCode: utils.status.OK };
 }

async function create(datas) {
  try {
    const createdSale = await models.Sale.create({
      userId: datas.userId,
      sellerId: datas.sellerId,
      totalPrice: datas.totalPrice,
      deliveryAddress: datas.deliveryAddress,
      deliveryNumber: datas.deliveryNumber,
      saleDate: new Date(),
      status: datas.statusOrder,
    });
    await datas.products.map(async (product) => {
      await models.SalesProducts.create({
        sale_id: createdSale.dataValues.id,
        product_id: product.id,
        quantity: product.quantity,
      });
    });

    const data = { id: createdSale.id };

    const sendToFrontEnd = {
      success: true,
      message: 'Venda criada com sucesso',
      data
    };
    return { sendToFrontEnd, statusCode: utils.status.CREATED };
  } catch (e) {
    console.log(e);
    return internalServerError;
  }
}

async function getById({ id }) { // /orders/:id
  const order = await models.Sale.findOne({
    where: { id },
    include: [{
      model: models.Product,
      as: 'products',
      through: { attributes: ['quantity'] } 
    }],
  });
  if (!order) return utils.errors.ordersNonexistent;

  const data = order;
  const sendToFrontEnd = {
    success: true,
    message: 'Pedido encontrado',
    data
  };
  return { sendToFrontEnd, statusCode: utils.status.OK };
 }

async function getByUserId({ role, id }) { // /orders/:role
  const { idKeyName } = utils.roles[role];
  const orders = await models.Sale.findAll({
    where: { [idKeyName]: id }, // user_id ou seller_id
    include: [{
      model: models.Product,
      as:'products',
      through: { attributes: ['quantity'] }
    }],
  });
  if (!orders || orders.length <= 0) return utils.errors.ordersNonexistent;
  const data = orders;
  const sendToFrontEnd = {
    success: true,
    message: 'Pedidos encontrados',
    data
  };
  return { sendToFrontEnd, statusCode: utils.status.OK };
 }

module.exports = {
  changeStatus,
  create,
  getById,
  getByUserId,
};

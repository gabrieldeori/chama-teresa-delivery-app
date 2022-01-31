import dataTestIds from './dataTestIds';

const customerProducts = {
  text: 'Produtos',
  route: '/customer/products',
  testId: dataTestIds['11'],
};

const customerOrders = {
  text: 'Meus Pedidos',
  route: '/customer/orders',
  testId: dataTestIds['12'],
};

const seller = {
  text: 'Produtos',
  route: '/seller/orders',
  testId: dataTestIds['12'],
};

const admin = {
  text: 'Gerenciar Usuários',
  route: '/admin',
  testId: dataTestIds['12'],
};

export default {
  '/customer': [customerProducts, customerOrders],
  '/seller': [seller],
  '/admin': [admin],
};

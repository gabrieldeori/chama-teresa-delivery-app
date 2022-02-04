const customerProducts = {
  text: 'Produtos',
  route: '/customer/products',
  testId: '11',
};

const customerOrders = {
  text: 'Meus Pedidos',
  route: '/customer/orders',
  testId: '12',
};

const seller = {
  text: 'Produtos',
  route: '/seller/orders',
  testId: '12',
};

const admin = {
  text: 'Gerenciar Usuários',
  route: '/admin/manage',
  testId: '12',
};

export default {
  '/customer': [customerProducts, customerOrders],
  '/seller': [seller],
  '/admin': [admin],
};

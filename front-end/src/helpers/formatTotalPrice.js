import calculateOrderTotalPrice from './calculateOrderTotalPrice';

export default (orderProducts, text = 'Total') => {
  const totalPrice = calculateOrderTotalPrice(orderProducts);

  return `${text}: R$ ${totalPrice.toFixed(2)}`;
};

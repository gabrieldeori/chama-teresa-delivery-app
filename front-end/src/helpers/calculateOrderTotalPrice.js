export default (orderProducts) => (
  orderProducts.reduce((total, { price, quantity }) => (
    total + (price * quantity)
  ), 0)
);

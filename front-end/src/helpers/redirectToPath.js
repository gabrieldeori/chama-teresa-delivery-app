export default (callback, role) => {
  switch (role) {
  case 'customer':
    callback('/customer/products');
    break;
  case 'seller':
    callback('/customer/orders');
    break;
  case 'admin':
    callback('/admin');
    break;
  default:
    callback('/');
  }
};

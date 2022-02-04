export default (callback, role) => {
  switch (role) {
  case 'customer':
    callback('/customer/products');
    break;
  case 'seller':
    callback('/seller/orders');
    break;
  case 'administrator':
    callback('/admin/manage');
    break;
  default:
    callback('/');
  }
};

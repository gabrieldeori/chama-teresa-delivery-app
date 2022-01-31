import React from 'react';
import { Routes, Route } from 'react-router-dom';
import * as Pages from '../pages';

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={ Pages.Login() } />
    <Route path="/customer/products" element={ Pages.CustomerProducts() } />
    <Route path="/customer/checkout" element={ Pages.CustomerCheckout() } />
    <Route path="/customer/orders" element={ Pages.CustomerOrders() } />
  </Routes>
);

export default AppRoutes;

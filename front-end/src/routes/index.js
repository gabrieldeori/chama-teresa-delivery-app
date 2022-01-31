import React from 'react';
import { Routes, Route } from 'react-router-dom';
import * as Pages from '../pages';

const AppRoutes = () => (
  <Routes>
    <Route path="/customer/products" element={ Pages.CustomerProducts() } />
    <Route path="/customer/checkout" element={ Pages.CustomerCheckout() } />
  </Routes>
);

export default AppRoutes;

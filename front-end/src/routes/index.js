import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CustomerProducts from '../pages';

const AppRoutes = () => (
  <Routes>
    <Route path="/customer/products" element={ CustomerProducts() } />
  </Routes>
);

export default AppRoutes;

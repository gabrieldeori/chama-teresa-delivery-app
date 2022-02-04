import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import * as Pages from '../pages';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={ <Navigate to="/login" /> } />
    <Route path="/login" element={ <Pages.Login /> } />
    <Route path="/customer/products" element={ <Pages.CustomerProducts /> } />
    <Route path="/customer/checkout" element={ <Pages.CustomerCheckout /> } />
    <Route path="/customer/orders" element={ <Pages.CustomerOrders /> } />
    <Route path="/customer/orders/:id" element={ <Pages.CustomerOrderDetails /> } />
    <Route path="/seller/orders" element={ <Pages.SellerOrders /> } />
    <Route path="/seller/orders/:id" element={ <Pages.SellerOrderDetails /> } />
    <Route path="/admin/manage" element={ <Pages.AdminManage /> } />
    <Route path="/register" element={ <Pages.Register /> } />
  </Routes>
);

export default AppRoutes;

import React, { useEffect, useState } from 'react';

import { Navbar, OrderCard } from '../components';

import { getOrders } from '../services';
import { navPages } from '../utils';

const { io } = require('socket.io-client');

const socket = io('http://localhost:3001');

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => getOrders(setOrders), []);

  socket.on('updateFrontStatus', () => {
    getOrders(setOrders);
  });

  return (
    <>
      <header>
        <Navbar navPages={ navPages['/seller'] } />
      </header>
      <main>
        {
          orders.map((order) => (
            <OrderCard
              key={ order.id }
              { ...order }
              testIds={ ['48', '49', '50', '51', '52'] }
              userRole="seller"
            />
          ))
        }
      </main>
    </>
  );
};

export default SellerOrders;

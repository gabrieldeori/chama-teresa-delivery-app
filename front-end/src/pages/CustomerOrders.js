import React, { useEffect, useState } from 'react';

import { Navbar, OrderCard } from '../components';

import { getOrders } from '../services';
import { navPages } from '../utils';

const { io } = require('socket.io-client');

const socket = io('http://localhost:3001');

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);

  socket.on('updateFrontStatus', () => {
    getOrders(setOrders);
  });

  useEffect(() => getOrders(setOrders), []);

  return (
    <>
      <header>
        <Navbar navPages={ navPages['/customer'] } />
      </header>
      <main>
        {
          orders.map((order) => (
            <OrderCard
              key={ order.id }
              { ...order }
              testIds={ ['33', '34', '35', '36'] }
              userRole="customer"
            />
          ))
        }
      </main>
    </>
  );
};

export default CustomerOrders;

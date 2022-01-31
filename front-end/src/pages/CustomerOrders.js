import React, { useEffect, useState } from 'react';

import { Navbar, OrderCard } from '../components';

import { getOrders } from '../services';
import { navPages } from '../utils';

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => getOrders(setOrders), []);

  return (
    <>
      <header>
        <Navbar navPages={ navPages['/customer'] } />
      </header>
      <main>
        {
          orders.map((order) => (
            <OrderCard key={ order.id } { ...order } testIds={ ['33', '34', '35', ''] } />
          ))
        }
      </main>
    </>
  );
};

export default CustomerOrders;

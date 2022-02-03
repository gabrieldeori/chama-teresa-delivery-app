import React, { useEffect, useState } from 'react';

import { Navbar, OrderCard } from '../components';

import { getOrders } from '../services';
import { navPages } from '../utils';

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => getOrders(setOrders), []);

  return (
    <>
      <header>
        <Navbar navPages={ navPages['/seller'] } />
      </header>
      <main>
        {
          orders.map((order) => (
            <OrderCard key={ order.id } { ...order } testIds={ ['48', '49', '50', '51', '52'] } />
          ))
        }
      </main>
    </>
  );
};

export default SellerOrders;

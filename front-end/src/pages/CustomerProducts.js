import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Navbar, ProductCard, Button } from '../components';

import { getProducts } from '../services';
import { dataTestIds, navPages } from '../utils';
import { calculateOrderTotalPrice } from '../helpers';

const CustomerProducts = () => {
  const [products, setProducts] = useState([]);

  const orderProducts = useSelector((state) => state.customer.orderProducts);

  useEffect(() => getProducts(setProducts), []);

  const formatTotalPrice = () => (
    `Ver carrinho: R$ ${calculateOrderTotalPrice(orderProducts).toFixed(2)}`
  );

  return (
    <>
      <header>
        <Navbar navPages={ navPages['/customer'] } />
      </header>
      <main>
        {
          products.map((product) => (
            <ProductCard key={ product.id } { ...product } />
          ))
        }

        <Button
          text={ formatTotalPrice() }
          route="/customer/checkout"
          testId={ dataTestIds['79'] }
        />
        <p hidden data-testid={ dataTestIds['21'] }>
          { calculateOrderTotalPrice(orderProducts) }
        </p>
      </main>
    </>
  );
};

export default CustomerProducts;

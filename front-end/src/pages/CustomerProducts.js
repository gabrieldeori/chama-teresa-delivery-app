import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Navbar, ProductCard, Button } from '../components';

import { getProducts } from '../services';
import { dataTestIds, navPages } from '../utils';
import { formatTotalPrice } from '../helpers';

const CustomerProducts = () => {
  const [products, setProducts] = useState([]);

  const orderProducts = useSelector((state) => state.customer.orderProducts);

  useEffect(() => getProducts(setProducts), []);

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
          text={ formatTotalPrice(orderProducts, 'Ver carrinho') }
          route="/customer/checkout"
          testId={ dataTestIds['79'] }
        />
        <p hidden data-testid={ dataTestIds['21'] }>
          { formatTotalPrice(orderProducts, 'Ver carrinho') }
        </p>
      </main>
    </>
  );
};

export default CustomerProducts;

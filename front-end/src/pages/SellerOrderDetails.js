import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Navbar, ListItem } from '../components';

import { getOrderById } from '../services';
import { dataTestIds, navPages } from '../utils';
import { calculateOrderTotalPrice, formatNumber, formatDate } from '../helpers';

const SellerOrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState({
    id: '',
    saleDate: '',
    status: '',
    products: [],
  });
  const { id: paramsId } = useParams();

  useEffect(() => getOrderById(setOrderDetails, paramsId), [paramsId]);

  return (
    <>
      <header>
        <Navbar navPages={ navPages['/seller'] } />
      </header>
      <main>
        <section>
          <h3>Detalhe do Pedido</h3>
          <div>
            <span data-testid={ dataTestIds['54'] }>{ orderDetails.id }</span>
            <span
              data-testid={ dataTestIds['56'] }
            >
              { formatDate(orderDetails.saleDate) }
            </span>
            <span
              data-testid={ dataTestIds['55'] }
            >
              { orderDetails.status }
            </span>
            <button
              type="button"
              onClick={ () => {} }
              data-testid={ dataTestIds['57'] }
            >
              Preparar pedido
            </button>
            <button
              type="button"
              onClick={ () => {} }
              data-testid={ dataTestIds['58'] }
              disabled
            >
              Saiu para entrega
            </button>
          </div>
          <div>
            <span>Item</span>
            <span>Descrição</span>
            <span>Quantidade</span>
            <span>Valor Unitário</span>
            <span>Sub-total</span>
          </div>
          {
            orderDetails.products.map((product, index) => (
              <ListItem
                key={ product.id }
                index={ index }
                itemNumber={ index + 1 }
                name={ product.name }
                testIds={ ['59', '60', '61', '62', '63'] }
                info1={ product.SalesProducts.quantity }
                info2={ product.price }
                info3={ (product.SalesProducts.quantity * product.price) }
              />
            ))
          }

          <p data-testid={ dataTestIds['64'] }>
            { formatNumber(calculateOrderTotalPrice(orderDetails.products
              .map(({ SalesProducts: { quantity }, price }) => ({ quantity, price })))) }
          </p>
        </section>
      </main>
    </>
  );
};

export default SellerOrderDetails;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Navbar, ListItem } from '../components';

import { getOrderById } from '../services';
import { dataTestIds, navPages } from '../utils';
import { calculateOrderTotalPrice, formatNumber, formatDate } from '../helpers';

const CustomerOrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState({
    id: '',
    saleDate: '',
    status: '',
    sellerName: '',
    products: [],
  });
  const { id: paramsId } = useParams();

  useEffect(() => getOrderById(setOrderDetails, paramsId), [paramsId]);

  return (
    <>
      <header>
        <Navbar navPages={ navPages['/customer'] } />
      </header>
      <main>
        <section>
          <h3>Detalhe do Pedido</h3>
          <div>
            <span data-testid={ dataTestIds['37'] }>{ orderDetails.id }</span>
            <span data-testid={ dataTestIds['38'] }>{ orderDetails.sellerName }</span>
            <span data-testid={ dataTestIds['39'] }>{ formatDate(orderDetails.saleDate) }</span>
            <span data-testid={ dataTestIds['40'] }>{ orderDetails.status }</span>
            <button
              type="button"
              onClick={ () => {} }
              data-testid={ dataTestIds['47'] }
              disabled={ true }
            >
              { orderDetails.status === 'Pendente' ? 'Marcar como entregue' : 'Entregue' }
            </button>
          </div>
          <div>
            <span>Item</span>
            <span>Descrição</span>
            <span>Quantidade</span>
            <span>Valor Unitário</span>
            <span>Sub-total</span>
            <span>Remover Item</span>
          </div>
          {
            orderDetails.products.map((product, index) => (
              <ListItem
                key={ product.id }
                index={ index }
                productNumber={ index + 1 }
                name={ product.name }
                testIds={ ['41', '42', '43', '44', '45'] }
                info1={ product.SalesProducts.quantity }
                info2={ product.price }
                info3={ (product.SalesProducts.quantity * product.price) }
              />
            ))
          }

          <p data-testid={ dataTestIds['46'] }>
            { formatNumber(calculateOrderTotalPrice(orderDetails.products
              .map(({ SalesProducts: { quantity }, price }) => ({ quantity, price })))) }
          </p>
        </section>
      </main>
    </>
  );
};

export default CustomerOrderDetails;

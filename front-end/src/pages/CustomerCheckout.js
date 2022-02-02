import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { removeProductFromOrder } from '../redux/reducer/customerSlice';
import { Navbar, ListItem, DeliveryForm, Button } from '../components';

import { dataTestIds, navPages } from '../utils';
import { formatTotalPrice } from '../helpers';

const CustomerCheckout = () => {
  const orderProducts = useSelector((state) => state.customer.orderProducts);
  const dispatch = useDispatch();

  return (
    <>
      <header>
        <Navbar navPages={ navPages['/customer'] } />
      </header>
      <main>
        <section>
          <h3>Finalizar Pedido</h3>
          <div>
            <span>Item</span>
            <span>Descrição</span>
            <span>Quantidade</span>
            <span>Valor Unitário</span>
            <span>Sub-total</span>
            <span>Remover Item</span>
          </div>
          {
            orderProducts.map((product, index) => (
              <ListItem
                key={ product.id }
                index={ index }
                productNumber={ index + 1 }
                name={ product.name }
                testIds={ ['22', '23', '24', '25', '26', '27'] }
                callback={ (name) => dispatch(removeProductFromOrder(name)) }
                info1={ product.quantity }
                info2={ product.price }
                info3={ `${(product.quantity * product.price).toFixed(2)}` }
                btn="Remover"
              />
            ))
          }

          <Button
            text={ formatTotalPrice(orderProducts) }
            route="/customer/checkout"
          />
          <p hidden data-testid={ dataTestIds['28'] }>
            { formatTotalPrice(orderProducts) }
          </p>
        </section>
        <section>
          <h3>Detalhes e Endereço para Entrega</h3>
          <DeliveryForm />
        </section>
      </main>
    </>
  );
};

export default CustomerCheckout;

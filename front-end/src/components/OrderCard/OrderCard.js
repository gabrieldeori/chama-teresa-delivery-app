import React from 'react';
import PropTypes from 'prop-types';

import OrderStatus from './OrderStatus';
import './OrderCard.css';

import dataTestIds from '../../data/dataTestIds';
import pad from '../../helpers/pad';

const OrderCard = (orderProps) => {
  const {
    id, totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate, status } = orderProps;

  const formattedPrice = `R$ ${String(totalPrice.toFixed(2)).replace('.', ',')}`;
  const formattedAddress = `${deliveryAddress}, ${deliveryNumber}`;

  return (
    <section className="order-card-container">
      <div data-testid={ dataTestIds['48'] } className="order-id">
        <p>Pedido</p>
        <p>{ pad(id) }</p>
      </div>
      <section className="order-middle-container">
        <div className="order-middle-top">
          <OrderStatus status={ status } />
          <div className="order-date-total-price">
            <p data-testid={ dataTestIds['50'] }>{ saleDate }</p>
            <p data-testid={ dataTestIds['51'] }>{ formattedPrice }</p>
          </div>
        </div>
        {
          deliveryAddress && (
            <div data-testid={ dataTestIds['52'] } className="order-middle-bottom">
              { formattedAddress }
            </div>
          )
        }
      </section>
    </section>
  );
};

const { string, number, exact } = PropTypes;

OrderCard.defaultProps = {
  deliveryAddress: '',
  deliveryNumber: '',
};

OrderCard.propTypes = exact({
  id: number.isRequired,
  totalPrice: number.isRequired,
  deliveryAddress: string,
  deliveryNumber: string,
  saleDate: string.isRequired,
  status: string.isRequired,
}).isRequired;

export default OrderCard;

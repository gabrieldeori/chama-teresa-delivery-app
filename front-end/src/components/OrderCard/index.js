import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import OrderStatus from './OrderStatus';
import './style.css';

import { dataTestIds } from '../../utils';
import { pad, formatDate } from '../../helpers';

const OrderCard = (orderProps) => {
  const {
    id, totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate, status, testIds, userRole } = orderProps;

  const navigate = useNavigate();

  const formattedPrice = `R$ ${totalPrice.replace('.', ',')}`;
  const formattedAddress = `${deliveryAddress}, ${deliveryNumber}`;

  const handleClick = () => navigate(`/${userRole}/orders/${id}`);

  return (
    <button className="order-card-container" type="button" onClick={ handleClick }>
      <div data-testid={ `${dataTestIds[testIds[0]]}${id}` } className="order-id">
        <p>Pedido</p>
        <p>{ pad(id) }</p>
      </div>
      <section className="order-middle-container">
        <div className="order-middle-top">
          <OrderStatus status={ status } testId={ `${dataTestIds[testIds[1]]}${id}` } />
          <div className="order-date-total-price">
            <p
              data-testid={ `${dataTestIds[testIds[2]]}${id}` }
            >
              { formatDate(saleDate) }
            </p>
            <p data-testid={ `${dataTestIds[testIds[3]]}${id}` }>{ formattedPrice }</p>
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
    </button>
  );
};

const { string, number, arrayOf, exact } = PropTypes;

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
  testIds: arrayOf([string.isRequired]).isRequired,
  userRole: string.isRequired,
}).isRequired;

export default OrderCard;

import React from 'react';
import PropTypes from 'prop-types';

import dataTestIds from '../../data/dataTestIds';

const OrderStatus = ({ status, index }) => {
  const style = {
    pendente: 'rgba(204, 184, 0, 0.75)',
    preparando: 'rgba(102, 204, 0, 0.75)',
    entregue: 'rgba(0, 204, 155, 0.75)',
  };

  const formattedStatus = status.toUpperCase();

  return (
    <div
      className="delivery-status"
      style={ { backgroundColor: style[status] } }
      data-testid={ `${dataTestIds['34']}${index}` }
    >
      { formattedStatus }
    </div>
  );
};

const { string, number } = PropTypes;

OrderStatus.propTypes = {
  status: string.isRequired,
  index: number.isRequired,
};

export default OrderStatus;

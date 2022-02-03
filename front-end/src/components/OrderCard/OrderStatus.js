import React from 'react';
import PropTypes from 'prop-types';

const OrderStatus = ({ status, testId }) => {
  const style = {
    pendente: 'rgba(204, 184, 0, 0.75)',
    preparando: 'rgba(102, 204, 0, 0.75)',
    entregue: 'rgba(0, 204, 155, 0.75)',
  };

  return (
    <div
      className="delivery-status"
      style={ { backgroundColor: style[status.toLowerCase()] } }
      data-testid={ testId }
    >
      { status }
    </div>
  );
};

const { string } = PropTypes;

OrderStatus.propTypes = {
  status: string.isRequired,
  testId: string.isRequired,
};

export default OrderStatus;

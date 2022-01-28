import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ProductInput = ({ name, index }) => {
  const [qtd, setQtd] = useState(0);

  const increaseQtd = () => {
    setQtd((prevQtd) => prevQtd + 1);
  };

  const decreaseQtd = () => {
    setQtd((prevQtd) => {
      if (prevQtd !== 0) return prevQtd - 1;
      return 0;
    });
  };

  const renderButton = (callback, sign, addOrRm) => (
    <button
      data-testid={ `customer_products__button-card-${addOrRm}-item-${index}` }
      type="button"
      onClick={ callback }
    >
      { sign }
    </button>
  );

  return (
    <section className="product-card-input-container">
      <p data-testid={ `customer_products__element-card-title-${index}` }>
        { name }
      </p>
      <section className="product-card-input">
        { renderButton(decreaseQtd, '-', 'rm') }
        <span data-testid={ `customer_products__input-card-quantity-${index}` }>
          { qtd }
        </span>
        { renderButton(increaseQtd, '+', 'add') }
      </section>
    </section>
  );
};

const { string, number } = PropTypes;

ProductInput.propTypes = {
  name: string.isRequired,
  index: number.isRequired,
};

export default ProductInput;

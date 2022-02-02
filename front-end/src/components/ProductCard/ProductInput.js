import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import {
  addProductOnOrder,
  removeProductFromOrder,
  updateOrderProducts } from '../../redux/reducer/customerSlice';

import { dataTestIds } from '../../utils';

const ProductInput = ({ id, name, price }) => {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();

  const handleChange = ({ target }) => {
    const value = Number(target.value);
    setQuantity((prevQtd) => {
      if (value <= 0) {
        dispatch(removeProductFromOrder(name));
        return 0;
      }
      if (prevQtd === 0) {
        dispatch(addProductOnOrder({ id, name, price, quantity: value }));
      }
      dispatch(updateOrderProducts({ id, name, quantity: value }));
      return value;
    });
  };

  const increaseQtd = () => {
    setQuantity((prevQtd) => {
      if (prevQtd === 0) {
        dispatch(addProductOnOrder({ id, name, price, quantity: 1 }));
        return 1;
      }
      dispatch(updateOrderProducts({ id, name, quantity: prevQtd + 1 }));
      return prevQtd + 1;
    });
  };

  const decreaseQtd = () => {
    setQuantity((prevQtd) => {
      if (prevQtd === 0) return 0;
      if (prevQtd === 1) {
        dispatch(removeProductFromOrder(name));
        return 0;
      }
      dispatch(updateOrderProducts({ id, name, quantity: prevQtd - 1 }));
      return prevQtd - 1;
    });
  };

  return (
    <section className="product-card-input-container">
      <p data-testid={ `${dataTestIds['15']}${id}` }>
        { name }
      </p>
      <section className="product-card-input">
        <button
          data-testid={ `${dataTestIds['19']}${id}` }
          type="button"
          onClick={ decreaseQtd }
        >
          -
        </button>
        <input
          type="number"
          value={ quantity }
          onChange={ handleChange }
          data-testid={ `${dataTestIds['20']}${id}` }
        />
        <button
          data-testid={ `${dataTestIds['18']}${id}` }
          type="button"
          onClick={ increaseQtd }
        >
          +
        </button>
      </section>
    </section>
  );
};

const { string, number } = PropTypes;

ProductInput.propTypes = {
  id: number.isRequired,
  name: string.isRequired,
  price: string.isRequired,
};

export default ProductInput;

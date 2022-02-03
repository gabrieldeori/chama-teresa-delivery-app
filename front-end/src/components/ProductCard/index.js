import React from 'react';
import PropTypes from 'prop-types';

import ProductInput from './ProductInput';
import './style.css';

import { dataTestIds } from '../../utils';

const ProductCard = ({ id, name, price, urlImage }) => {
  const formattedPrice = `${price.replace('.', ',')}`;

  return (
    <section className="product-card-container">
      <span
        data-testid={ `${dataTestIds['16']}${id}` }
      >
        { formattedPrice }
      </span>
      <img
        data-testid={ `${dataTestIds['17']}${id}` }
        src={ urlImage }
        alt={ name }
      />
      <ProductInput id={ id } name={ name } price={ price } />
    </section>
  );
};

const { string, number } = PropTypes;

ProductCard.propTypes = {
  id: number.isRequired,
  name: string.isRequired,
  price: string.isRequired,
  urlImage: string.isRequired,
};

export default ProductCard;

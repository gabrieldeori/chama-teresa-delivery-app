import React from 'react';
import PropTypes from 'prop-types';

import ProductInput from './ProductInput';

import './ProductCard.css';

const ProductCard = ({ name, price, urlImage, index }) => {
  const formattedPrice = `R$ ${String(price.toFixed(2)).replace('.', ',')}`;

  return (
    <section className="product-card-container">
      <span
        data-testid={ `customer_products__element-card-price-${index}` }
      >
        { formattedPrice }
      </span>
      <img
        data-testid={ `customer_products__img-card-bg-image-${index}` }
        src={ urlImage }
        alt={ name }
      />
      <ProductInput name={ name } index={ index } />
    </section>
  );
};

const { string, number } = PropTypes;

ProductCard.propTypes = {
  name: string.isRequired,
  price: number.isRequired,
  urlImage: string.isRequired,
  index: number.isRequired,
};

export default ProductCard;

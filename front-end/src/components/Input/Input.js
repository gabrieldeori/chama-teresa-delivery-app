import React from 'react';
import PropTypes from 'prop-types';

import { dataTestIds } from '../../utils';

const Input = (props) => {
  const { label, type, testId, value, placeholder, callback } = props;

  const handleChange = ({ target }) => {
    callback(target.value);
  };

  return (
    <label htmlFor={ label }>
      { label }
      <input
        id={ label }
        data-testid={ dataTestIds[testId] }
        type={ type }
        value={ value }
        placeholder={ placeholder }
        onChange={ handleChange }
      />
    </label>
  );
};

const { string, func } = PropTypes;

Input.propTypes = {
  label: string.isRequired,
  type: string.isRequired,
  testId: string.isRequired,
  value: string.isRequired,
  placeholder: string.isRequired,
  callback: func.isRequired,
};

export default Input;

import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import dataTestIds from '../../data/dataTestIds';

const Button = ({ text, route, testId, disabled }) => {
  const navigate = useNavigate();

  const handleRedirect = (link) => {
    navigate(link);
  };

  return (
    <button
      data-testid={ dataTestIds[testId] }
      type="button"
      onClick={ () => handleRedirect(route) }
      disabled={ disabled }
    >
      { text }
    </button>
  );
};

const { string, bool } = PropTypes;

Button.defaultProps = {
  disabled: false,
};

Button.propTypes = {
  text: string.isRequired,
  route: string.isRequired,
  testId: string.isRequired,
  disabled: bool,
};

export default Button;

import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const NavButton = ({ text, route, testId }) => {
  const navigate = useNavigate();

  const handleRedirect = (callback, link) => {
    callback(link);
  };

  return (
    <button
      data-testid={ testId }
      type="button"
      onClick={ () => handleRedirect(navigate, route) }
    >
      { text }
    </button>
  );
};

const { string } = PropTypes;

NavButton.propTypes = {
  text: string.isRequired,
  route: string.isRequired,
  testId: string.isRequired,
};

export default NavButton;

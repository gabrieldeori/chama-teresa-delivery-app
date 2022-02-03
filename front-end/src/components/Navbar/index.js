import React from 'react';
import PropTypes from 'prop-types';

import NavButton from '../Button';
import './style.css';

import { dataTestIds } from '../../utils';

const Navbar = ({ navPages }) => {
  const { name: username = '' } = JSON.parse(localStorage.getItem('user'));

  return (
    <nav className="navbar-container">
      <section className="navbar-redirect-button">
        {
          navPages.map(({ text, route, testId }) => (
            <NavButton
              key={ text }
              text={ text }
              route={ route }
              testId={ testId }
            />
          ))
        }
      </section>
      <section className="navbar-username-logout">
        <section data-testid={ dataTestIds['13'] }>
          { username }
        </section>
        <NavButton
          text="Sair"
          route="/"
          testId="14"
        />
      </section>
    </nav>
  );
};

const { arrayOf, exact, string } = PropTypes;

Navbar.propTypes = {
  navPages: arrayOf(exact({
    text: string.isRequired,
    route: string.isRequired,
    testId: string.isRequired,
  })).isRequired,
};

export default Navbar;

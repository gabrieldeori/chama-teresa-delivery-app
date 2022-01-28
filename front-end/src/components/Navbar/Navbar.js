import React from 'react';
import PropTypes from 'prop-types';

import NavButton from '../Button/Button';
import './Navbar.css';

import dataTestIds from '../../data/dataTestIds';

const Navbar = ({ navPages, username }) => (
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
        testId={ dataTestIds['14'] }
      />
    </section>
  </nav>
);

const { arrayOf, exact, string } = PropTypes;

Navbar.propTypes = {
  navPages: arrayOf(exact({
    text: string.isRequired,
    route: string.isRequired,
    testId: string.isRequired,
  })).isRequired,
  username: string.isRequired,
};

export default Navbar;

import React from 'react';
import PropTypes from 'prop-types';

import NavButton from './NavButton';

const renderNavPages = (pages) => (
  pages.map(({ text, route, testId }) => (
    <NavButton
      key={ text }
      text={ text }
      route={ route }
      testId={ testId }
    />
  ))
);

const renderUserFullName = (username) => (
  <section
    data-testid="customer_products__element-navbar-user-full-name"
  >
    { username }
  </section>
);

const renderLogoutButton = () => (
  <NavButton
    text="Sair"
    route="/"
    testId="customer_products__element-navbar-link-logout"
  />
);

const Navbar = ({ pages, username }) => (
  <nav>
    { renderNavPages(pages) }
    { renderUserFullName(username) }
    { renderLogoutButton() }
  </nav>
);

const { arrayOf, exact, string } = PropTypes;

Navbar.propTypes = {
  pages: arrayOf(exact({
    text: string.isRequired,
    route: string.isRequired,
    testId: string.isRequired,
  })).isRequired,
  username: string.isRequired,
};

export default Navbar;

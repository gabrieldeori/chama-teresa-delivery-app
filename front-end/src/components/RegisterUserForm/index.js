import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getUsers } from '../../services';
import { dataTestIds } from '../../utils';

const CONFLICT = 409;
const POST_REGISTER_URL = 'http://localhost:3001/register';

const RegisterUserForm = ({ callback }) => {
  const [registerUserForm, setRegisterUserForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'seller',
  });

  const [hidden, setHidden] = useState(true);
  const { name, email, password, role } = registerUserForm;

  const [disable, setDisable] = useState(true);

  useEffect(() => {
    const handleValidation = () => {
      const MIN_NAME = 12;
      const MIN_PASSWORD = 6;
      const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (name.length < MIN_NAME
        || !email.match(regex)
        || password.length < MIN_PASSWORD) {
        return setDisable(true);
      }
      return setDisable(false);
    };
    handleValidation();
  }, [name, email, password]);

  function handleChange({ target }) {
    const { id, value } = target;
    setRegisterUserForm((info) => ({
      ...info,
      [id]: value,
    }));
  }

  const registerOK = async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const dataFetch = await fetch(POST_REGISTER_URL, {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerUserForm),
    });
    if (dataFetch.status === CONFLICT) {
      setHidden(false);
    } else {
      setHidden(true);
      getUsers(callback);
    }
  };

  return (
    <>
      <form>
        <input
          type="text"
          placeholder="Nome e sobrenome"
          data-testid={ dataTestIds['65'] }
          id="name"
          value={ name }
          onChange={ handleChange }
        />
        <input
          type="text"
          placeholder="seu-email@site.com.br"
          data-testid={ dataTestIds['66'] }
          id="email"
          value={ email }
          onChange={ handleChange }
        />
        <input
          type="text"
          placeholder="**********"
          data-testid={ dataTestIds['78'] }
          id="password"
          value={ password }
          onChange={ handleChange }
        />
        <select
          data-testid={ dataTestIds['68'] }
          id="role"
          value={ role }
          onChange={ handleChange }
        >
          <option value="seller">Vendedor</option>
          <option value="customer">Consumidor</option>
          <option value="administrator">Administrador</option>
        </select>
        <button
          type="button"
          data-testid={ dataTestIds['69'] }
          disabled={ disable }
          onClick={ registerOK }
        >
          CADASTRAR
        </button>
      </form>
      <p
        data-testid={ dataTestIds['75'] }
        hidden={ hidden }
      >
        Usuário já cadastrado!
      </p>
    </>
  );
};

const { func } = PropTypes;

RegisterUserForm.propTypes = {
  callback: func.isRequired,
};

export default RegisterUserForm;

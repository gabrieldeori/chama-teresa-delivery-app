import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { dataTestIds } from '../utils';

const CONFLICT = 409;
const POST_REGISTER_URL = 'http://localhost:3001/register';

const Register = () => {
  const [registerForm, setregisterForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });

  const [hidden, setHidden] = useState(true);
  const { name, email, password } = registerForm;

  const [disable, setDisable] = useState(true);

  const navigate = useNavigate();

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
    setregisterForm((info) => ({
      ...info,
      [id]: value,
    }));
  }

  const registerOK = async () => {
    const dataFetch = await fetch(POST_REGISTER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerForm),
    });
    const { data } = await dataFetch.json();
    if (dataFetch.status === CONFLICT) {
      setHidden(false);
    } else {
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/customer/products');
    }
  };

  return (
    <>
      <form>
        <input
          type="text"
          placeholder="Seu nome"
          data-testid={ dataTestIds['6'] }
          id="name"
          value={ name }
          onChange={ handleChange }
        />
        <input
          type="text"
          placeholder="seu-email@site.com.br"
          data-testid={ dataTestIds['7'] }
          id="email"
          value={ email }
          onChange={ handleChange }
        />
        <input
          type="text"
          placeholder="**********"
          data-testid={ dataTestIds['8'] }
          id="password"
          value={ password }
          onChange={ handleChange }
        />
        <button
          type="button"
          data-testid={ dataTestIds['9'] }
          disabled={ disable }
          onClick={ registerOK }
        >
          CADASTRAR
        </button>
      </form>
      <p
        data-testid={ dataTestIds['10'] }
        hidden={ hidden }
      >
        Usuário já cadastrado!
      </p>
    </>
  );
};

export default Register;

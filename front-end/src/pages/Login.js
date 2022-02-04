import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { redirectToPath } from '../helpers';
import { dataTestIds } from '../utils';
import Button from '../components/Button';

const NOT_FOUND = 404;
const POST_LOGIN_URL = 'http://localhost:3001/login';

function Login() {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const [hidden, setHidden] = useState(true);
  const { email, password } = loginForm;

  const [disable, setDisable] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      redirectToPath(navigate, user.role);
    }
  }, [navigate]);

  useEffect(() => {
    const handleValidation = () => {
      const MIN_PASSWORD = 6;
      const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (password.length < MIN_PASSWORD || !email.match(regex)) return setDisable(true);
      return setDisable(false);
    };
    handleValidation();
  }, [email, password]);

  function handleChange({ target }) {
    const { name, value } = target;
    setLoginForm((info) => ({
      ...info,
      [name]: value,
    }));
  }

  const loginOK = async () => {
    const dataFetch = await fetch(POST_LOGIN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginForm),
    });
    const { data } = await dataFetch.json();
    if (dataFetch.status === NOT_FOUND) {
      setHidden(false);
    } else {
      localStorage.setItem('user', JSON.stringify(data));
      redirectToPath(navigate, data.role);
    }
  };

  return (
    <>
      <form>
        <input
          type="text"
          placeholder="Email"
          data-testid={ dataTestIds['1'] }
          name="email"
          value={ email }
          onChange={ handleChange }
        />
        <input
          type="text"
          placeholder="Senha"
          data-testid={ dataTestIds['2'] }
          name="password"
          value={ password }
          onChange={ handleChange }
        />
        <button
          type="button"
          data-testid={ dataTestIds['3'] }
          disabled={ disable }
          onClick={ loginOK }
        >
          LOGIN
        </button>
        <Button
          text="Ainda não tenho conta"
          route="/register"
          testId="4"
        />
      </form>
      <p
        data-testid={ dataTestIds['5'] }
        hidden={ hidden }
      >
        Error!
      </p>
    </>
  );
}

export default Login;

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

const LOGINCHARACTERS = 3;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      isLoginButtonDisabled: true,
      loading: true,
      redirect: false,
    };
  }

  onInputChange = ({ target }) => {
    const { value } = target;
    this.setState({ username: value });
    if (value.length >= LOGINCHARACTERS) {
      this.setState({ isLoginButtonDisabled: false });
    } else {
      this.setState({ isLoginButtonDisabled: true });
    }
  };

  onButtonClick = async () => {
    const { username } = this.state;
    this.setState({ loading: false });
    await createUser({ name: username });
    this.setState({ loading: true, redirect: true });
  }

  render() {
    const {
      username,
      isLoginButtonDisabled,
      loading,
      redirect,
    } = this.state;

    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="login">
            <input
              type="text"
              data-testid="login-name-input"
              onChange={ this.onInputChange }
              value={ username }
              id="login"
              placeholder="Digite seu usuário"
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ isLoginButtonDisabled }
            onClick={ this.onButtonClick }
          >
            Entrar
          </button>
          {!loading && <Loading />}
          {redirect && <Redirect to="/search" />}
        </form>
      </div>
    );
  }
}

export default Login;

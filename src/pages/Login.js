import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { saveUser } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isLogged: false,
    };
  }

  handleChange = ({ target }) => {
    this.setState(
      { [target.name]: target.value },
    );
  }

  isDisableButton = () => {
    const { email, password } = this.state;
    const VALID_EMAIL = /\S+@\S+\.\S+/;
    const MIN_SIZE_OF_PASSWORD = 6;

    if (
      VALID_EMAIL.test(email)
      && password.length >= MIN_SIZE_OF_PASSWORD
    ) {
      return false;
    } return true;
  }

  login = () => {
    const { email } = this.state;
    const { saveUserEmail } = this.props;

    saveUserEmail(email);
    this.setState({ isLogged: true });
  }

  render() {
    const { isLogged } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <label htmlFor="email">
          E-mail:
          <input
            type="email"
            name="email"
            data-testid="email-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            data-testid="password-input"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="submit"
          disabled={ this.isDisableButton() }
          onClick={ this.login }
        >
          Entrar
        </button>
        {isLogged && <Redirect to="/carteira" />}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveUserEmail: (email) => dispatch(saveUser(email)),
});

Login.propTypes = {
  saveUserEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);

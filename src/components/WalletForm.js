import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setCurrencies } from '../redux/actions';
import getCurrencies from '../services/getCurrencies';

class WalletForm extends Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     currencies: [],
  //   };
  // }

  componentDidMount = () => {
    this.getCurrencies();
  }

  getCurrencies = async () => {
    const { addCurrencies } = this.props;
    const currenciesReturned = await getCurrencies();
    const currencies = Object
      .keys(currenciesReturned)
      .filter((key) => key !== 'USDT');

    addCurrencies(currencies);
  }

  render() {
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            data-testid="value-input"
            name="value"
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            name="description"
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            data-testid="currency-input"
            name="currency"
          >
            {currencies.map((currency) => (
              <option key={ currency }>{currency}</option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Método:
          <select
            data-testid="method-input"
            name="method"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Método:
          <select
            data-testid="tag-input"
            name="tag"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  addCurrencies: (currencies) => dispatch(setCurrencies(currencies)),
});

WalletForm.propTypes = {
  currencies: PropTypes.array,
  addCurrencies: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);

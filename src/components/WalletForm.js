import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  addExpense as addExpenseAction,
  setCurrencies,
} from '../redux/actions';
import getCurrencies from '../services/getCurrencies';

const INITIAL_STATE = {
  // id: 0,
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchangeRates: {},
};

class WalletForm extends Component {
  constructor() {
    super();

    this.state = INITIAL_STATE;
  }

  componentDidMount = () => {
    this.getCurrenciesOptions();
  }

  // pega as moedas da API e adiona ao local state
  getExchangesRates = async () => {
    const currencies = await getCurrencies();
    delete currencies.USDT;
    this.setState({
      exchangeRates: currencies,
    });
    return currencies;
  }

  getCurrenciesOptions = async () => {
    const { addCurrencies } = this.props;
    // const currenciesReturned = await this.getExchangesRates();
    await this.getExchangesRates();
    const { exchangeRates } = this.state;
    const currencies = Object.keys(exchangeRates);

    addCurrencies(currencies);
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  }

  // setID = () => {
  //   const { expenses } = this.props;
  //   const id = expenses.length;
  //   this.setState({ id });
  // }

  saveExpense = async (event) => {
    event.preventDefault();
    const { addExpense } = this.props;
    // this.setState({ id: expenseID });

    await this.getExchangesRates();
    const expense = this.state;
    addExpense(expense);

    this.setState(INITIAL_STATE);
  }

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;

    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies.map((currencyOption) => (
              <option
                key={ currencyOption }
              >
                {currencyOption}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Método:
          <select
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria:
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button
          type="submit"
          onClick={ (event) => this.saveExpense(event) }
        >
          Adicionar Despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  expenseID: state.wallet.currentID,
});

const mapDispatchToProps = (dispatch) => ({
  addCurrencies: (currencies) => dispatch(setCurrencies(currencies)),
  addExpense: (expense) => dispatch(addExpenseAction(expense)),
});

WalletForm.propTypes = {
  currencies: PropTypes.array,
  expenses: PropTypes.array,
  addCurrencies: PropTypes.func,
  addExpense: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);

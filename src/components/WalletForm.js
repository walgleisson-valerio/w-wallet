import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  addExpense as addExpenseAction,
  editExpense as editExpenseAction,
  handleTotal as handleTotalAction,
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

  // attTotal = () => {
  //   const { handleTotal } = this.props;
  //   handleTotal();
  // }

  saveExpense = async (event) => {
    event.preventDefault();
    const { addExpense, handleTotal } = this.props;
    await this.getExchangesRates();
    const expense = this.state;
    addExpense(expense);

    this.setState(INITIAL_STATE);
    handleTotal();
  }

  editarExpense = async (event) => {
    event.preventDefault();
    await this.getExchangesRates();
    const { idToEdit, expenses, editExpense, handleTotal } = this.props;
    // copia o array do store
    const newExpenses = [...expenses];
    const expenseToEdit = { ...this.state };
    expenseToEdit.id = idToEdit;

    newExpenses[idToEdit] = expenseToEdit;

    editExpense(newExpenses);
    handleTotal();
  }

  render() {
    const { currencies, editor } = this.props;
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
          onClick={
            editor ? (event) => this.editarExpense(event)
              : (event) => this.saveExpense(event)
          }
        >
          { editor ? 'Editar Despesa' : 'Adicionar Despesa'}
        </button>

      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
  expenseID: state.wallet.currentID,
});

const mapDispatchToProps = (dispatch) => ({
  addCurrencies: (currencies) => dispatch(setCurrencies(currencies)),
  addExpense: (expense) => dispatch(addExpenseAction(expense)),
  editExpense: (newExpenses) => dispatch(editExpenseAction(newExpenses)),
  handleTotal: () => dispatch(handleTotalAction()),
});

WalletForm.propTypes = {
  currencies: PropTypes.array,
  expenses: PropTypes.array,
  editor: PropTypes.bool,
  idToEdit: PropTypes.number,
  addCurrencies: PropTypes.func,
  addExpense: PropTypes.func,
  editExpense: PropTypes.func,
  handleTotal: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);

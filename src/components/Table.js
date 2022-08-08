import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense as deleteExpenseAction } from '../redux/actions';

class Table extends Component {
  getTotal = (valueString, currencyString) => {
    const value = valueString ? parseFloat(valueString) : 0;
    const currency = parseFloat(currencyString);
    const result = value * currency;

    return result.toFixed(2);
  }

  eraseExpense = (id) => {
    const { deleteExpense } = this.props;
    // const a = expenses.filter((expense) => expense.id !== id);
    deleteExpense(id);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map(({
            id,
            description,
            currency,
            tag,
            method,
            value,
            exchangeRates,
          }) => (
            <tr key={ id }>
              <td>{ description }</td>
              <td>{ tag }</td>
              <td>{ method }</td>
              <td>{ parseFloat(value).toFixed(2) }</td>
              <td>
                { exchangeRates[currency].name }
              </td>
              <td>{ parseFloat(exchangeRates[currency].ask).toFixed(2) }</td>
              <td>{ this.getTotal(value, exchangeRates[currency].ask) }</td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => this.eraseExpense(id) }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(deleteExpenseAction(id)),
});

Table.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);

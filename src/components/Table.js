import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  getTotal = (valueString, currencyString) => {
    const value = valueString ? parseFloat(valueString) : 0;
    const currency = parseFloat(currencyString);
    const result = value * currency;

    return result.toFixed(2);
  }

  render() {
    const { expenses } = this.props;
    console.log(expenses);
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
              <td>Editar/Excluir</td>
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

Table.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Table);

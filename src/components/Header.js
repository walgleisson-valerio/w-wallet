import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  getTotal = () => {
    const { userExpenses } = this.props;
    let total = 0;
    if (userExpenses.length) {
      userExpenses.forEach((expense) => {
        const { currency, exchangeRates, value } = expense;
        total += value * exchangeRates[currency].ask;
      });
    }
    return total.toFixed(2);
  }

  render() {
    const { userEmail } = this.props;
    this.getTotal();
    return (
      <header>
        <h3>TrybeWallet</h3>
        <h3 data-testid="email-field">{ userEmail }</h3>
        <span>Gasto totais:</span>
        <span data-testid="total-field">
          { this.getTotal() }
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  userExpenses: state.wallet.expenses,
});

Header.propTypes = {
  userEmail: PropTypes.string,
  userExpenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Header);

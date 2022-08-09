import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { userEmail, total } = this.props;
    return (
      <header>
        <h3>TrybeWallet</h3>
        <h3 data-testid="email-field">{ userEmail }</h3>
        <span>Gasto totais:</span>
        <span data-testid="total-field">
          { total.toFixed(2) }
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  userExpenses: state.wallet.expenses,
  total: state.wallet.total,
});

Header.propTypes = {
  userEmail: PropTypes.string,
  userExpenses: PropTypes.array,
  total: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Header);

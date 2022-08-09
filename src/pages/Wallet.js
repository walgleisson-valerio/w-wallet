import React from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  // componentDidMount() {
  //   const { total } = this.props;
  //   this.state = { total };
  // }

  render() {
    // const { total } = this.props;
    return (
      <>
        <Header />
        <WalletForm />
        <Table />
      </>
    );
  }
}

// const mapStateToProps = (state) => ({
//   total: state.wallet.total,
// });

// Wallet.propTypes = {
//   total: PropTypes.string,
// }.isRequired;

export default Wallet;

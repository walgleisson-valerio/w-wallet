// export { SAVE_WALLET } from '../actions';

const INITIAL_STATE = {
  wallet: {
    currencies: [], // array de string
    expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
    editor: false, // valor booleano que indica de uma despesa está sendo editada
    idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  },
};

const handleWallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SAVE_WALLET':
    return {
      ...state,
      wallet: action.payload, // apenas para config inicial
    };
  default:
    return state;
  }
};

export default handleWallet;

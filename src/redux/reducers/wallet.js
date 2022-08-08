// export { SAVE_WALLET } from '../actions';

import { SET_CURRENCIES, ADD_EXPENSE, DELETE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  currentID: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };

  case ADD_EXPENSE:
  // action.expense.id = state.expenses.length;
  // E se eu passar esse id com o auxilio do contador na função no componente?
    console.log(action.expense);
    action.expense.id = state.currentID;
    return {
      ...state,
      expenses: [
        ...state.expenses,
        action.expense,
      ],
      currentID: state.currentID + 1,
    };

  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };

  default:
    return state;
  }
};

export default wallet;

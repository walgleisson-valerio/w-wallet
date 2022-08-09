// export { SAVE_WALLET } from '../actions';
import {
  SET_CURRENCIES,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  EDIT_MODE,
  EDIT_EXPENSE,
  HANDLE_TOTAL,
} from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  currentID: 0,
  total: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  case ADD_EXPENSE:
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
  case EDIT_MODE:
    return {
      ...state,
      editor: true,
      idToEdit: action.id,
    };
  case EDIT_EXPENSE: {
    return {
      ...state,
      expenses: action.newExpenses,
      editor: false,
      idToEdit: 0,
    };
  }
  case HANDLE_TOTAL: {
    const { expenses } = state;
    let total = 0;
    expenses.forEach((expense) => {
      const { currency, exchangeRates, value } = expense;
      total += value * exchangeRates[currency].ask;
    });
    return { ...state, total };
  }
  default:
    return state;
  }
};

export default wallet;

export const SAVE_USER = 'SAVE_USER';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_MODE = 'EDIT_MODE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const SET_CURRENCIES = 'SET_CURRENCIES';
export const HANDLE_TOTAL = 'HANDLE_TOTAL';

export const saveUser = (email) => ({
  type: SAVE_USER,
  email,
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  id,
});

export const handleEditMode = (id) => ({
  type: EDIT_MODE,
  id,
});

export const editExpense = (newExpenses) => ({
  type: EDIT_EXPENSE,
  newExpenses,
});

export const setCurrencies = (currencies) => ({
  type: SET_CURRENCIES,
  currencies,
});

export const handleTotal = () => ({
  type: HANDLE_TOTAL,
});

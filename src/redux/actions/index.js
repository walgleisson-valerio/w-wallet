export const SAVE_USER = 'SAVE_USER';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const SET_CURRENCIES = 'SET_CURRENCIES';

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

export const setCurrencies = (currencies) => ({
  type: SET_CURRENCIES,
  currencies,
});

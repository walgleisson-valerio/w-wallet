export const SAVE_USER = 'SAVE_USER';
export const SAVE_WALLET = 'SAVE_WALLET';
export const SET_CURRENCIES = 'SET_CURRENCIES';

export const saveUser = (email) => ({
  type: SAVE_USER,
  email,
});

// export const saveWallet = (currencies) => ({
//   type: SAVE_WALLET,
//   currencies,
// });

export const setCurrencies = (currencies) => ({
  type: SET_CURRENCIES,
  currencies,
});

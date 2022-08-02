import { SAVE_USER } from '../actions/index';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_USER:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
};

export default user;

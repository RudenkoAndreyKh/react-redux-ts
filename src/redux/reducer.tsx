import { combineReducers } from 'redux';

//AUTH 
export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export const authorize = (email: string, password: string) => ({
  type: AUTH_REQUEST,
  payload: { email, password }
});

const initialState = {
  token: localStorage.getItem('token'),
  error: null
};

const authReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case AUTH_SUCCESS: {
      return { ...state, token: payload };
    }
    case AUTH_FAILURE: {
      return { ...state, error: payload }
    }
    default:
      return state;
  }
};


//REGISTER
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const registration = (firstName: string, lastName: string, email: string, password: string, image: string) => ({
  type: REGISTER_REQUEST,
  payload: { firstName, lastName, email, password, image }
});

const initialRegState = {
  token: localStorage.getItem('token'),
  error: null
};

const registerReducer = (state = initialRegState, { type, payload }: any) => {
  switch (type) {
    case REGISTER_SUCCESS: {
      return { ...state };
    }
    case REGISTER_FAILURE: {
      return { ...state, error: payload }
    }
    default:
      return state;
  }
};

const reducer = combineReducers({
  auth: authReducer,
  reg: registerReducer
});

export default reducer;
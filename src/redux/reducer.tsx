import { combineReducers } from 'redux';

//AUTH 
export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export const authorize = (email: string, password: string) => ({
  type: AUTH_REQUEST,
  payload: { email, password }
});

let user: any = localStorage.getItem('user');

const initialState = {
  token: localStorage.getItem('token'),
  user: JSON.parse(user),
  error: null
};

const authReducer = (state = initialState, { type, payload }: any) => {

  switch (type) {
    case AUTH_SUCCESS: {
      return Object.assign({}, state, {
        data: payload
      })
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


//ISLOGGEDIN
export const ISLOGGEDIN_REQUEST = 'ISLOGGEDIN_REQUEST';
export const ISLOGGEDIN_SUCCESS = 'ISLOGGEDIN_SUCCESS';
export const ISLOGGEDIN_FAILURE = 'ISLOGGEDIN_FAILURE';

export const isLoggedIn = (user: any, token: string) => ({
  type: ISLOGGEDIN_REQUEST,
  payload: user, token
});

const homeState = {
  error: null,
  isLoggedIn: false,
};

const isLoggedInReducer = (state = homeState, { type, payload }: any) => {
  console.log(payload);
  switch (type) {
    case ISLOGGEDIN_SUCCESS: {
      return { ...state, isLoggedIn: payload }
      
    }
    case ISLOGGEDIN_FAILURE: {
      return { ...state, error: payload }
    }
    default:
      return state;
  }
};

export const state = {
  auth: initialState,
  reg: initialRegState,
  home: homeState
}

const reducer = combineReducers({
  auth: authReducer,
  reg: registerReducer,
  home: isLoggedInReducer
});

export default reducer;
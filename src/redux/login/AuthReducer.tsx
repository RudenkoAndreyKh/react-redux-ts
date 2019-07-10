import { AuthState, AuthAction } from "../types";

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export const authorize = (email: string, password: string) => ({
  type: AUTH_REQUEST,
  payload: { email, password }
});

let userModel: any = localStorage.getItem('user');

export const initialAuth: AuthState = {
  token: localStorage.getItem('token'),
  user: JSON.parse(userModel),
  error: ''
};

export const authReducer = (state: AuthState = initialAuth, { type, payload }: AuthAction) => {

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
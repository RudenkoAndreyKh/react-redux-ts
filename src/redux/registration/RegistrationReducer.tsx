import { regState, regAction } from "../types";

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const registration = (firstName: string, lastName: string, email: string, password: string, image: string) => ({
  type: REGISTER_REQUEST,
  payload: { firstName, lastName, email, password, image }
});

export const initialReg: regState = {
  token: localStorage.getItem('token'),
  error: ''
};

export const registerReducer = (state: regState = initialReg, { type, payload }: regAction) => {
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
import { homeState, homeIsLoggedInAction } from "../types";

export const ISLOGGEDIN_REQUEST = 'ISLOGGEDIN_REQUEST';
export const ISLOGGEDIN_SUCCESS = 'ISLOGGEDIN_SUCCESS';
export const ISLOGGEDIN_FAILURE = 'ISLOGGEDIN_FAILURE';

export const isLoggedInAct = (user: string | null, token: string | null) => ({
  type: ISLOGGEDIN_REQUEST,
  payload: user, token
});

export const initialHome: homeState = {
  error: '',
  isLoggedIn: {
    status: 0,
    success: false,
    message: '',
    user: {
      firstName: '',
      lastName: '',
      email: '',
      image: ''
    }
  },
};

export const isLoggedInReducer = (state = initialHome, { type, payload }: homeIsLoggedInAction) => {

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
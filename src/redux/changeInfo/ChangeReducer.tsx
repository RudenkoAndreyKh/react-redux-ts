import { ChangeState, ChangeAction } from "../types";

export const CHANGEUSER_REQUEST = 'CHANGEUSER_REQUEST';
export const CHANGEUSER_SUCCESS = 'CHANGEUSER_SUCCESS';
export const CHANGEUSER_FAILURE = 'CHANGEUSER_FAILURE';

export const changingUser = (userModel: any) => ({
    type: CHANGEUSER_REQUEST,
    payload: userModel
});

let userModel: any = localStorage.getItem('user');

export const initialChange: ChangeState = {
    token: localStorage.getItem('token'),
    user: JSON.parse(userModel),
    error: ''
};

export const changeReducer = (state: ChangeState = initialChange, { type, payload }: ChangeAction) => {
    switch (type) {
        case CHANGEUSER_SUCCESS: {
            return Object.assign({}, state, {
                data: payload
            })
        }
        case CHANGEUSER_FAILURE: {
            return { ...state, error: payload }
        }
        default:
            return state;
    }
};
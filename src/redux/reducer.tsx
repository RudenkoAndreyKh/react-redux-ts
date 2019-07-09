import { combineReducers } from 'redux';
import { initialCart, AddingToCartReducer } from './home/addItemReducer';
import { initialHome, isLoggedInReducer } from './home/isLoggedInReducer';
import { initialReg, registerReducer } from './registration/RegistrationReducer';
import { initialAuth, authReducer } from './login/AuthReducer';
import {RemovingFromCartReducer} from './home/removeItemFromCartReducer';
//AUTH 




export const state = {
  auth: initialAuth,
  reg: initialReg,
  home: initialHome,
  cart: initialCart
}

const reducer = combineReducers({
  auth: authReducer,
  reg: registerReducer,
  home: isLoggedInReducer,
  cart: AddingToCartReducer, RemovingFromCartReducer
});

export default reducer;
import { combineReducers } from 'redux';
import { initialCart, AddingToCartReducer } from './home/CartReducer';
import { initialHome, isLoggedInReducer } from './home/isLoggedInReducer';
import { initialReg, registerReducer } from './registration/RegistrationReducer';
import { initialAuth, authReducer } from './login/AuthReducer';
import { initialChange, changeReducer} from './changeInfo/ChangeReducer';
//AUTH 




export const state = {
  auth: initialAuth,
  reg: initialReg,
  home: initialHome,
  cart: initialCart,
  change: initialChange
}

const reducer = combineReducers({
  auth: authReducer,
  reg: registerReducer,
  home: isLoggedInReducer,
  cart: AddingToCartReducer,
  change: changeReducer
});

export default reducer;
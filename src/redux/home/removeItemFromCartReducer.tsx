import { cart, addToCartAction, game } from "../types";
import {initialCart} from './addItemReducer';

export const REMOVEFROMCART_REQUEST = 'REMOVEFROMCART_REQUEST';
export const REMOVEFROMCART_SUCCESS = 'REMOVEFROMCART_SUCCESS';
export const REMOVEFROMCART_FAILURE = 'REMOVEFROMCART_FAILURE';


export const removeFromCart = (game: game) => ({
  type: REMOVEFROMCART_REQUEST,
  payload: game
});

export const RemovingFromCartReducer = (state: cart = initialCart, { type, payload }: addToCartAction) => {
    
  switch (type) {
    case REMOVEFROMCART_SUCCESS: {
        console.log("succes payload",payload);
      let game: game = JSON.parse(payload);

      let currGame = state.cart.findIndex(x => x._id === game._id);

      var copyState: cart = { ...state };

      if (JSON.stringify(state.cart).includes(game._id) && copyState.cart[currGame].quantity>1) {
        copyState.cart[currGame].quantity--;
        localStorage.setItem("cart", JSON.stringify(copyState.cart));
      } else if(JSON.stringify(state.cart).includes(game._id)){
        copyState.cart[currGame].quantity = 0;
        copyState.cart.splice(currGame, 1);
        localStorage.setItem("cart", JSON.stringify(copyState.cart));
      }
      copyState = { cart: copyState.cart.map((x) => { return { ...x } }), error: copyState.error }
      return copyState;
    }
    case REMOVEFROMCART_FAILURE: {
        console.log("failure payload",payload);
      return { ...state, error: payload }
    }
    default:
      return state;
  }
};
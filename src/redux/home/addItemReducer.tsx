import { addToCartAction, cart, game } from "../types";

export const ADDTOCART_REQUEST = 'ADDTOCART_REQUEST';
export const ADDTOCART_SUCCESS = 'ADDTOCART_SUCCESS';
export const ADDTOCART_FAILURE = 'ADDTOCART_FAILURE';

export const addToCart = (game: game) => ({
  type: ADDTOCART_REQUEST,
  payload: game
});

const shoppingCart: any[] = JSON.parse(localStorage.getItem('cart') || "[]");

export const initialCart: cart = {
  cart: shoppingCart || [],
  error: ''
};

export const AddingToCartReducer = (state: cart = initialCart, { type, payload }: addToCartAction) => {

  switch (type) {
    case ADDTOCART_SUCCESS: {
      let game: game = JSON.parse(payload);

      let currGame = state.cart.findIndex(x => x.name === game.name);

      var copyState: cart = { ...state };

      if (JSON.stringify(state.cart).includes(game.name)) {
        copyState.cart[currGame].quantity++;
        localStorage.setItem("cart", JSON.stringify(copyState.cart));
      } else {
        game.quantity = 1;
        copyState.cart.push(game);
        localStorage.setItem("cart", JSON.stringify(copyState.cart));
      }
      copyState = { cart: copyState.cart.map((x) => { return { ...x } }), error: copyState.error }
      return copyState;
    }
    case ADDTOCART_FAILURE: {
      return { ...state, error: payload }
    }
    default:
      return state;
  }
};
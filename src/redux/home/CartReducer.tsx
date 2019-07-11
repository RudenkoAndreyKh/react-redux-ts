import { AddToCartAction, Cart, Game } from "../types";

export const ADDTOCART_REQUEST = 'ADDTOCART_REQUEST';
export const ADDTOCART_SUCCESS = 'ADDTOCART_SUCCESS';
export const ADDTOCART_FAILURE = 'ADDTOCART_FAILURE';

export const addToCart = (game: Game) => ({
  type: ADDTOCART_REQUEST,
  payload: game
});


export const REMOVEFROMCART_REQUEST = 'REMOVEFROMCART_REQUEST';
export const REMOVEFROMCART_SUCCESS = 'REMOVEFROMCART_SUCCESS';
export const REMOVEFROMCART_FAILURE = 'REMOVEFROMCART_FAILURE';


export const removeFromCart = (game: Game) => ({
  type: REMOVEFROMCART_REQUEST,
  payload: game
});

export const REMOVECART_REQUEST = 'REMOVECART_REQUEST';
export const REMOVECART_SUCCESS = 'REMOVECART_SUCCESS';
export const REMOVECART_FAILURE = 'REMOVECART_FAILURE';


export const removeAllItems = () => ({
  type: REMOVECART_REQUEST,
});

const shoppingCart: Array<object> = JSON.parse(localStorage.getItem('cart') || "[]");

export const initialCart: Cart = {
  cart: shoppingCart,
  error: ''
};

export const AddingToCartReducer = (state: Cart = initialCart, { type, payload }: AddToCartAction) => {

  switch (type) {
    case ADDTOCART_SUCCESS: {
      let game: Game = JSON.parse(payload);

      let currGame = state.cart.findIndex(x => x._id === game._id);

      var copyState: Cart = { ...state };

      if (JSON.stringify(state.cart).includes(game._id)) {
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
    
  }

  switch (type) {
    case REMOVEFROMCART_SUCCESS: {

      let game: Game = JSON.parse(payload);

      let currGame = state.cart.findIndex(x => x._id === game._id);

      var copyState: Cart = { ...state };

      if (JSON.stringify(state.cart).includes(game._id) && copyState.cart[currGame].quantity > 1) {
        copyState.cart[currGame].quantity--;
        localStorage.setItem("cart", JSON.stringify(copyState.cart));
      } else if (JSON.stringify(state.cart).includes(game._id)) {
        copyState.cart[currGame].quantity = 0;
        copyState.cart.splice(currGame, 1);
        localStorage.setItem("cart", JSON.stringify(copyState.cart));
      }
      copyState = { cart: copyState.cart.map((x) => { return { ...x } }), error: copyState.error }
      return copyState;
    }
    case REMOVEFROMCART_FAILURE: {
      return { ...state, error: payload }
    }
 
  }

  switch (type) {
    case REMOVECART_REQUEST: {
      var copyState: Cart = { ...state };

      copyState.cart = [];
      
      copyState = { cart: copyState.cart.map((x) => { return { ...x } }), error: copyState.error }
      return copyState;
    }
    case REMOVECART_FAILURE: {
      return { ...state, error: payload }
    }
 
  }

  return state;
};
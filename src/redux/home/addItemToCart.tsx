import { put, takeLatest } from 'redux-saga/effects';

import { ADDTOCART_REQUEST, ADDTOCART_SUCCESS, ADDTOCART_FAILURE } from './CartReducer';

function* addToCart(game: any) {

    try {
        let data = JSON.stringify({ name: game.payload.name, description: game.payload.description, price: game.payload.price, image: game.payload.image, _id: game.payload._id, quantity: game.payload.quantity });


        yield put({ type: ADDTOCART_SUCCESS, payload: data });
    } catch (error) {

        let message = error;

        yield put({ type: ADDTOCART_FAILURE, payload: message });
    }
}

function* Saga() {
    yield takeLatest(ADDTOCART_REQUEST, addToCart);
}

export default Saga;
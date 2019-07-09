import { put, takeLatest } from 'redux-saga/effects';

import { REMOVEFROMCART_REQUEST, REMOVEFROMCART_SUCCESS, REMOVEFROMCART_FAILURE } from './removeItemFromCartReducer';

function* removeFromCart(game: any) {
    console.log(game);

    try {
        let data = JSON.stringify({ _id: game.payload._id, quantity: game.payload.quantity });
        console.log(data);
        
        yield put({ type: REMOVEFROMCART_SUCCESS, payload: data });
    } catch (error) {

        let message = error;

        yield put({ type: REMOVEFROMCART_FAILURE, payload: message });
    }
}

function* Saga() {
    yield takeLatest(REMOVEFROMCART_REQUEST, removeFromCart);
}

export default Saga;
import { put, takeLatest } from 'redux-saga/effects';

import { REMOVECART_REQUEST, REMOVECART_SUCCESS, REMOVECART_FAILURE } from './CartReducer';

function* removeAllItems() {

    try {        
        yield put({ type: REMOVECART_SUCCESS });
    } catch (error) {

        let message = error;

        yield put({ type: REMOVECART_FAILURE, payload: message });
    }
}

function* Saga() {
    yield takeLatest(REMOVECART_REQUEST, removeAllItems);
}

export default Saga;
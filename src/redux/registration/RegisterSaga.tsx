import { call, put, takeLatest } from 'redux-saga/effects';

import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from '../reducer';
import { push } from 'react-router-redux';

import axios from 'axios';

const fetchJSON = (url: string, body: any) =>
    new Promise((resolve, reject) => {
        return axios.post(url, body)
            .then(res => (res.data.status !== 201 ? reject(res) : res))
            .then((res: any) => {
                resolve(res.data.data.newUser);
            })
            .catch(error => reject(error));
    });

function* registration({ payload: { firstName, lastName, email, password, image } }: any) {
    const body = {
        firstName, lastName, email, password, image
    };
    console.log("registration");
    try {
        const user: string = yield call(fetchJSON, 'http://localhost:4000/auth/create-new-user', body);
        console.log(user);

        yield put({ type: REGISTER_SUCCESS, payload: user });
        yield put(push('/login'));
    } catch (error) {
        let message;
        switch (error.status) {
            case 500: message = 'Internal Server Error'; break;
            case 409: message = 'User already exist'; break;
            default: message = 'Something went wrong';
        }
        yield put({ type: REGISTER_FAILURE, payload: message });
    }
}

function* Saga() {
    yield takeLatest(REGISTER_REQUEST, registration);
}

export default Saga;
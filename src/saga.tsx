import { call, put, takeLatest } from 'redux-saga/effects';

import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE } from './reducer';
import { push } from 'react-router-redux';

import axios from 'axios';

const fetchJSON = (url: string, body: any) =>
    new Promise((resolve, reject) => {
        return axios.post(url, body)
            .then(res => (res.status !== 200 ? reject(res) : res))
            .then((res: any) => {
                resolve(res.data.data.accessToken);
            })
            .catch(error => reject(error));
    });

function* authorize({ payload: { email, password } }: any) {
    const body = {
        email, password
    };

    try {
        const token: string = yield call(fetchJSON, 'http://localhost:4000/api/authentication/signIn', body);
        yield put({ type: AUTH_SUCCESS, payload: token });
        localStorage.setItem('token', token);
        yield put(push('/'));
    } catch (error) {
        let message;
        switch (error.status) {
            case 500: message = 'Internal Server Error'; break;
            case 401: message = 'Invalid credentials'; break;
            default: message = 'Something went wrong';
        }
        yield put({ type: AUTH_FAILURE, payload: message });
        localStorage.removeItem('token');
    }
}

function* Saga() {
    yield takeLatest(AUTH_REQUEST, authorize);
}

export default Saga;
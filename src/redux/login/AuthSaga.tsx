import { call, put, takeLatest } from 'redux-saga/effects';

import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE } from './AuthReducer';
import { push } from 'react-router-redux';

import axios from 'axios';

const fetchJSON = (url: string, body: any) =>
    new Promise((resolve, reject) => {
        return axios.post(url, body)
            .then(res => (res.data.status !== 200 ? reject(res) : res))
            .then((res: any) => {
                resolve(res.data.data);
            })
            .catch(error => reject(error));
    });

function* authorize({ payload: { email, password } }: any) {
    const body = {
        email, password
    };
    try {
        const data = yield call(fetchJSON, 'http://localhost:4000/auth/sign-in', body);
        let user: string = JSON.stringify({firstName: data.user.firstName, lastName: data.user.lastName, email: data.user.email, image: data.user.image});
        let token: string = JSON.stringify(data.accessToken);

        yield put({ type: AUTH_SUCCESS, payload: data});
        localStorage.setItem('user', user);
        localStorage.setItem('token', token);
        yield put(push('/'));
    } catch (error) {

        let message;
        switch (error.data.status) {
            case error.data.status: message = error.data.message; break;
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
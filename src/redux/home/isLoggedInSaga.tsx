import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';

import { ISLOGGEDIN_REQUEST, ISLOGGEDIN_SUCCESS, ISLOGGEDIN_FAILURE } from '../reducer';
import { push } from 'react-router-redux';

import axios from 'axios';

const fetchJSON = (url: string, body: any) =>
    new Promise((resolve, reject) => {
        return axios.post(url, body)
            .then(res => (res.data.status !== 200 ? reject(res) : res))
            .then((res: any) => {                
                resolve(res.data);
            })
            .catch(error => reject(error));
    });

function* isLoggedIn() {
    let accessToken = localStorage.getItem("token");
    let user: any = localStorage.getItem("user");
    let userModel = JSON.parse(user);
    const body = {
        accessToken, userModel
    };

    try {
        const data = yield call(fetchJSON, 'http://localhost:4000/auth/is-logged-in', body);

        yield put({ type: ISLOGGEDIN_SUCCESS, payload: data });
    } catch (error) {
        let message;
        switch (error.data.status) {
            case error.data.status: message = error.data.message; break;
            default: message = 'Something went wrong';
        }

        yield put({ type: ISLOGGEDIN_FAILURE, payload: message });
    }
}

function* Saga() {
    yield takeEvery(ISLOGGEDIN_REQUEST, isLoggedIn);
}

export default Saga;
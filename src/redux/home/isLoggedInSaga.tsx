import { call, put, takeEvery } from 'redux-saga/effects';

import { ISLOGGEDIN_REQUEST, ISLOGGEDIN_SUCCESS, ISLOGGEDIN_FAILURE } from './isLoggedInReducer';

import axios, { AxiosResponse } from 'axios';

interface IsLoggedInBody {
    accessToken: string | null, 
    userModel: object
}

const fetchJSON = (url: string, body: IsLoggedInBody) =>
    new Promise((resolve, reject) => {
        return axios.post(url, body)
            .then(res => (res.data.status !== 200 ? reject(res) : res))
            .then((res: AxiosResponse | void) => {
                if (res) {
                    resolve(res.data);
                }
                reject(res);
            })
            .catch(error => reject(error));
    });

function* isLoggedIn() {
    let accessToken = localStorage.getItem("token");
    let user: string | null = localStorage.getItem("user");
    let userModel: object = {};
    if (user) { userModel = JSON.parse(user); }

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
import { call, put, takeLatest } from 'redux-saga/effects';

import { CHANGEUSER_REQUEST, CHANGEUSER_SUCCESS, CHANGEUSER_FAILURE } from './ChangeReducer';
import { push } from 'react-router-redux';

import axios from 'axios';

export const reset = (userModel: any) => ({ type: "CHANGEUSER_REQUEST", payload: userModel });

const fetchJSON = (url: string, body: any) =>
    new Promise((resolve, reject) => {
        return axios.put(url, body)
            .then(res => (res.data.status !== 200 ? reject(res) : res))
            .then((res: any) => {
                console.log(res);

                resolve(res.data.data);
            })
            .catch(error => reject(error));
    });

function* changingUser({ payload: userModel }: any) {
    const body = userModel;
    try {


        const data = yield call(fetchJSON, `http://localhost:4000/users/${body._id}`, body);
        console.log("dataaaaaa", data);

        let user: string = JSON.stringify({ firstName: data.firstName, lastName: data.lastName, email: data.email, password: data.password, image: data.image, _id: data._id });

        yield put({ type: CHANGEUSER_SUCCESS, payload: data });
        localStorage.setItem('user', user);
        yield put(push('/'));
    } catch (error) {
        console.log(error);

        let message;
        switch (error.data.status) {
            case error.data.status: message = error.data.message; break;
            default: message = 'Something went wrong';
        }

        yield put({ type: CHANGEUSER_FAILURE, payload: message });
        localStorage.removeItem('token');
    }
}

function* Saga() {
    yield takeLatest(CHANGEUSER_REQUEST, changingUser);
}

export default Saga;
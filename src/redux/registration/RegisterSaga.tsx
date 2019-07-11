import { call, put, takeLatest } from 'redux-saga/effects';

import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from './RegistrationReducer';
import { push } from 'react-router-redux';

import axios, { AxiosResponse } from 'axios';

interface Body {
    firstName: string, 
    lastName: string, 
    email: string, 
    password: string, 
    image: string
}

const fetchJSON = (url: string, body: Body) =>
    new Promise((resolve, reject) => {
        return axios.post(url, body)
            .then(res => (res.data.status !== 201 ? reject(res) : res))
            .then((res: AxiosResponse | void) => {
                if(res){
                    resolve(res.data.data.newUser);
                }
                reject(res);
            })
            .catch(error => reject(error));
    });

function* registration({ payload: { firstName, lastName, email, password, image } }: any) {
    const body = {
        firstName, lastName, email, password, image
    };
    try {
        const user: string = yield call(fetchJSON, 'http://localhost:4000/auth/create-new-user', body);

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
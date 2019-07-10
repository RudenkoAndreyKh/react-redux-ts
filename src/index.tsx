import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Routering from './Routering';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware } from 'redux';

import AuthSaga from './redux/login/AuthSaga';
import RegisterSaga from './redux/registration/RegisterSaga';
import IsLoggedInSaga from './redux/home/isLoggedInSaga';
import addItemToCartSaga from './redux/home/addItemToCart';
import removeItemFromCartSaga from './redux/home/removeItemFromCartSaga';
import changeUserInfoSaga from './redux/changeInfo/ChangeSaga';
import configureStore from './redux/ConfigureStore';
import { all } from 'redux-saga/effects';
import { composeWithDevTools } from "redux-devtools-extension";
import { state } from './redux/reducer';

// create middlewares
const history = require("history").createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

// const middleware = applyMiddleware(
//   routerMiddleware(history),
//   sagaMiddleware
// );

const middlewares = [sagaMiddleware];
const composeEnhancers = composeWithDevTools({});
const enhancer = composeEnhancers(applyMiddleware(...middlewares, routerMiddleware(history)));
const store = configureStore(state, enhancer)

sagaMiddleware.run(function* () {
  yield all([AuthSaga(), RegisterSaga(), IsLoggedInSaga(), addItemToCartSaga(), removeItemFromCartSaga(), changeUserInfoSaga()]);
});




ReactDOM.render(<Provider store={store}><Routering history={history} /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

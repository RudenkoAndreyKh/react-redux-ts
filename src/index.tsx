import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Routering from './Routering';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, createStore } from 'redux';

import Saga from './saga';
import reducer from './reducer';

// create middlewares
const history = require("history").createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(
  routerMiddleware(history),
  sagaMiddleware
);

// create store
const store = createStore(reducer, middleware);

// run saga middleware
sagaMiddleware.run(Saga);


ReactDOM.render(<Provider store={store}><Routering history={history}/></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

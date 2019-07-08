// create store


import { createStore, Store } from 'redux'
import reducer from './reducer'

export default function configureStore(initialState: any, middlewares: any): Store {
    const store = createStore(reducer, initialState, middlewares);
    if (module.hot) {
        module.hot.accept('./reducer', () => {
            const nextRootReducer = require('./reducer')
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}
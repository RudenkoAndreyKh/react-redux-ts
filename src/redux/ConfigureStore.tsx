// create store


import { createStore, Store } from 'redux'
import reducer from './reducer'

export default function configureStore(initialState: any, middlewares: any): Store {
    const store = createStore(reducer, initialState, middlewares);


    return store
}
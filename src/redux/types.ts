export interface AuthState {
    token: string | null,
    user: User,
    error: string
}

export interface RegState {
    error: string,
    token: string | null
}

export interface HomeState {
    isLoggedIn: IsLoggedIn,
    error: string
}

export interface MainState {
    auth: AuthState,
    reg: RegState,
    home: HomeState,
    cart: Cart
}

export interface IsLoggedIn {
    status: number,
    success: boolean,
    message: string,
    user: User
}

export interface User {
    firstName: string,
    lastName: string,
    email: string,
    image: string
}

export interface Game {
    name: string,
    description: string,
    image: string,
    price: number,
    _id: string,
    quantity: number
}

export interface AuthAction {
    type: string,
    payload: any
}

export interface RegAction {
    type: string,
    payload: any
}

export interface HomeIsLoggedInAction {
    type: string,
    payload: any
}

export interface AddToCartAction {
    type: string,
    payload: any
}

export interface Cart {
    error: string,
    cart: any[]
}

export interface ChangeState {
    token: string | null,
    user: User,
    error: string
}

export interface ChangeAction {
    type: string,
    payload: any
}

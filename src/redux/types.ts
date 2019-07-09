export interface authState {
    token: string | null,
    user: user,
    error: string
}

export interface regState {
    error: string,
    token: string | null
}

export interface homeState {
    isLoggedIn: isLoggedIn,
    error: string
}

export interface mainState {
    auth: authState,
    reg: regState,
    home: homeState,
    cart: cart
}

export interface isLoggedIn {
    status: number,
    success: boolean,
    message: string,
    user: user
}

export interface user {
    firstName: string,
    lastName: string,
    email: string,
    image: string
}

export interface game {
    name: string,
    description: string,
    image: string,
    price: number,
    _id: string,
    quantity: number
}

export interface authAction {
    type: string,
    payload: any
}

export interface regAction {
    type: string,
    payload: any
}

export interface homeIsLoggedInAction {
    type: string,
    payload: any
}

export interface addToCartAction {
    type: string,
    payload: any
}

export interface cart {
    error: string,
    cart: any[]
}

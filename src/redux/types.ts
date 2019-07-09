export interface authState {
    token: any,
    user: {},
    error: string
}

export interface regState {
    error: string
}

export interface homeState {
    isLoggedIn: Object,
    error: string
}

export interface mainState {
    auth: authState,
    reg: regState,
    home: homeState
}

export interface isLoggedIn {
    status: Number,
    success: Boolean,
    message: String,
    user: Object
}

export interface user {
    firstName: String,
    lastName: String,
    email: String,
    image: String
}
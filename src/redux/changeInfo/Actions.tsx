interface UserModel {
    firstName: string,
    lastName: string,
    email: string,
    unhashedPass: string,
    image: string,
    _id: string,
}

export const changeUser = (userModel: UserModel) => ({ type: "CHANGEUSER_REQUEST", payload: userModel });

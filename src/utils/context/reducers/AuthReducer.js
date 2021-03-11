import Types from "../actions/Types"

export const initAuthState = {
    id: "",
    student_id: "",
    email: "",
    name: "",
    phone: "",
    photo_url: "",
    present_address: "",
    parents_phone: ""
}

const AuthReducer = (state, action) => {
    if (action.type === Types.AUTH_LOGIN) {
        let loggedInUser = action.payload//get user object
        return { ...loggedInUser }
    } else if (action.type === Types.AUTH_SIGNUP) {
        let newUser = action.payload//get user object
        return { ...newUser }
    } else if (action.type === Types.AUTH_LOGOUT) {
        return { ...initAuthState }
    } else {
        return state
    }
}
export default AuthReducer
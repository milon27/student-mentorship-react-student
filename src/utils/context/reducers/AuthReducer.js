import Types from "../actions/Types"

export const initAuthState = {
    id: "",
    student_id: "",
    email: "",
    name: "",
    phone: "",
    photo_url: "",
    is_logged_in: false,
}

const AuthReducer = (state, action) => {
    if (action.type === Types.AUTH_LOGIN) {
        let loggedInUser = action.payload//get user object
        return { ...loggedInUser }
    } else if (action.type === Types.AUTH_SIGNUP) {
        let newUser = action.payload//get user object
        return { ...newUser }
    } else if (action.type === Types.AUTH_STATE) {
        let isLoggedIn = action.payload//get boolean value (logged in or not)
        return { ...state, is_logged_in: isLoggedIn }
    } else {
        return state
    }
}
export default AuthReducer
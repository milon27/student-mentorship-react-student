import axios from "axios"
import Response from './../../helpers/Response';
import Define from './../../helpers/Define';
import Types from "./Types";

class AuthAction {
    constructor(dispatch) {
        this.dispatch = dispatch
    }

    //is logged in or not ck
    isLoggedIn = () => {
        return new Promise(async (resolve, reject) => {
            try {
                //hit api get response 
                const res = await axios.get('student/is-loggedin')
                const isLoggedInValue = res.data
                this.dispatch({
                    type: Types.AUTH_STATE,
                    payload: isLoggedInValue
                })
                resolve(isLoggedInValue)
            } catch (e) {
                //update UI or state
                reject(false)
            }
        })//end promise
    }

    //login student/user
    login = (email, password) => {
        return new Promise(async (resolve, reject) => {
            try {
                //hit api get response 
                const res = await axios.post('student/login', { email, password })
                const { error, message, response } = res.data
                if (error) {
                    reject(new Error(message))
                } else {
                    //login success
                    //update UI
                    this.dispatch({
                        type: Types.AUTH_LOGIN,
                        payload: response//user object
                    })
                    //resolve promise
                    const response_ui = Response(true, "Logged In Successful", message, Define.BT_SUCCESS, response)
                    resolve(response_ui)
                }
            } catch (e) {
                reject(new Error(e.message))
            }
        })//end promise
    }
    //signup a user/student 
    //@param student object{student_id,name,email,phone,parents_phone,password,present_address,photo_url}
    signup = (student_obj) => {
        return new Promise(async (resolve, reject) => {
            try {
                //hit api get response 
                const res = await axios.post('student/signup', student_obj)
                const { error, message, response } = res.data
                if (error) {
                    reject(new Error(message))
                } else {
                    //login success
                    //update UI
                    this.dispatch({
                        type: Types.AUTH_SIGNUP,
                        payload: response//user object
                    })
                    //resolve promise
                    const response_ui = Response(true, "SignUP Successful", message, Define.BT_SUCCESS, response)
                    resolve(response_ui)
                }
            } catch (e) {
                reject(new Error(e.message))
            }
        })//end promise
    }

}
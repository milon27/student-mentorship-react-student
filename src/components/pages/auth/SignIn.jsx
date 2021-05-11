import React, { useState, useContext } from 'react'
import { Button } from 'react-bootstrap'
import { Link, Redirect, useHistory } from 'react-router-dom'
import '../../../assets/css/auth.css'
import URL from '../../../utils/helpers/URL'
import Input from '../../layouts/form/Input'
import Define from './../../../utils/helpers/Define';
import AlertLoading from './../../layouts/AlertLoading';
import { DispatchContext } from './../../../utils/context/MainContext';
import AppAction from './../../../utils/context/actions/AppAction';
import AuthAction from './../../../utils/context/actions/AuthAction';
import Response from './../../../utils/helpers/Response';
import CUser from './../../../utils/helpers/CUser';
import logo from '../../../assets/img/logo.webp'

export default function SignIn() {
    const history = useHistory()
    //global state
    const { appDispatch, authDispatch } = useContext(DispatchContext)
    //local state
    const initvalue = {
        email: "",
        password: ""
    }
    const [student, setStudent] = useState(initvalue)

    //local method
    const onSubmit = async (e) => {
        e.preventDefault()
        const app = new AppAction(appDispatch)
        //ck password & confirm pass is same or not
        if (student.password.length <= 6) {
            app.SET_RESPONSE(Response(false, "Password length should be more than 6 character.", "", Define.BT_DANGER))
            return
        }
        //start loding..
        app.START_LOADING()
        //signup user
        try {
            const response = await new AuthAction(authDispatch).login(student.email, student.password)
            console.log(response)
            app.STOP_LOADING()
            //setStudent(initvalue)
            history.push(URL.HOME)
        } catch (e) {
            app.SET_RESPONSE(Response(false, "Sign In failed.", e.message, Define.BT_DANGER))
            app.STOP_LOADING()
        }
    }
    const onChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value })
    }

    // check alrady logged in or not
    // console.log(CUser.isLoggedIn())
    if (CUser.isLoggedIn() === true) {
        return <Redirect to={URL.HOME}></Redirect>
    }

    return (
        <>
            <div className="auth">
                <div className="inner">
                    <div className="d-flex flex-column">
                        <div className="d-flex justify-content-center mb-2">
                            <img src={logo} width={50} alt="" />
                        </div>
                        <div className="d-flex justify-content-center">
                            <h3>Sign In as a Student</h3>
                        </div>
                    </div>

                    <form onSubmit={onSubmit}>

                        <Input name="email" type="email" title="Student Email" value={student.email} onChange={onChange} />

                        <Input name="password" type="password" title="Student Password" value={student.password} onChange={onChange} />

                        <AlertLoading loadColor={Define.BT_INFO} />

                        <Button variant="primary" type="submit" className="btn btn-dark btn-lg btn-block " >Sign In</Button>

                        <p className="forgot-password text-right">
                            Not Yet registered, <Link to={URL.SIGN_UP}>Register Now</Link>
                        </p>
                    </form>
                </div>
            </div >
        </>
    )
}

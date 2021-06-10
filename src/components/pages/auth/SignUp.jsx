import React, { useState, useContext } from 'react'
import { Button } from 'react-bootstrap'
import { Link, useHistory, Redirect } from 'react-router-dom'
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

export default function SignUp() {
    const history = useHistory()
    //global state
    const { appDispatch, authDispatch } = useContext(DispatchContext)
    //local state
    const initvalue = {
        student_id: "",
        name: "",
        email: "",
        phone: "",
        password: "",
        c_password: "",
        present_address: "",
        parents_phone: "",
        photo_url: Define.NOT_SET
    }
    const [student, setStudent] = useState(initvalue)

    //lifecycle method 

    //local method
    const onSubmit = async (e) => {
        e.preventDefault()
        const app = new AppAction(appDispatch)
        //ck password & confirm pass is same or not
        if (student.password.length <= 6) {
            app.SET_RESPONSE(Response(false, "Password length should be more than 6 character.", "", Define.BT_DANGER))
            return
        }
        if (student.password !== student.c_password) {
            app.SET_RESPONSE(Response(false, "Password and Confirm Password doesn't match.", "", Define.BT_DANGER))
            return
        }
        //start loding..
        app.START_LOADING()
        //signup user
        try {
            const response = await new AuthAction(authDispatch).signup(student)
            console.log(response)
            app.STOP_LOADING()
            //setStudent(initvalue)
            history.push(URL.HOME)
        } catch (e) {
            app.SET_RESPONSE(Response(false, "SignUP failed.", e.message, Define.BT_DANGER))
            app.STOP_LOADING()
        }
    }
    const onChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value })
    }


    //check alrady logged in or not
    if (CUser.isLoggedIn()) {
        return <Redirect to={URL.HOME}></Redirect>
    }

    //return 
    return (
        <div className="auth">
            <div className="inner">

                <div className="d-flex flex-column">
                    <div className="d-flex justify-content-center mb-2">
                        <img src={logo} width={50} alt="" />
                    </div>
                    <div className="d-flex justify-content-center">
                        <h3>Register as a Student</h3>
                    </div>
                </div>

                <form onSubmit={onSubmit}>
                    <Input name="student_id" type="number" title="Student ID" value={student.student_id} onChange={onChange} />

                    <Input name="name" title="Student Name" value={student.name} onChange={onChange} />

                    <Input name="email" type="email" title="Student Email" value={student.email} onChange={onChange} />

                    <Input name="phone" type="tel" title="Student Phone" value={student.phone} onChange={onChange} />

                    <Input name="password" type="password" title="Student Password" value={student.password} onChange={onChange} />

                    <Input name="c_password" type="password" title="Student Confirm Password" value={student.c_password} onChange={onChange} />

                    <Input name="present_address" title="Student Present Address" value={student.present_address} onChange={onChange} />

                    <Input name="parents_phone" type="tel" title="Student parents Phone" value={student.parents_phone} onChange={onChange} />

                    <AlertLoading loadColor={Define.BT_INFO} />

                    <Button variant="primary" type="submit" className="btn btn-dark btn-lg btn-block " >Register</Button>

                    <p className="forgot-password text-right">
                        Already registered <Link to={URL.SIGN_IN}><a>log in?</a></Link>
                    </p>
                </form>
            </div>
        </div >
    )
}

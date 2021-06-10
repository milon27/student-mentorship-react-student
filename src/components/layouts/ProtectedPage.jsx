import React, { useState, useEffect } from 'react'
import CUser from './../../utils/helpers/CUser';
import axios from 'axios'
import { Redirect, useHistory } from 'react-router-dom'
import URL from './../../utils/helpers/URL';



export default function ProtectedPage({ children }) {
    const [authv, setAuthV] = useState(undefined)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        let mounted = true

        const ckLog = async () => {
            if (mounted) {
                try {
                    const ck = await axios.get('student/is-loggedin')
                    console.log("ck", ck);
                    //give true or false
                    if (!ck.data) {
                        //so clear the localStorage
                        CUser.logOut()
                        setAuthV(false)
                    } else {
                        if (CUser.getCurrentuser() && CUser.getCurrentuser() !== undefined) {
                            setAuthV(true)
                        } else {
                            CUser.logOut()
                            setAuthV(false)
                        }
                    }
                    setLoading(false)
                } catch (e) {
                    //so clear the localStorage
                    CUser.logOut()
                    console.log("error=", e);
                    setAuthV(false)
                    setLoading(false)
                }
            }
        }
        ckLog()

        return () => {
            mounted = false
        }

    }, [loading])


    if (!loading && loading === false) {
        if (authv === true) {
            return (
                <>
                    {children}
                </>
            )
        } else {
            return <Redirect to={URL.SIGN_IN}></Redirect>
        }
    } else {
        return (<div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="loader"></div>
        </div>)
    }
}

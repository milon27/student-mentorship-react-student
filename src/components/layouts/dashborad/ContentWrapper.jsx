import React from 'react'
import axios from 'axios'
import Header from '../Header'
import Footer from './../Footer';
import { useEffect } from 'react';
import CUser from './../../../utils/helpers/CUser';

export default function ContentWrapper({ children, title }) {

    useEffect(() => {
        //realod student info.
        //student/get-one/:table/:field/:value
        const load = async () => {
            const sid = CUser.getCurrentuser()?.student_id
            if (sid) {
                const res = await axios.get(`student/get-one/students/student_id/${sid}`);
                console.log(res.data);
                const { error, message, response } = res.data;
                CUser.setCurrentuser(response);
                console.log(CUser.getCurrentuser());
            }
        }
        load()
    }, [])

    return (
        <div id="content-wrapper" className="d-flex flex-column bg-white">
            <div id="content">
                {/*Topbar*/}
                <Header title={title} />
                {/* main content */}
                <div className="container-fluid">
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    )
}

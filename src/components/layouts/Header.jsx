import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'
import AuthAction from './../../utils/context/actions/AuthAction';
import URL from './../../utils/helpers/URL';
import CUser from './../../utils/helpers/CUser';
import { DispatchContext } from '../../utils/context/MainContext';
import axios from 'axios';
import AppAction from './../../utils/context/actions/AppAction';
import Response from './../../utils/helpers/Response';

export default function Header({ title }) {

    const history = useHistory()
    const { appDispatch, authDispatch } = useContext(DispatchContext)


    const logout = async (e) => {
        try {
            await new AuthAction(authDispatch).Logout()
            history.push(URL.SIGN_IN)
        } catch (e) {
            history.push(URL.SIGN_IN)
        }
    }

    const getVlink = async () => {
        try {
            const id = CUser.getCurrentuser().id
            const email = CUser.getCurrentuser().email
            const res = await axios.get(`student/get-link/${id}/${email}`)
            console.log(res.data);
            new AppAction(appDispatch).SET_RESPONSE(Response(true, "Check email for link", res.data.message, "success"))
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

            {/* <!-- Sidebar Toggle (Topbar) --> */}
            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3"
                onClick={() => {
                    document.getElementById("page-top").classList.toggle("sidebar-toggled");
                    document.getElementById("accordionSidebar").classList.toggle("toggled");
                }}
            >
                <i className="fa fa-bars"></i>
            </button>

            <h5>{title}</h5>

            {/* <!-- Topbar Navbar --> */}
            <ul className="navbar-nav ml-auto">



                {/* <!-- Nav Item - User Information --> */}
                <li className="nav-item dropdown no-arrow">

                    <Link to="#" className="nav-link dropdown-toggle" id="userDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">{CUser.getCurrentuser() && CUser.getCurrentuser().name}</span>
                        <i className="fas fa-user-circle text-primary  " style={{ fontSize: 23 }}></i>
                    </Link>

                    {/* <!-- Dropdown - User Information --> */}
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                        aria-labelledby="userDropdown">

                        <Link className="dropdown-item"
                            to="/"
                            target="_blank"
                        >
                            <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                            ID: {CUser.getCurrentuser() && CUser.getCurrentuser().student_id}
                        </Link>
                        <div className="dropdown-divider"></div>

                        <Link className="dropdown-item"
                            to={{ pathname: `tel:${CUser.getCurrentuser() && CUser.getCurrentuser().phone}` }}
                            target="_blank"
                        >
                            <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                            Phone: {CUser.getCurrentuser() && CUser.getCurrentuser().phone}
                        </Link>
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" to={{ pathname: `mailto:${CUser.getCurrentuser() && CUser.getCurrentuser().email}` }}
                            target="_top">
                            <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                            Email: {CUser.getCurrentuser() && CUser.getCurrentuser().email}

                        </Link>
                        <div className="dropdown-divider"></div>

                        <div className="dropdown-item" onClick={getVlink} >
                            <i className="fas fa-shield-alt fa-sm fa-fw mr-2 "></i>
                            {CUser.getCurrentuser() && CUser.getCurrentuser()?.is_verified == "0" ? "Verify Now" : "Varified."}
                        </div>
                        <div className="dropdown-divider"></div>

                        <div className="dropdown-item" onClick={logout} >
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                            Logout
                        </div>
                    </div>
                </li>

            </ul>

        </nav>
    )
}

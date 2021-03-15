import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/img/logo.webp'
import URL from '../../../utils/helpers/URL';

export default function Sidebar() {
    return (
        <>
            {/* <!-- Sidebar --> */}
            <ul className="navbar-nav bg-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                {/* <!-- Sidebar - Brand --> */}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <img src={logo} style={{ width: "50px", height: "50px", border: "3px solid white", borderRadius: "50%" }} alt="" />
                    </div>
                    <div className="sidebar-brand-text mx-3"><sup>Student Panel</sup></div>
                </a>
                {/* <!-- Divider --> */}
                <hr className="sidebar-divider my-0" />


                <li className="nav-item ">
                    <NavLink exact activeClassName="active" className="nav-link " to="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </NavLink>
                </li>
                <hr className="sidebar-divider" />

                <div className="sidebar-heading">
                    Options
                </div>
                <li className="nav-item ">
                    <NavLink exact activeClassName="active" className="nav-link" to={URL.TICKET_LIST}>
                        <i className="fas fa-fw fa-award"></i>
                        <span>Ticket List</span>
                    </NavLink>
                </li>

                {/*
                eita lagbe admin panel e;
                
                <li class="nav-item">
                    <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#ticket-list" aria-expanded="true" aria-controls="ticket-list">
                        <i class="fas fa-fw fa-cog"></i>
                        <span>Ticket List</span>
                    </a>
                    <div id="ticket-list" class="collapse" data-parent="#accordionSidebar">
                        <div class="bg-white py-2 collapse-inner rounded">
                            <NavLink className="collapse-item" to={URL.TICKET_LIST}>Processing</NavLink>
                        </div>
                    </div>
                </li> */}


                <hr className="sidebar-divider d-none d-md-block" />

                {/* <!-- Sidebar Toggler (Sidebar) --> */}
                <div className="text-center d-none d-md-inline mt-2">
                    <button className="rounded-circle border-0" id="sidebarToggle" onClick={() => {
                        document.getElementById("accordionSidebar").classList.toggle("toggled");
                    }}></button>
                </div>
            </ul>
            {/* <!-- End of Sidebar --> */}
        </>
    )
}

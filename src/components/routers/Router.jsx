import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import NotFound from './../pages/404/index';
import Home from './../pages/dashboard/Home';
import URL from './../../utils/helpers/URL';
import SignUp from '../pages/auth/SignUp';
import SignIn from './../pages/auth/SignIn';
import TicketList from './../pages/ticket/TicketList';
import SingleTicket from './../pages/ticket/SingleTicket';


export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={URL.HOME} component={Home} ></Route>
                <Route path={URL.SIGN_UP} component={SignUp}></Route>
                <Route path={URL.SIGN_IN} component={SignIn}></Route>
                <Route exact path={URL.TICKET_LIST} component={TicketList}></Route>
                <Route path={URL.TICKET_LIST + "/:id"} component={SingleTicket}></Route>
                <Route default component={NotFound}></Route>
            </Switch>
        </BrowserRouter>
    )
}

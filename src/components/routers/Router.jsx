import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import NotFound from './../pages/404/index';
import Home from './../pages/dashboard/Home';
import URL from './../../utils/helpers/URL';

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={URL.HOME} component={Home}></Route>
                <Route default component={NotFound}></Route>
            </Switch>
        </BrowserRouter>
    )
}

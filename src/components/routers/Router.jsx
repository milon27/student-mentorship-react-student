import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import DemoPage from '../pages/Demo_page'
import Home from '../pages/Home'

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/demo" component={DemoPage}></Route>
            </Switch>
        </BrowserRouter>
    )
}

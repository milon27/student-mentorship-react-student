import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignUp from "../pages/auth/SignUp";
import Todo from "../pages/todo/Todo";
import URL from "./../../utils/helpers/URL";
import NotFound from "./../pages/404/index";
import SignIn from "./../pages/auth/SignIn";
import Contributor from "./../pages/contributor/Contributor";
import Home from "./../pages/dashboard/Home";
import SingleTicket from "./../pages/ticket/SingleTicket";
import TicketList from "./../pages/ticket/TicketList";
import Notice from "../pages/notice/Notice";
import SkillList from './../pages/career/SkillList';
import SkillDetails from './../pages/career/SkillDetails';
import SubSkillDetails from './../pages/career/subskill/SubSkillDetails';

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={URL.SIGN_IN} component={SignIn}></Route>
        <Route exact path={URL.HOME} component={Home}></Route>
        <Route path={URL.SIGN_UP} component={SignUp}></Route>
        <Route path={URL.TODO_LIST} component={Todo}></Route>
        <Route exact path={URL.TICKET_LIST} component={TicketList}></Route>
        <Route path={URL.TICKET_LIST + "/:id"} component={SingleTicket}></Route>
        <Route path={URL.CONTRIBUTOR} component={Contributor}></Route>
        <Route path={URL.NOTICE_LIST} component={Notice}></Route>
        <Route exact path={URL.SKILL_LIST} component={SkillList}></Route>
        <Route exact path={URL.SKILL_LIST + "/:title" + "/:id"} component={SkillDetails}></Route>
        <Route path={URL.SUB_SKILL + "/:id"} component={SubSkillDetails}></Route>
        <Route default component={NotFound}></Route>
      </Switch>
    </BrowserRouter>
  );
}

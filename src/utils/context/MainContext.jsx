import React, { createContext, useReducer } from "react";
import AppReducer, { initAppState } from "./reducers/AppReducer";
import AuthReducer, { initAuthState } from "./reducers/AuthReducer";
import ListReducer, { initListState } from "./reducers/ListReducer";
import TodoReducer, { initTodoState } from "./reducers/TodoReducer";

export const StateContext = createContext();
export const DispatchContext = createContext();

export default function MainContext(props) {
  const [auth, authDispatch] = useReducer(AuthReducer, initAuthState); //for student auth
  const [app, appDispatch] = useReducer(AppReducer, initAppState); //for app state
  const [ticket_list, ticket_listDispatch] = useReducer(ListReducer, initListState);
  const [todo_list, todoDispatch] = useReducer(TodoReducer, initTodoState); //for todo list
  const [completeTodoList, completeTodoListDispatch] = useReducer(TodoReducer, initTodoState); //for completed todo list
  const [notice_list, notice_listDispatch] = useReducer(ListReducer, initListState);//for notice
  const [skill_list, skill_listDispatch] = useReducer(ListReducer, initListState);//for notice
  const [sub_skill_list, sub_skill_listDispatch] = useReducer(ListReducer, initListState);//for notice



  const global_state = {
    auth,
    app,
    ticket_list,
    todo_list,
    completeTodoList,
    notice_list,
    skill_list,
    sub_skill_list
  };
  const global_dispatch = {
    authDispatch,
    appDispatch,
    ticket_listDispatch,
    todoDispatch,
    completeTodoListDispatch,
    notice_listDispatch,
    skill_listDispatch,
    sub_skill_listDispatch
  };

  return (
    <StateContext.Provider value={global_state}>
      <DispatchContext.Provider value={global_dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

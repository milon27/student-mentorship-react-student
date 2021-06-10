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
  const [ticket_list, ticket_listDispatch] = useReducer(
    ListReducer,
    initListState
  );
  const [todo_list, todoDispatch] = useReducer(TodoReducer, initTodoState);
  const [completeTodoList, completeTodoListDispatch] = useReducer(
    TodoReducer,
    initTodoState
  ); //for any kind of list
  const [notice_list, notice_listDispatch] = useReducer(
    ListReducer,
    initListState
  );
  const global_state = {
    auth,
    app,
    ticket_list,
    todo_list,
    notice_list,
    completeTodoList,
  };
  const global_dispatch = {
    authDispatch,
    appDispatch,
    ticket_listDispatch,
    todoDispatch,
    notice_listDispatch,
    completeTodoListDispatch,
  };

  return (
    <StateContext.Provider value={global_state}>
      <DispatchContext.Provider value={global_dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

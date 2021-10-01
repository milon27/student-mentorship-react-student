import React, { useContext, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import "../../../assets/css/dashboard.css";
import AppAction from "../../../utils/context/actions/AppAction";
import Todo from "../../../utils/context/actions/TodoAction";
import {
  DispatchContext,
  StateContext,
} from "../../../utils/context/MainContext";
import Define from "../../../utils/helpers/Define";
import AlertLoading from "./../../layouts/AlertLoading";
import CompleteTodo from "./CompleteTodo";
import CreateTodo from "./CreateTodo";
import TodoDone from "./TodoDone";

export default function TodoList() {
  const [status, setStatus] = useState(false);
  const [completedItem, setCompletedItem] = useState();
  const user = JSON.parse(localStorage.getItem(Define.C_USER));
  const { appDispatch, todoDispatch, completeTodoListDispatch } =
    useContext(DispatchContext);
  const listAction = new Todo(todoDispatch);
  const completeList = new Todo(completeTodoListDispatch);
  const { completeTodoList, todo_list } = useContext(StateContext);

  // Set doneItem Completed
  const handleClickDelete = (e) => {
    setCompletedItem(e);
  };
  // Delete Completed Todo
  const handleDeleteTodo = async () => {
    const DeleteTodo = new AppAction(appDispatch);
    const resDelete = await completeList.deleteTodo(
      `todo/${completedItem.id}`,
      {
        id: completedItem.id,
        user_id: user.id,
        is_done: 1,
      }
    );
    DeleteTodo.SET_RESPONSE(resDelete);
  };
  console.log(completeTodoList, todo_list);
  // Completed todo
  useEffect(() => {
    const token = completeList.getSource();
    try {
      const uid = user.id;
      const load = async () => {
        try {
          if (uid) {
            //todo/user id/ [completed=1][processing=0]
            await completeList.getAllTodos(`todo/${uid}/1`);
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      load();
    } catch (error) {
      console.log(error);
    }

    //clean up
    return () => {
      token.cancel();
    };
  }, [completeTodoList.length, status]);
  return (
    <>
      <Row>
        <Col className="d-flex justify-content-center mb-3">
          <AlertLoading loadColor={Define.BT_DANGER} />
        </Col>
      </Row>
      <Row className="p-4">
        {/* Ticket Summary */}
        <div className="col-xl-6 col-lg-6 col-sm-6 col-12 mb-3 mb-md-0">
          <Card className="shadow1">
            <Card.Header className="shadow__header">To-Do</Card.Header>
            <div className="shadow__task">
              {/* create todo */}
              <CreateTodo />
              {/* Mark Entry as done */}
              <TodoDone setStatus={setStatus} status={status} />
            </div>
          </Card>
        </div>
        {/* To-Do */}
        <div className="col-xl-6 col-lg-6 col-sm-6 col-12 mb-3 mb-md-0">
          <Card className="shadow1">
            <Card.Header className="shadow__header">Completed</Card.Header>
            {/* To-do list needs loop for number of todos*/}
            {completeTodoList.map((completeTodo) => (
              <CompleteTodo
                completeTodo={completeTodo}
                key={completeTodo.id}
                handleDeleteTodo={handleDeleteTodo}
                setStatus={setStatus}
                status={status}
                handleClickDelete={handleClickDelete}
              />
            ))}
          </Card>
        </div>
      </Row>
    </>
  );
}

import React, { useContext, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import "../../../assets/css/dashboard.css";
import Todo from "../../../utils/context/actions/TodoAction";
import { DispatchContext } from "../../../utils/context/MainContext";
import Define from "../../../utils/helpers/Define";
import AlertLoading from "./../../layouts/AlertLoading";
import CompleteTodo from "./CompleteTodo";
import CreateTodo from "./CreateTodo";
import TodoDone from "./TodoDone";

export default function TodoList() {
  const [completeTodo, setCompleteTodo] = useState([]);
  const user = JSON.parse(localStorage.getItem(Define.C_USER));
  const { todoDispatch } = useContext(DispatchContext);
  const listAction = new Todo(todoDispatch);

  // Completed todo
  useEffect(() => {
    const token = listAction.getSource();
    try {
      const uid = user.id;
      const load = async () => {
        try {
          if (uid) {
            const res = await listAction.getCompleteTodo(`todo/${uid}/1`);
            setCompleteTodo(res.object);
          }
        } catch (e) {
          console.log("here.", e)
        }
      };
      load();
    } catch (e) {
      console.log(e);
    }

    //clean up
    return () => {
      token.cancel();
    };
  }, [completeTodo.length]);

  return (
    <>
      <Row>
        <Col className="d-flex justify-content-center mb-3">
          <AlertLoading loadColor={Define.BT_DANGER} />
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>To-Do List</h1>
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
              <TodoDone />
            </div>
          </Card>
        </div>
        {/* To-Do */}
        <div className="col-xl-6 col-lg-6 col-sm-6 col-12 mb-3 mb-md-0">
          <Card className="shadow1">
            <Card.Header className="shadow__header">Completed</Card.Header>
            {/* To-do list needs loop for number of todos*/}
            {completeTodo.length
              ? completeTodo.map((completeTodo) => (
                  <CompleteTodo
                    completeTodo={completeTodo}
                    key={completeTodo.id}
                  />
                ))
              : ""}
          </Card>
        </div>
      </Row>
    </>
  );
}

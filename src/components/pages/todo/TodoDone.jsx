import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import AppAction from "../../../utils/context/actions/AppAction";
import {
  DispatchContext,
  StateContext
} from "../../../utils/context/MainContext";
import Define from "../../../utils/helpers/Define";
import Todo from "./../../../utils/context/actions/TodoAction";
import ShowingList from "./ShowingList";

const TodoDone = ({ setStatus, status }) => {
  const [doneItem, setDoneItem] = useState({});
  const [feedback, setFeedback] = useState("");
  // const todo_list = allTodos.slice(0, 7);
  const user = JSON.parse(localStorage.getItem(Define.C_USER));
  const { appDispatch, todoDispatch } = useContext(DispatchContext);
  const listAction = new Todo(todoDispatch);
  const { todo_list } = useContext(StateContext);

  const handleClick = (e) => {
    setDoneItem(e);
  };
  // Handle Done
  const handleDone = async () => {
    const appAction = new AppAction(appDispatch);
    const res = await listAction.updateTodo(`todo/${doneItem.id}`, {
      id: doneItem.id,
      user_id: user.id,
      is_done: 1,
      feedback: feedback,
    });
    appAction.SET_RESPONSE(res);
    setStatus(!status);
  };

  // Handle Delete TO Do
  const handleDeleteToDo = async () => {
    const DeleteTodo = new AppAction(appDispatch);
    const resDelete = await listAction.deleteTodo(`todo/${doneItem.id}`, {
      id: doneItem.id,
      user_id: user.id,
      is_done: 0,
    });
    DeleteTodo.SET_RESPONSE(resDelete);
  };
  // get todos
  useEffect(() => {
    const token = listAction.getSource();
    try {
      const uid = user.id;
      const load = async () => {
        try {
          if (uid) {
            await listAction.getAllTodos(`todo/${uid}/0`);
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
  }, [todo_list.length]);
  // console.log(allTodo);
  // console.log(todo_list);

  return (
    <>
      {todo_list.length ? (
        todo_list.map((item, index) => (
          <ShowingList key={index} handleClick={handleClick} item={item} />
        ))
      ) : (
        <></>
      )}
      {/* Modal */}
      <form>
        <div
          className="modal fade"
          id="MarkEntryModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <Card className="shadow1">
                <Card.Header className="shadow__header">
                  Mark Entry as Done
                </Card.Header>
                <Card.Body className="shadow__task m-2">
                  <input
                    className="todo_entry form-control"
                    type="text"
                    name="title"
                    defaultValue={doneItem.title}
                    disabled
                  />
                  {/* <br />
                  <input
                    className="todo_entry form-control"
                    type="text"
                    name="date"
                    defaultValue={doneItem.dead_line}
                  /> */}
                  <br />
                  <textarea
                    rows="3"
                    cols="30"
                    className="todo_entry form-control"
                    name="comments"
                    placeholder="Comments(If Any):"
                    onChange={(e) => setFeedback(e.target.value)}
                  ></textarea>
                </Card.Body>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-dismiss="modal"
                    onClick={handleDeleteToDo}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-dismiss="modal"
                    onClick={handleDone}
                  >
                    Complete
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default TodoDone;

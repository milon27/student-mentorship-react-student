import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import AppAction from "../../../utils/context/actions/AppAction";
import { DispatchContext } from "../../../utils/context/MainContext";
import Define from "../../../utils/helpers/Define";
import Todo from "./../../../utils/context/actions/TodoAction";
import ShowingList from "./ShowingList";
const currentDate = new Date();

const TodoDone = () => {
  const [doneItem, setDoneItem] = useState({});
  const [feedback, setFeedback] = useState({});
  const [allTodos, setAllTodo] = useState([]);
  const allTodo = allTodos.slice(0, 7);
  const user = JSON.parse(localStorage.getItem(Define.C_USER));
  const { appDispatch, todoDispatch } = useContext(DispatchContext);
  const listAction = new Todo(todoDispatch);

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
    console.log(res);
    appAction.SET_RESPONSE(res);

    window.location.reload();
  };

  // Handle Delete TO Do
  let resDelete = false;
  const handleDeleteToDo = async () => {
    const DeleteTodo = new AppAction(appDispatch);
    const res = await listAction.deleteTodo(`todo/${doneItem.id}`, {
      id: doneItem.id,
      user_id: user.id,
      is_done: 0,
    });
    resDelete = res.object;
    DeleteTodo.SET_RESPONSE(res);
    window.location.reload();
  };
  // get todos
  useEffect(() => {
    const token = listAction.getSource();
    try {
      const uid = user.id;
      const load = async () => {
        if (uid) {
          const res = await listAction.getAllTodos(`todo/${uid}/0`);
          setAllTodo(res.object);
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
  }, [allTodo.length]);
  // console.log(allTodo);

  return (
    <>
      {allTodo.length ? (
        allTodo.map((item) => (
          <ShowingList handleClick={handleClick} item={item} />
        ))
      ) : (
        <></>
      )}
      {/* Modal */}
      <form>
        <div
          className="modal fade"
          id="MarkEntryModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <Card className="shadow1">
                <Card.Header className="shadow__header">
                  Mark Entry as Done
                </Card.Header>
                <Card.Body className="shadow__task m-2">
                  <input
                    className="todo_entry"
                    type="text"
                    name="title"
                    placeholder="title"
                    value={doneItem.title}
                    disabled
                  />
                  <br />
                  <input
                    className="todo_entry"
                    type="text"
                    name="date"
                    value={moment(currentDate).format(Define.FORMAT_DATE)}
                    placeholder="Deadline"
                  />
                  <br />
                  <textarea
                    rows="3"
                    cols="30"
                    className="todo_entry"
                    name="comments"
                    placeholder="Comments(If Any):"
                    onChange={(e) => {
                      setFeedback(e.target.value);
                    }}
                  ></textarea>
                </Card.Body>
                <div class="modal-footer">
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

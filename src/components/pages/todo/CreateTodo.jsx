import React, { useContext, useState } from "react";
import { Card } from "react-bootstrap";
import dateIcon from "../../../assets/img/date.png";
import { DispatchContext } from "../../../utils/context/MainContext";
import Define from "../../../utils/helpers/Define";
import AppAction from "./../../../utils/context/actions/AppAction";
import Todo from "./../../../utils/context/actions/TodoAction";

const CreateTodo = () => {
  const user = JSON.parse(localStorage.getItem(Define.C_USER));
  const { appDispatch, todoDispatch } = useContext(DispatchContext);
  const [createTodo, setCreateTodo] = useState({
    title: "",
    dead_line: "",
    user_id: user.id,
  });

  // Create todo
  const handleSubmit = async () => {
    const appAction = new AppAction(appDispatch);
    const res = await new Todo(todoDispatch).createTodo(
      "todo/create",
      createTodo
    );
    appAction.SET_RESPONSE(res);
    window.location.reload();
  };
  return (
    <div>
      <button
        type="button"
        className="todo_list__createButton"
        data-toggle="modal"
        data-target="#exampleModalCenter"
      >
        <div className="d-flex justify-content-between p-2">
          <span>+ Create new entry </span>
          <img
            className="todo_list__createButton__dateIcon"
            alt="dateIcon"
            src={dateIcon}
          />
        </div>
      </button>
      {/* Enter New To Do Item */}
      <form>
        <div
          className="modal fade"
          id="exampleModalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <Card className="shadow1">
                <Card.Header className="shadow__header">
                  New To-Do entrys
                </Card.Header>
                <Card.Body className="shadow__task m-2">
                  <input
                    className="todo_entry"
                    type="text"
                    name="title"
                    placeholder="title"
                    required
                    onChange={(e) =>
                      setCreateTodo({ ...createTodo, title: e.target.value })
                    }
                  />
                  <br />
                  <input
                    className="todo_entry "
                    type="date"
                    name="deadline"
                    id="txtDate"
                    placeholder="Deadline"
                    autoComplete="off"
                    required
                    onChange={(e) =>
                      setCreateTodo({
                        ...createTodo,
                        dead_line: e.target.value,
                      })
                    }
                  />
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
                    onClick={handleSubmit}
                  >
                    Create
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateTodo;

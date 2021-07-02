import moment from "moment";
import React, { useContext, useState } from "react";
import { Card } from "react-bootstrap";
import dateIcon from "../../../assets/img/date.png";
import { DispatchContext } from "../../../utils/context/MainContext";
import Define from "../../../utils/helpers/Define";
import Helper from "../../../utils/helpers/Helper";
import Response from "../../../utils/helpers/Response";
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
    if (!Helper.validateField(createTodo.title, createTodo.dead_line)) {
      appAction.SET_RESPONSE(
        Response(false, "Enter all filed", "", Define.BT_DANGER, {})
      );
      return;
    }
    const res = await new Todo(todoDispatch).createTodo(
      "todo/create",
      createTodo
    );
    appAction.SET_RESPONSE(res);
  };

  return (
    <div>
      <button
        type="button"
        className="btn border todo_list__createButton"
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
                  <p>Enter To-Do Title</p>
                  <input
                    className="todo_entry form-control"
                    type="text"
                    name="title"
                    placeholder="title"
                    onChange={(e) =>
                      setCreateTodo({ ...createTodo, title: e.target.value })
                    }
                  />
                  <br />
                  <p>Enter DeadLine of Todo</p>
                  <input
                    className="todo_entry form-control"
                    type="date"
                    name="deadline"
                    min={moment(new Date()).format("YYYY-MM-DD")}
                    autoComplete="off"
                    onChange={(e) =>
                      setCreateTodo({
                        ...createTodo,
                        dead_line: e.target.value,
                      })
                    }
                  />
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

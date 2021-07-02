import moment from "moment";
import React from "react";
import { Card } from "react-bootstrap";
import completed_taskIcon from "../../../assets/img/completed_todo.png";
import Define from "../../../utils/helpers/Define";

const CompleteTodo = ({
  completeTodo,
  handleDeleteTodo,
  setStatus,
  handleClickDelete,
  status,
}) => {
  return (
    <>
      <Card.Body
        className="shadow1 shadow__task m-2"
        data-toggle="modal"
        data-target="#completeTodoID"
        onClick={() => handleClickDelete(completeTodo)}
      >
        <div className="d-flex justify-content-between Showing__TaskList pt-3">
          <div className="d-flex align-items-center">
            <img
              className="todo_list__createButton__dateIcon"
              alt="dateIcon"
              src={completed_taskIcon}
            />
            <label className="ml-3" htmlFor="SE">
              {completeTodo.title}
            </label>
          </div>
          <small>
            {moment(completeTodo.dead_line).format(Define.FORMAT_DATE)}
          </small>
          <i className="fas fa-trash ml-2"></i>
        </div>
        {completeTodo.feedback ? <small className="ml-3">Comments :{completeTodo.feedback}</small> : ""}

      </Card.Body>

      {/* Delete Completed TOdo Modal  */}
      <div
        className="modal fade"
        id="completeTodoID"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <Card className="shadow1">
              <Card.Body className="shadow__task m-2">
                <p>Are you want's to delete this todo?</p>
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
                  onClick={() => {
                    handleDeleteTodo();
                    setStatus(!status);
                  }}
                >
                  Delete
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompleteTodo;

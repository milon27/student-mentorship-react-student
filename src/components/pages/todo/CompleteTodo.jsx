import React from "react";
import moment from "moment";
import { Card } from "react-bootstrap";
import completed_taskIcon from "../../../assets/img/completed_todo.png";
import Define from "../../../utils/helpers/Define";

const CompleteTodo = ({ completeTodo }) => {
  return (
    <Card.Body className="shadow1 shadow__task m-2">
      <div class="d-flex justify-content-between Showing__TaskList pt-3">
        <div>
          <img 
            className="todo_list__createButton__dateIcon"
            alt="dateIcon"
            src={completed_taskIcon}
          />
          <label className="ml-3" for="SE">
            {completeTodo.title}
          </label>
        </div>
        <small>{moment(completeTodo.dead_line).format(Define.FORMAT_DATE)}</small>
      </div>
      <small className="ml-3">Comments :{completeTodo.feedback}</small>
    </Card.Body>
  );
};

export default CompleteTodo;

import moment from "moment";
import React from "react";
import Define from "../../../utils/helpers/Define";
import circleIcon from "../../../assets/img/circleIcon.webp";
const ShowingList = ({ handleClick, item }) => {
  return (
    <>
      <div class="d-flex justify-content-between Showing__TaskList pt-3">
        <div
          onClick={() => handleClick(item)}
          data-toggle="modal"
          data-target="#MarkEntryModal"
        >
          {/* <input
            type="checkbox"
            id="SE"
            name="SE Assignment"
            value="SE_Assignment"
          /> */}
            <img
            className="todo_list__createButton__dateIcon"
            alt="Circular Icon"
            id="SE"
            src={circleIcon}
          />
          <label className="ml-3" for="SE">
            {item.title}
          </label>
        </div>

        <small>{moment(item.dead_line).format(Define.FORMAT_DATE)}</small>
        
      </div>
    </>
  );
};

export default ShowingList;
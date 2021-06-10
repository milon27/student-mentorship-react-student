import moment from "moment";
import React, { useState } from "react";
import { Table } from "react-bootstrap";
import Define from "./../../../utils/helpers/Define";
import NoticeDelete from "./NoticeDelete";
import NoticeUpdate from "./NoticeUpdate";
import NoticeView from "./NoticeView";

export default function NoticeTable({ notice_list }) {
  const [show, setShow] = useState({ view: false, edit: false, delete: false });
  const [viewItem, setViewItem] = useState(null);

  // Handle View
  const handleClickView = (event) => {
    setShow((pState) => ({ ...pState, view: true }));
    setViewItem(event);
  };
  // Handle Edit
  const handleClickEdit = (event) => {
    setShow((pState) => ({ ...pState, edit: true }));
    setViewItem(event);
  };
  // Handle DeleteTodo
  const handleClickDelete = (event) => {
    setShow((pState) => ({ ...pState, delete: true }));
    setViewItem(event);
  };

  return (
    <div>
      {viewItem ? (
        <NoticeView show={show.view} setShow={setShow} viewItem={viewItem} />
      ) : (
        <></>
      )}
      {viewItem ? (
        <NoticeUpdate show={show.edit} setShow={setShow} viewItem={viewItem} />
      ) : (
        <></>
      )}
      {viewItem ? (
        <NoticeDelete
          show={show.delete}
          setShow={setShow}
          viewItem={viewItem}
        />
      ) : (
        <></>
      )}
      {notice_list.length > 0 ? (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID#</th>
                <th>Notice Title</th>
                <th>Description</th>
                <th>Date</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {notice_list.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>
                      {moment(item.created_at).format(Define.FORMAT_DATE)}
                    </td>
                    <td>
                      <button
                        className="btn text-info"
                        onClick={() => handleClickView(item)}
                      >
                        {" "}
                        View{" "}
                      </button>
                      <button
                        className="btn text-info"
                        onClick={() => handleClickEdit(item)}
                      >
                        {" "}
                        Edit{" "}
                      </button>
                      <button
                        className="btn text-info"
                        onClick={() => handleClickDelete(item)}
                      >
                        {" "}
                        Delete{" "}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      ) : (
        <div>
          <h3 className="text-center">No Notice Found</h3>
        </div>
      )}
    </div>
  );
}

import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Card, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../../assets/css/dashboard.css";
import completedImg from "../../../assets/img/completed.svg";
import pendingImg from "../../../assets/img/pending.svg";
import processingImg from "../../../assets/img/processing.svg";
import snoozedImg from "../../../assets/img/snoozed.svg";
import Define from "../../../utils/helpers/Define";
import CUser from "./../../../utils/helpers/CUser";
import URL from "./../../../utils/helpers/URL";
const curDate = new Date().getTime();

export default function TicketSummary() {
  const init = {
    total_pending: 0,
    total_processing: 0,
    total_snoozed: 0,
    total_completed: 0,
  };
  const [summary, setSummary] = useState(init);
  const user = JSON.parse(localStorage.getItem(Define.C_USER));
  const [allTodo, setAllTodo] = useState([]);
  const [Notice, setNotice] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const load = async () => {
      const res = await axios.get(
        `support/summary/student/${CUser?.getCurrentuser()?.student_id}`,
        { cancelToken: source.token }
      );
      console.log(res);
      if (!res.data.error) {
        setSummary(res.data.response);
      } else {
        setSummary(init);
      }
    };
    load();
    return () => {
      source.cancel();
    };
  }, []);

  // Get Notice of recent total 7
  useEffect(() => {
    const source = axios.CancelToken.source();
    const load = async () => {
      const res = await axios.get(`notice/get-recent/4`, {
        cancelToken: source.token,
      });
      console.log(res);
      if (!res.data.error) {
        setNotice(res.data.response);
      }
    };
    load();
    return () => {
      source.cancel();
    };
  }, []);

  // Get All Todos For Next 7 Days

  useEffect(() => {
    const source = axios.CancelToken.source();
    const load = async () => {
      const res = await axios.get(
        `todo/upto/7/${CUser?.getCurrentuser()?.id}`,
        { cancelToken: source.token }
      );
      console.log(res);
      if (!res.data.error) {
        setAllTodo(res.data.response);
      }
    };

    load();
    return () => {
      source.cancel();
    };
  }, []);
  return (
    <>
      <Row >
        {/* Ticket Summary */}
        <div className="col-xl-4 col-sm-6 col-12 mb-3 mb-md-0">
          <Card className="shadow1">
            <Card.Header className="shadow__header">Ticket Summary</Card.Header>
            {/* Pending Tickets */}
            <Card.Body className="shadow1 shadow__task m-2">
              <div className="media d-flex justify-content-between">
                <div className="align-self-center">
                  <img src={pendingImg} alt="" className="icon_width" />
                </div>
                <div className="media-body ml-4">
                  <span>
                    <Link to={URL.TICKET_LIST}>Pending Tickets</Link>
                  </span>
                </div>
                <div className="shadow__total_pending">
                  <p>{summary.total_pending}</p>
                </div>
              </div>
            </Card.Body>
            {/*  Processing Tickets*/}
            <Card.Body className="shadow1 shadow__task m-2">
              <div className="media d-flex justify-content-between">
                <div className="align-self-center">
                  <img src={processingImg} alt="" className="icon_width" />
                </div>
                <div className="media-body ml-4">
                  <span>
                    <Link to={URL.TICKET_LIST}>Processing Tickets</Link>
                  </span>
                </div>
                <div className="shadow__total_pending">
                  <p>{summary.total_processing}</p>
                </div>
              </div>
            </Card.Body>
            {/* Snoozed Tickets */}
            <Card.Body className="shadow1 shadow__task m-2">
              <div className="media d-flex justify-content-between">
                <div className="align-self-center">
                  <img src={snoozedImg} alt="" className="icon_width" />
                </div>
                <div className="media-body ml-4">
                  <span>
                    <Link to={URL.TICKET_LIST}>Total Snoozed Tickets</Link>
                  </span>
                </div>
                <div className="shadow__total_pending">
                  <p>{summary.total_snoozed}</p>
                </div>
              </div>
            </Card.Body>
            {/* Completed Tickets */}
            <Card.Body className="shadow1 shadow__task m-2">
              <div className="media d-flex justify-content-between">
                <div className="align-self-center">
                  <img src={completedImg} alt="" className="icon_width" />
                </div>
                <div className="media-body ml-4">
                  <span>
                    <Link to={URL.TICKET_LIST}>Total Completed Tickets</Link>
                  </span>
                </div>
                <div className="shadow__total_pending">
                  <p>{summary.total_completed}</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
        {/* To-Do */}
        <div className="col-xl-4 col-sm-6 col-12 mb-3 mb-md-0">
          <Card className="shadow1">
            <Card.Header className="shadow__header">To-Do</Card.Header>
            {/* To-do list needs loop for number of todos*/}
            {allTodo.length === 0 ? (
              <Card.Body className="shadow1 shadow__task m-2">
                <div className="media d-flex justify-content-between">
                  <div className="media-body ml-2">
                    <span>
                      <Link to={URL.TODO_LIST}>No To-Do Created Yet</Link>
                    </span>
                  </div>
                </div>
              </Card.Body>
            ) : (
              allTodo.map((item, index) => (
                <Card.Body key={index} className="shadow1 shadow__task m-2">
                  <div className="media d-flex justify-content-between">
                    <div className="media-body ml-2">
                      <span>
                        <Link to={URL.TODO_LIST}>{item.title}</Link>
                      </span>
                    </div>
                    <div className="shadow__total_pending">
                      <small>
                        Due in{" "}
                        {Math.round(
                          Math.abs(
                            curDate - new Date(item.dead_line).getTime()
                          ) /
                          (1000 * 60 * 60 * 24)
                        )}{" "}
                        days
                      </small>
                    </div>
                  </div>
                </Card.Body>
              ))
            )}
          </Card>
        </div>
        {/* Notice */}
        <div className="col-xl-4 col-sm-6 col-12 mb-3 mb-md-0">
          <Card className="shadow1">
            <Card.Header className="shadow__header">Notice</Card.Header>
            {/* Notice needs loop for number of todos*/}
            {Notice.length === 0 ? (
              <Card.Body className="shadow1 shadow__task m-2">
                <div className="media d-flex justify-content-between">
                  <div className="media-body ml-4">
                    <span>
                      <Link to={URL.NOTICE_LIST}>No Notice Published Yet</Link>
                    </span>
                  </div>
                </div>
              </Card.Body>
            ) : (
              Notice.map((item, index) => (
                <Card.Body key={index} className="shadow1 shadow__task m-2">
                  <div className="media d-flex justify-content-between">
                    <div className="media-body ml-4">
                      <span>
                        <Link to={URL.NOTICE_LIST}>{item.title}</Link>
                      </span>
                    </div>
                    <div className="shadow__total_pending">
                      <small>
                        {moment(item.created_at).format(
                          Define.FORMAT_DATE_NOTICE
                        )}
                      </small>
                    </div>
                  </div>
                </Card.Body>
              ))
            )}
          </Card>
        </div>
      </Row>
    </>
  );
}

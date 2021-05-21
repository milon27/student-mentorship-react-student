import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import CUser from './../../../utils/helpers/CUser';
import { Link } from 'react-router-dom'
import '../../../assets/css/dashboard.css';
import pendingImg from '../../../assets/img/pending.svg'
import completedImg from '../../../assets/img/completed.svg'
import snoozedImg from '../../../assets/img/snoozed.svg'
import processingImg from '../../../assets/img/processing.svg'
import URL from './../../../utils/helpers/URL';
import Define from '../../../utils/helpers/Define';
import Todo from '../../../utils/context/actions/TodoAction';
import { DispatchContext } from '../../../utils/context/MainContext';
const curDate = new Date().getTime();

export default function TicketSummary() {
    const init = {
        total_pending: 0,
        total_processing: 0,
        total_snoozed: 0,
        total_completed: 0,
    }
    const [summary, setSummary] = useState(init)
    const user = JSON.parse(localStorage.getItem(Define.C_USER));
    const { appDispatch, todoDispatch } = useContext(DispatchContext);
    const [allTodos, setAllTodo] = useState([]);
    const allTodo = allTodos.slice(0, 5);

    useEffect(() => {
        const source = axios.CancelToken.source();
        const load = async () => {
            const res = await axios.get(`support/summary/student/${CUser?.getCurrentuser()?.student_id}`, { cancelToken: source.token })
            console.log(res)
            if (!res.data.error) {
                setSummary(res.data.response)
            } else {
                setSummary(init)
            }
        }
        load()
        return () => {
            source.cancel()
        }
    }, [])

    // Showing Todo LIst 

    const listAction = new Todo(todoDispatch);

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
    }, []);
    return (
        <>
            <Row className="p-4">
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
                                    <span><Link to={URL.TICKET_LIST}>Pending Tickets</Link></span>
                                </div>
                                <div className="shadow__total_pending">
                                    <h3>{summary.total_pending}</h3>
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
                                    <span><Link to={URL.TICKET_LIST}>Processing Tickets</Link></span>
                                </div>
                                <div className="shadow__total_pending">
                                    <h3>{summary.total_processing}</h3>
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
                                    <span><Link to={URL.TICKET_LIST}>Total Snoozed Tickets</Link></span>
                                </div>
                                <div className="shadow__total_pending">
                                    <h3>{summary.total_snoozed}</h3>
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
                                    <span><Link to={URL.TICKET_LIST}>Total Completed Tickets</Link></span>
                                </div>
                                <div className="shadow__total_pending">
                                    <h3>{summary.total_completed}</h3>
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
                        {allTodo.length === 0 ? "No To do Created Yet" :
                            allTodo.map(item => (
                                <Card.Body className="shadow1 shadow__task m-2">
                                    <div className="media d-flex justify-content-between">
                                        <div className="media-body ml-2">
                                            <span><Link to="/todo">{item.title}</Link></span>
                                        </div>
                                        <div className="shadow__total_pending">
                                            <small>Due in {Math.round(Math.abs(curDate - new Date(item.dead_line).getTime()) / (1000 * 60 * 60 * 24))} days</small>
                                        </div>
                                    </div>
                                </Card.Body>
                            ))
                        }
                    </Card>
                </div>
                {/* Notice */}
                <div className="col-xl-4 col-sm-6 col-12 mb-3 mb-md-0">
                    <Card className="shadow1">
                        <Card.Header className="shadow__header">Notice</Card.Header>
                        {/* Notice needs loop for number of todos*/}
                        <Card.Body className="shadow1 shadow__task m-2">
                            <div className="media d-flex justify-content-between">
                                <div className="media-body ml-2">
                                    <span><Link to={URL.Dynamic_URL}>No Notice Published Yet</Link></span>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>

            </Row>
        </>
    )
}

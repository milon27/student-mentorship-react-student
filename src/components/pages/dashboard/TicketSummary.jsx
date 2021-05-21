import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import CUser from './../../../utils/helpers/CUser';
import { Link } from 'react-router-dom'
import pendingImg from '../../../assets/img/pending.svg'
import completedImg from '../../../assets/img/completed.svg'
import snoozedImg from '../../../assets/img/snoozed.svg'
import processingImg from '../../../assets/img/processing.svg'
import URL from './../../../utils/helpers/URL';

export default function TicketSummary() {
    const init = {
        total_pending: 0,
        total_processing: 0,
        total_snoozed: 0,
        total_completed: 0,
    }
    const [summary, setSummary] = useState(init)

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

    return (
        <>
            <Row>
                <Col className="mb-2">
                    <h3>Ticket Summary</h3>
                </Col>
            </Row>
            <Row>
                <div className="col-xl-3 col-sm-6 col-12 mb-3 mb-md-0">
                    <Card className="shadow">
                        <Card.Body>
                            <div className="media d-flex">
                                <div className="align-self-center">
                                    <img src={pendingImg} alt="" className="icon_width" />
                                </div>
                                <div className="media-body text-right">
                                    <h3>{summary.total_pending}</h3>
                                    <span><Link to={URL.TICKET_LIST}>Pending Tickets</Link></span>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-xl-3 col-sm-6 col-12 mb-3 mb-md-0">
                    <Card className="shadow">
                        <Card.Body>
                            <div className="media d-flex">
                                <div className="align-self-center">
                                    <img src={processingImg} alt="" className="icon_width" />
                                </div>
                                <div className="media-body text-right">
                                    <h3>{summary.total_processing}</h3>
                                    <span><Link to={URL.TICKET_LIST}>Processing Tickets</Link></span>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-xl-3 col-sm-6 col-12 mb-3 mb-md-0">
                    <Card className="shadow">
                        <Card.Body>
                            <div className="media d-flex">
                                <div className="align-self-center">
                                    <img src={snoozedImg} alt="" className="icon_width" />
                                </div>
                                <div className="media-body text-right">
                                    <h3>{summary.total_snoozed}</h3>
                                    <span><Link to={URL.TICKET_LIST}>Total Snoozed Tickets</Link></span>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-xl-3 col-sm-6 col-12 mb-3 mb-md-0">
                    <Card className="shadow">
                        <Card.Body>
                            <div className="media d-flex">
                                <div className="align-self-center">
                                    <img src={completedImg} alt="" className="icon_width" />
                                </div>
                                <div className="media-body text-right">
                                    <h3>{summary.total_completed}</h3>
                                    <span><Link to={URL.TICKET_LIST}>Total Completed Tickets</Link></span>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </Row>
        </>
    )
}

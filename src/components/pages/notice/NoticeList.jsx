import React, { useContext, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { StateContext } from '../../../utils/context/MainContext';
import Define from '../../../utils/helpers/Define';
// import TicketModel from './TicketModel';
import AlertLoading from '../../layouts/AlertLoading';
import NoticeModel from './NoticeModel';
import NoticeTable from './NoticeTable';

export default function NoticeList() {
    //local state
    const [show, setShow] = useState(false);
    const [page, setPage] = useState(1);

    //global state
    const { notice_list } = useContext(StateContext);
    //pagination handle
    const prev = () => {
        if (page > 1) {
            setPage(page => page - 1)
        } else {
            alert("no prev")
        }
    }
    const next = () => {
        if (notice_list.length < Define.TICKET_PAGE_SIZE) {
            //next page not availble
            alert("no next")
        } else {
            setPage(page => page + 1)
        }
    }

    return (
        <>
            <NoticeModel show={show} setShow={setShow} />
            <Row >
                <Col className="d-flex justify-content-center mb-3">
                    <AlertLoading loadColor={Define.BT_DANGER} />
                </Col>
            </Row>
            <Row >
                <Col className="d-flex justify-content-start mb-3">
                    <Button className="mr-2" onClick={prev}>Prev</Button>
                    <Button className="mr-2" disabled>{page}</Button>
                    <Button className="mr-2" onClick={next}>Next</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <NoticeTable page={page} />
                </Col>
            </Row>
        </ >
    )
}

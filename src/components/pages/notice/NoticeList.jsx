import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import ListAction from '../../../utils/context/actions/ListAction';
import { DispatchContext, StateContext } from '../../../utils/context/MainContext';
import CUser from '../../../utils/helpers/CUser';
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
    const { notice_listDispatch } = useContext(DispatchContext);

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

    //load data
    useEffect(() => {

        const listAction = new ListAction(notice_listDispatch)
        const token = listAction.getSource()
        try {
            const uid = CUser.getCurrentuser() && CUser.getCurrentuser().student_id
            const load = async () => {
                try {
                    if (uid) {
                        const res = await listAction.getAll(`notice/get-all/1`)
                    }
                } catch (e) {
                    console.log(e);
                }
            }
            load()
        } catch (e) {
            console.log(e)
        }

        //clean up
        return () => {
            token.cancel()
        }

    }, [notice_list.length])
    
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
                    <Col className="d-flex justify-content-end mb-3">
                        <Button onClick={() => { setShow(true) }}>Create New Notice</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <NoticeTable  notice_list={notice_list} />
                    </Col>
                </Row>
        </ >
    )
}

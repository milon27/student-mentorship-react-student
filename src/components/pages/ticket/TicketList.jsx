import React, { useState, useContext, useEffect } from 'react'
import Main from '../../layouts/dashborad/Main';
import ProtectedPage from './../../layouts/ProtectedPage';
import TicketTable from './TicketTable';
import { Row, Col, Button } from 'react-bootstrap';
import TicketModel from './TicketModel';
import AlertLoading from './../../layouts/AlertLoading';
import Define from '../../../utils/helpers/Define';
import { DispatchContext, StateContext } from './../../../utils/context/MainContext';
import ListAction from './../../../utils/context/actions/ListAction';
import CUser from './../../../utils/helpers/CUser';

export default function TicketList() {
    //local state
    const [show, setShow] = useState(false);//modal
    const [page, setPage] = useState(1)

    //global state
    const { ticket_list } = useContext(StateContext)
    const { ticket_listDispatch } = useContext(DispatchContext)

    //pagination handle
    const prev = () => {
        if (page > 1) {
            setPage(page => page - 1)
        } else {
            alert("no prev")
        }
    }
    const next = () => {
        if (ticket_list.length < Define.TICKET_PAGE_SIZE) {
            //next page not availble
            alert("no next")
        } else {
            setPage(page => page + 1)
        }
    }



    //load data
    useEffect(() => {

        const listAction = new ListAction(ticket_listDispatch)
        const token = listAction.getSource()
        try {
            const uid = CUser.getCurrentuser() && CUser.getCurrentuser().student_id
            const load = async () => {
                try {
                    if (uid) {
                        const res = await listAction.getAll(`support/get/ticket/student_id/${uid}/${page}`)
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

    }, [ticket_list.length, page])

    return (
        <ProtectedPage>
            {/* //TicketList-> ticketmodel-> MyModel */}
            {/* //TicketList-> TicketTable */}
            <Main title="Ticket List">
                <TicketModel show={show} setShow={setShow} />
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
                        <Button onClick={() => { setShow(true) }}>Create Ticket</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TicketTable ticket_list={ticket_list} />
                    </Col>
                </Row>
            </Main>
        </ProtectedPage >
    )
}

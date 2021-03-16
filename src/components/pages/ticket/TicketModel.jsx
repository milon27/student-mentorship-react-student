import React, { useContext, useState } from 'react'
import Input from '../../layouts/form/Input'
import MyModal from '../../layouts/modal/MyModal'
import Define from './../../../utils/helpers/Define';
import CUser from './../../../utils/helpers/CUser';
import Helper from '../../../utils/helpers/Helper';
import { DispatchContext, StateContext } from './../../../utils/context/MainContext';
import AppAction from './../../../utils/context/actions/AppAction';
import Response from './../../../utils/helpers/Response';
import ListAction from './../../../utils/context/actions/ListAction';

export default function TicketModel({ show, setShow }) {
    const { app } = useContext(StateContext)
    const { appDispatch, ticket_listDispatch } = useContext(DispatchContext)

    const initTicket = {
        student_id: CUser.getCurrentuser() && CUser.getCurrentuser().student_id,
        ticket_title: "",
        ticket_dept: Define.TICKET_DEPT_AO,
        message: ""
    }
    const [ticket, setTicket] = useState(initTicket)



    const onSubmit = async () => {
        //hide the modal
        setShow(false)
        //validation
        const appAction = new AppAction(appDispatch)
        if (!Helper.validateField(ticket.ticket_title, ticket.message)) {
            appAction.SET_RESPONSE(Response(false, "Enter all filed", "", Define.BT_DANGER, {}))
            return
        }
        //call api
        const listAction = new ListAction(ticket_listDispatch)
        const res = await listAction.addData('support/create-ticket', ticket)
        appAction.SET_RESPONSE(res)
    }

    const onChange = (e) => {
        setTicket({ ...ticket, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <MyModal title="Create New Ticket" show={show} setShow={setShow} onSubmit={onSubmit}>
                <Input name="ticket_title" title="Problem Title" value={ticket.ticket_title} onChange={onChange} />
                <Input name="message" type="textarea" title="Your Problem" value={ticket.message} onChange={onChange} />
            </MyModal>
        </div>
    )
}

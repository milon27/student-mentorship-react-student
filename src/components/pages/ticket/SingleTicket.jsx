import React, { useState, useEffect } from 'react'
import Main from '../../layouts/dashborad/Main'
import ProtectedPage from '../../layouts/ProtectedPage'

import CUser from './../../../utils/helpers/CUser';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import URL from '../../../utils/helpers/URL';
import Define from './../../../utils/helpers/Define';
import { Card, Row } from 'react-bootstrap';
import moment from 'moment';
import useTicketSocket from './../../../utils/hooks/useTicketSocket';
import ScrollToBottom from 'react-scroll-to-bottom';


import '../../../assets/css/chat.css'

export default function SingleTicket({ match }) {

    //local state
    const [ticket, setTicket] = useState({})
    const [message, setMessage] = useState("")
    const [chats, setChats, joinTicket, createMessage] = useTicketSocket()

    const history = useHistory()

    //init the socket
    useEffect(() => {
        if (ticket)
            //join the socket 
            joinTicket(ticket)
    }, [ticket])


    //load chat list
    useEffect(() => {
        try {

            const load = async () => {
                //load the ticket first
                const ticketRes = await axios.get(`support/get-one/ticket/id/${match.params.id}/`)
                const ticket = ticketRes.data
                //console.log(ticket)
                if (!ticket.error && (ticket.response.ticket_state === Define.TICKET_PPROCESSING || ticket.response.ticket_state === Define.TICKET_SNOOZED)) {
                    setTicket(ticket.response)
                    //if valid then load chats
                    const res = await axios.get(`support/get/ticket_chat/ticket_id/${match.params.id}/`)
                    setChats([...res.data.response])
                } else {
                    history.push(URL.TICKET_LIST)
                }
            }
            load()
        } catch (e) {
            console.log(e);
        }

    }, [])

    //add new chat
    const addNew = async (e) => {
        e.preventDefault();
        if (!message && message === "") {
            return
        }

        const chatObj = {
            sender_id: CUser.getCurrentuser() && CUser.getCurrentuser().student_id,
            message: message,
            ticket_id: match.params.id,
            created_at: moment(new Date()).format()
        }

        chatObj.id = new Date().getTime()
        createMessage(chatObj)
        setMessage("")
    }

    let classname = ticket.ticket_state !== Define.TICKET_SNOOZED ? "col-md-12" : "col-md-9"

    return (
        <>
            <ProtectedPage>
                <Main title={`Ticket Title: ${ticket.ticket_title}, No- ${match.params.id}`}>
                    <Row>
                        <div className={`${classname} col-xs-12`}>
                            {/* <!-- Panel Chat --> */}
                            <div className="panel" id="chat">
                                <div className="panel-body">
                                    <ScrollToBottom className="ov-y" >
                                        {chats.length > 0 && [].concat(chats).reverse().map(chat => {
                                            //
                                            const classV = (chat.sender_id === (CUser.getCurrentuser() && CUser.getCurrentuser().student_id)) ? "chat" : "chat chat-left"

                                            return <div key={chat.id} className={classV} >
                                                <div className="chat-avatar">
                                                    <a className="avatar avatar-online" data-toggle="tooltip" href="#" data-placement="left" title="" data-original-title="Edward Fletcher">
                                                        {/* <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" /> */}
                                                        <i className="fas fa-user-circle text-primary " style={{ fontSize: '32px' }}></i>
                                                    </a>
                                                </div>
                                                <div className="chat-body">
                                                    <div className="chat-content">
                                                        <p>{chat.message}</p>
                                                        <time className="chat-time">{moment(chat.created_at).format(Define.FORMAT_DATE)}</time>
                                                    </div>
                                                </div>
                                            </div>
                                        })}
                                    </ScrollToBottom>
                                </div>

                                <div className="">
                                    <form>
                                        <div className="input-group">
                                            <input type="text" className="form-control" value={message}
                                                onChange={(e) => setMessage(e.target.value)} placeholder="Write Message..." disabled={ticket.ticket_state === Define.TICKET_PPROCESSING ? false : true}
                                                onKeyPress={(ee) => ee.key === 'Enter' ? addNew(ee) : null}
                                            />
                                            <span className="input-group-btn">
                                                <button onClick={addNew} className="btn btn-primary ml-2" type="button">Send</button>
                                            </span>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            {/* <!-- End Panel Chat --> */}
                        </div>

                        {ticket.ticket_state === Define.TICKET_SNOOZED &&
                            <div className="col-md-3 col-xs-12">
                                <Card className="mb-3" style={{ width: '100%' }}>
                                    <Card.Body>
                                        <Card.Text>
                                            <b>Snoozed Reason</b>: {ticket.reschedule_reason}<br />
                                            <b>Snoozed Date</b>: {moment(ticket.reschedule_date).format(Define.FORMAT_DATE)}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        }
                    </Row>
                </Main>
            </ProtectedPage>
        </>
    )
}

import React, { useState, useEffect, useRef } from 'react'
import Main from '../../layouts/dashborad/Main'
import ProtectedPage from '../../layouts/ProtectedPage'

import '../../../assets/css/chat.css'

import CUser from './../../../utils/helpers/CUser';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import URL from '../../../utils/helpers/URL';
import Define from './../../../utils/helpers/Define';
import { Card, Row } from 'react-bootstrap';
import moment from 'moment';
import useTicketSocket from './../../../utils/hooks/useTicketSocket';

export default function SingleTicket({ match }) {
    const bottomInit = useRef()
    const bottom = useRef()

    //local state
    const [ticket, setTicket] = useState({})
    const [message, setMessage] = useState("")
    const [chats, setChats, joinTicket, createMessage] = useTicketSocket()

    const history = useHistory()

    //init the socket
    //init the socket
    useEffect(() => {
        if (ticket)
            //join the socket 
            joinTicket(ticket)
    }, [ticket])

    useEffect(() => {
        bottom?.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    }, [chats.length])


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
                    //console.log(res, res);
                    bottomInit.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
                } else {
                    history.push(URL.TICKET_LIST)
                }
            }
            load()
        } catch (e) {
            console.log(e);
        }

    }, [])//chats.length

    //add new chat
    const addNew = async () => {

        if (!message && message === "") {
            return
        }
        const chatObj = {
            sender_id: CUser.getCurrentuser() && CUser.getCurrentuser().student_id,
            message: message,
            ticket_id: match.params.id,
            created_at: moment(new Date()).format()
        }

        //created_at: new Date()
        chatObj.id = new Date().getTime()
        createMessage(chatObj)

        //const listAction = new ListAction(chatsDispatch)
        //const res = await listAction.addData('support/create-message', chatObj)
        setMessage("")
        //bottom.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
        //console.log(res)
    }

    let classname = ticket.ticket_state !== Define.TICKET_SNOOZED ? "col-md-12" : "col-md-9"

    return (
        <>
            <ProtectedPage>
                <Main title={`Ticket No- ${match.params.id}`}>
                    <Row>

                        <div className={`${classname} col-xs-12`}>
                            {/* <!-- Panel Chat --> */}
                            <div className="panel" id="chat">
                                <div className="panel-heading">
                                    <h4 className="panel-title text-primary">
                                        Ticket Title: {ticket.ticket_title}
                                    </h4>
                                </div>
                                <div className="panel-body">
                                    <div className="chats height-overflow-y" >
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
                                        <div ref={bottomInit}></div>
                                        <div ref={bottom} style={{ marginTop: "30px" }}></div>
                                    </div>
                                </div>

                                <div className="panel-footer">
                                    <form>
                                        <div className="input-group">
                                            <input type="text" className="form-control" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write Message..." disabled={ticket.ticket_state === Define.TICKET_PPROCESSING ? false : true} />
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

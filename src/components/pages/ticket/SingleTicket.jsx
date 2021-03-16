import React, { useContext, useState, useEffect } from 'react'
import Main from '../../layouts/dashborad/Main'
import ProtectedPage from '../../layouts/ProtectedPage'

import '../../../assets/css/chat.css'

import ListAction from './../../../utils/context/actions/ListAction';
import { DispatchContext, StateContext } from './../../../utils/context/MainContext';
import CUser from './../../../utils/helpers/CUser';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import URL from '../../../utils/helpers/URL';
import Define from './../../../utils/helpers/Define';

export default function SingleTicket({ match }) {
    const { chats } = useContext(StateContext)
    const { chatsDispatch } = useContext(DispatchContext)

    //local state
    const [message, setMessage] = useState("")

    const history = useHistory()

    //load chat list
    useEffect(() => {




        const listAction = new ListAction(chatsDispatch)
        const token = listAction.getSource()
        const load = async () => {
            //load the ticket first
            const ticketRes = await axios.get(`support/get-one/ticket/id/${match.params.id}/`)
            const ticket = ticketRes.data
            //console.log(ticket)
            if (!ticket.error && ticket.response.ticket_state !== Define.TICKET_PENDING) {
                //if valid then load chats
                const res = await listAction.getAll(`support/get/ticket_chat/ticket_id/${match.params.id}/`)
                //console.log(res, chats);
            } else {
                history.push(URL.TICKET_LIST)
            }
        }
        load()

        //clean up
        return () => {
            token.cancel()
        }

    }, [chats.length])//chats.length

    //add new chat
    const addNew = async () => {

        if (!message && message === "") {
            return
        }

        const chatObj = {
            sender_id: CUser.getCurrentuser() && CUser.getCurrentuser().student_id,
            message: message,
            ticket_id: match.params.id
        }


        const listAction = new ListAction(chatsDispatch)
        const res = await listAction.addData('support/create-message', chatObj)
        //console.log(res)
    }

    return (
        <>
            <ProtectedPage>
                <Main title={`Ticket No- ${match.params.id}`}>

                    <div className="col-md-12 col-xs-12">
                        {/* <!-- Panel Chat --> */}
                        <div className="panel" id="chat">
                            <div className="panel-heading">
                                <h3 className="panel-title">
                                    Ticket Title
                                    </h3>
                            </div>
                            <div className="panel-body">
                                <div className="chats height-overflow-y" >
                                    {chats.length > 0 && [].concat(chats).reverse().map(chat => {
                                        //
                                        const classV = (chat.sender_id === (CUser.getCurrentuser() && CUser.getCurrentuser().student_id)) ? "chat" : "chat chat-left"

                                        return <div key={chat.id} className={classV}>
                                            <div className="chat-avatar">
                                                <a className="avatar avatar-online" data-toggle="tooltip" href="#" data-placement="left" title="" data-original-title="Edward Fletcher">
                                                    {/* <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" /> */}
                                                    <i className="fas fa-user-circle text-primary " style={{ fontSize: '32px' }}></i>
                                                </a>
                                            </div>
                                            <div className="chat-body">
                                                <div className="chat-content">
                                                    <p>{chat.message}</p>
                                                    <time className="chat-time" dateTime="2015-07-01T11:39">{chat.created_at}</time>
                                                </div>
                                            </div>
                                        </div>
                                    })}

                                </div>
                            </div>

                            <div className="panel-footer">
                                <form>
                                    <div className="input-group">
                                        <input type="text" className="form-control" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write Message..." />
                                        <span className="input-group-btn">
                                            <button onClick={addNew} className="btn btn-primary ml-2" type="button">Send</button>
                                        </span>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* <!-- End Panel Chat --> */}
                    </div>
                </Main>
            </ProtectedPage>
        </>
    )
}

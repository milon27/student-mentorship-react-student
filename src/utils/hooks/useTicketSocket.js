import io from 'socket.io-client'
import { useEffect, useState } from 'react'
import Define from '../helpers/Define'



let socket = null
export default function useTicketSocket() {

    const [list, setList] = useState([])

    useEffect(() => {
        //init the socket
        socket = io(Define.API_BASE_URL, { transport: ["websocket"] })
        //recieve message
        socket.on(Define.RECIEVE_MESSAGE, (message) => {
            setList(old_list => {
                return [message, ...old_list]
            })
        })
        //clean up the socket
        return () => {
            //socket.emit(Define.DISCONNECT)
            socket.off()
        }
    }, [])
    //create ticket
    const joinTicket = (ticket) => {
        if (socket) {
            socket.emit(Define.JOIN_TICKET, ticket)
        }
    }
    //create message
    const createMessage = (message) => {
        if (socket) {
            socket.emit(Define.CREATE_MESSAGE, message)
            setList([message, ...list])
        }
    }

    return [list, setList, joinTicket, createMessage]
}

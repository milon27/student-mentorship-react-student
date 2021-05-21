import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import URL from '../../../utils/helpers/URL'
import Define from './../../../utils/helpers/Define';
import moment from 'moment';


export default function TicketTable({ ticket_list }) {

    return (
        <div>
            {ticket_list.length > 0 ? <>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>ID#</th>
                            <th>Ticket Title</th>
                            <th>Ticket Status</th>
                            <th>Created At</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody >
                        {ticket_list.map(item => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.ticket_title}</td>
                                    <td>{item.ticket_state}</td>
                                    <td>{moment(item.created_at).format(Define.FORMAT_DATE)}</td>
                                    <td>{(item.ticket_state !== Define.TICKET_PPROCESSING && item.ticket_state !== Define.TICKET_SNOOZED) ? <>Waiting</> : <Link to={URL.TICKET_LIST + "/" + item.id} >View </Link>}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </> : <div><h3 className="text-center">No Ticket Found</h3></div>
            }

        </div >
    )
}

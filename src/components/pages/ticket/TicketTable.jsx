import React, { useContext, useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'


export default function TicketTable({ ticket_list }) {
    const onView = (e) => {

        if (e.target.tagName === "SPAN") {
            console.log(e.target.tagName);
            alert("--" + e.target.id)
        }
    }
    return (
        <div>
            {ticket_list.length > 0 ? <>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID#</th>
                            <th>Ticket Title</th>
                            <th>Ticket Status</th>
                            <th>Created At</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody onClick={onView}>
                        {ticket_list.map(item => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.ticket_title}</td>
                                    <td>{item.ticket_state}</td>
                                    <td>{item.created_at}</td>
                                    <td><span id={item.id} >View </span></td>
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

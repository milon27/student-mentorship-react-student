import React from 'react'
import { Table } from 'react-bootstrap'

export default function MyTable({ headArr, listArr, keyFiled = "id", ...args }) {
    return (
        <>
            {listArr.length > 0 ? <>
                <Table
                    striped bordered hover responsive
                    {...args}
                >
                    <thead>
                        <tr>
                            {headArr.map(item => {
                                return (
                                    <th key={item.key}>{item.value}</th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody >
                        {/* name="milon",age="12",adddress="addddd" */}
                        {listArr.map(item => {
                            return (
                                <tr key={item[keyFiled]}>
                                    {headArr.map((head) => {
                                        return (head.key === 'option') ?
                                            <td key={head.key}>{item[head.key]()}</td> :
                                            <td key={head.key}>{item[head.key]}</td>
                                    })}
                                    {/* {actions.map((op) => {
                                        return (
                                            <td key={op.key}>{op.link()}</td>
                                        )
                                    })} */}

                                    {/* <td>{item.id}</td>
                                    <td>{item.ticket_title}</td>
                                    <td>{item.ticket_state}</td>
                                    <td>{moment(item.created_at).format(Define.FORMAT_DATE)}</td>
                                    <td>{(item.ticket_state !== Define.TICKET_PPROCESSING && item.ticket_state !== Define.TICKET_SNOOZED) ? <>Waiting</> : <Link to={URL.TICKET_LIST + "/" + item.id} >View </Link>}</td> */}
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </> : <div><h3 className="text-center">No Data Found</h3></div>
            }

        </ >
    )
}

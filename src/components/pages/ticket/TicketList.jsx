import React from 'react'
import Main from '../../layouts/dashborad/Main';
import ProtectedPage from './../../layouts/ProtectedPage';

export default function TicketList() {
    return (
        <ProtectedPage>
            <Main>
                <h3>Ticket List</h3>
            </Main>
        </ProtectedPage>
    )
}

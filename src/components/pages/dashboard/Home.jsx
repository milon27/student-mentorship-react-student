import React from 'react'
import Main from '../../layouts/dashborad/Main';
import ProtectedPage from './../../layouts/ProtectedPage';
import TicketSummary from './TicketSummary';


export default function Home() {
    return (
        <ProtectedPage>
            <Main title="Dashboard">
                <TicketSummary />
            </Main>
        </ProtectedPage>
    )
}

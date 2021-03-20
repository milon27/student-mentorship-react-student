import React from 'react'
import ProtectedPage from './../../layouts/ProtectedPage';
import Main from './../../layouts/dashborad/Main';

export default function Contributor() {
    return (
        <ProtectedPage>
            <Main title="Contributor">
                <h1>coming soon</h1>
            </Main>
        </ProtectedPage>
    )
}

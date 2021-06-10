import React from 'react'
import Main from '../../layouts/dashborad/Main';
import ProtectedPage from '../../layouts/ProtectedPage';
import NoticeList from './NoticeList';


export default function Home() {
    return (
        <ProtectedPage>
            <Main title="Notice">
                <NoticeList/>
            </Main>
        </ProtectedPage>
    )
}

import React from 'react'
import Main from '../../layouts/dashborad/Main';
import TodoList from './TodoList';
import ProtectedPage from './../../layouts/ProtectedPage';


export default function Todo() {
    return (
        <ProtectedPage>
            <Main title="Todo List">
                <TodoList />
            </Main>
        </ProtectedPage>
    )
}

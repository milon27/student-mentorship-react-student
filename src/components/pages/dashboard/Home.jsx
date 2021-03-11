import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import AuthAction from '../../../utils/context/actions/AuthAction';
import URL from '../../../utils/helpers/URL';
import { DispatchContext } from './../../../utils/context/MainContext';
import CUser from './../../../utils/helpers/CUser';
import ProtectedPage from './../../layouts/ProtectedPage';


export default function Home() {
    const history = useHistory()
    const { authDispatch } = useContext(DispatchContext)

    const logout = async (e) => {
        await new AuthAction(authDispatch).Logout()
        history.push(URL.SIGN_IN)
    }

    return (
        <ProtectedPage>
            <h1>Home Page</h1>
            <p>{JSON.stringify(CUser.getCurrentuser())}</p>
            <button onClick={logout}>logout buttn</button>
        </ProtectedPage>
    )
}

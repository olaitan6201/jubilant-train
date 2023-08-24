import React, { useEffect } from 'react'
import { Outlet, useNavigate, Link } from 'react-router-dom'
import axiosClient from '../../clients/axios-client'
import { useStateContext } from '../../contexts/ContextProvider'

export default function AppLayout() {
    const {
        user,
        token,
        setUser,
        setToken
    } = useStateContext()

    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            return navigate('/login')
        }

        axiosClient
            .get('/user')
            .then(({ data }) => {
                setUser(data)
            })
    }, [token])

    const onLogOut = async (e) => {
        e.preventDefault()

        try {
            await axiosClient.post('/logout');

            setUser({})
            setToken(null)
        } catch (error) {
        }

    }

    return (
        <div id='defaultLayout'>
            <aside>
                <Link to={'/dashboard'}>Dashboard</Link>
                <Link to={'/users'}>Users</Link>
            </aside>
            <div className="content">
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {user?.name}
                        <a
                            href="#"
                            className='btn-logout'
                            onClick={onLogOut}
                        >Log Out</a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

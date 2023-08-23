import React, { useEffect } from 'react'
import { Outlet, useNavigate, Link } from 'react-router-dom'
import { useStateContext } from '../../contexts/ContextProvider'

export default function AppLayout() {
    const { user, token } = useStateContext()

    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            return navigate('/login')
        }
    }, [token])

    const onLogOut = (e) => {
        e.preventDefault()
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

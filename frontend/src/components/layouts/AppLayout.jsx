import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useStateContext } from '../../contexts/ContextProvider'

export default function AppLayout() {
    const { user, token } = useStateContext()

    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            return navigate('/login')
        }
    }, [token])

    return (
        <div>
            <Outlet />
        </div>
    )
}

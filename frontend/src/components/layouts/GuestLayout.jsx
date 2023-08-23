import { Outlet, useNavigate } from 'react-router-dom'
import { useStateContext } from '../../contexts/ContextProvider'
import { useEffect } from 'react'

export default function GuestLayout() {
    const { user, token } = useStateContext()

    const navigate = useNavigate()

    useEffect(() => {
        if (token) {
            return navigate('/')
        }
    }, [token])

    return (
        <div>
            <Outlet />
        </div>
    )
}

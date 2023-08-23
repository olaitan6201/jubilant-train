import { Navigate, createBrowserRouter } from 'react-router-dom'
import Login from './pages/auth/Login'
import SignUp from './pages/auth/Signup'
import Users from './pages/Users'
import NotFound from './pages/errors/NotFound'
import GuestLayout from './components/layouts/GuestLayout'
import AppLayout from './components/layouts/AppLayout'
import Dashboard from './pages/Dashboard'

const router = createBrowserRouter([
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <SignUp />
            },
        ]
    },
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to={'/dashboard'} />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/users',
                element: <Users />
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
])

export default router
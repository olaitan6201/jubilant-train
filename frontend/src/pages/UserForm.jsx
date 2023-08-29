import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axiosClient from '../clients/axios-client'
import Errors from '../components/layouts/shared/Errors'
import { useStateContext } from '../contexts/ContextProvider'

export default function UserForm() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { setNotification } = useStateContext()

    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)

    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    useEffect(() => {
        if (id) {
            setLoading(true)
            axiosClient.get(`/users/${id}`)
                .then(({ data }) => {
                    const { data: u } = data
                    setUser((prevState) => ({
                        ...prevState,
                        id: u.id,
                        name: u.name,
                        email: u.email,
                    }))
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [id])

    const handleInput = (e) => {
        const { id, value } = e.target
        setUser(prev => ({
            ...prev,
            [id]: value
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            let message = ''
            if (user.id) {
                const res = await axiosClient.put(`/users/${user.id}`, user);
                message = res.data?.message
            } else {
                const res = await axiosClient.post('/users', user);
                message = res.data?.message
            }
            if (message) setNotification(message)
            navigate('/users')
        } catch (error) {
            const response = error.response
            if (response && response.status === 422) {
                setErrors(response.data.errors)
            }
        }

    }

    return (
        <div>
            {user.id !== null && <h1>Update User: {user.name}</h1>}
            {user.id === null && <h1>New User</h1>}

            <div className="card animated fadeInDown">
                {loading ? (
                    <div className="text-center">Loading . . .</div>
                ) : (
                    <>
                        <Errors errors={errors} />
                        <form onSubmit={onSubmit}>
                            <input
                                id='name'
                                type='text'
                                value={user?.name}
                                onChange={handleInput}
                                placeholder='Full Name'
                            />
                            <input
                                id='email'
                                type='email'
                                value={user?.email}
                                onChange={handleInput}
                                placeholder='Email Address'
                            />
                            <input
                                id='password'
                                type='password'
                                onChange={handleInput}
                                placeholder='Password'
                            />
                            <input
                                id='password_confirmation'
                                type='password'
                                onChange={handleInput}
                                placeholder='Password Confirmation'
                            />
                            <button type='submit' className='btn btn-block'>
                                {user.id === null ? 'Add User' : 'Update User'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    )
}

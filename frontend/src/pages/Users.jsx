import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../clients/axios-client'

export default function Users() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        setLoading(true)
        try {
            const { data } = await axiosClient.get('/users')

            setLoading(false)
            setUsers(data.data)
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    const deleteUser = async (user) => {
        if (!window.confirm(`Are you sure you want to delete user: ${user.name}?}`)) {
            return;
        }

        axiosClient.delete(`/users/${user?.id}`)
            .then(() => {
                getUsers()
            })
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Users</h1>
                <Link to={'/users/new'} className='btn-add'>Add New</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Create Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading ? (
                        <tbody>
                            <tr>
                                <td colSpan={5} className='text-center'>
                                    Loading . . .
                                </td>
                            </tr>
                        </tbody>
                    ) : (
                        <tbody>
                            {
                                users.map(user => (
                                    <tr key={`user-${user?.id}`}>
                                        <th>{user?.id}</th>
                                        <td>{user?.name}</td>
                                        <td>{user?.email}</td>
                                        <td>{user?.created_at}</td>
                                        <td>
                                            <Link to={`/users/${user.id}`} className='btn-edit'>Edit</Link>
                                            &nbsp;
                                            <button type='button' onClick={() => deleteUser(user)} className='btn-delete'>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    )}
                </table>
            </div>
        </div >
    )
}

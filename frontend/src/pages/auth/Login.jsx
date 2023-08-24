import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStateContext } from '../../contexts/ContextProvider'
import axiosClent from '../../clients/axios-client'
import Errors from '../../components/layouts/shared/Errors'

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()

    const [errors, setErrors] = useState(null)

    const { setUser, setToken } = useStateContext()

    const onSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        try {
            const res = await axiosClent.post('/login', payload);
            setUser(res?.data?.data?.user)
            setToken(res?.data?.data?.token)
        } catch (error) {
            const response = error.response
            if (response && response.status === 422) {
                setErrors(response.data.errors)
            }
        }

    }

    return (
        <div className='login-signup-form animated fadeInDown'>
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className='title'>
                        Login into your account
                    </h1>
                    <Errors errors={errors} />
                    <input ref={emailRef} type='email' placeholder='Email Address' />
                    <input ref={passwordRef} type='password' placeholder='Password' />
                    <button type='submit' className='btn btn-block'>
                        Login
                    </button>
                    <p className='message'>
                        Not Registered? &nbsp;
                        <Link to={'/signup'}>
                            Create an account
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

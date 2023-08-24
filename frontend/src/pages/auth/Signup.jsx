import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClent from '../../clients/axios-client'
import { useStateContext } from '../../contexts/ContextProvider'
import Errors from '../../components/layouts/shared/Errors'

export default function Signup() {
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmationRef = useRef()

    const [errors, setErrors] = useState(null)

    const { setUser, setToken } = useStateContext()

    const onSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }

        try {
            const res = await axiosClent.post('/signup', payload);
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
                        Sign up for free
                    </h1>
                    <Errors errors={errors} />
                    <input ref={nameRef} type='text' placeholder='Full Name' />
                    <input ref={emailRef} type='email' placeholder='Email Address' />
                    <input ref={passwordRef} type='password' placeholder='Password' />
                    <input ref={passwordConfirmationRef} type='password' placeholder='Password Confirmation' />
                    <button type='submit' className='btn btn-block'>
                        Sign Up
                    </button>
                    <p className='message'>
                        Already Registered? &nbsp;
                        <Link to={'/login'}>
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

import { createContext, useContext, useState } from 'react'

const StateContext = createContext({
    user: null,
    token: null,
    notification: '',
    setUser: (data) => { },
    setToken: (token) => { },
    setNotification: (message = '') => { }
})

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [token, setToken] = useState(localStorage.getItem('ACCESS_TOKEN'))
    const [notification, setNotification] = useState('')

    const _setToken = (token) => {
        setToken(token)
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token)
        } else {
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }

    const _setNotification = (message) => {
        setNotification(message)
        setTimeout(() => {
            setNotification('')
        }, 3000)
    }

    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken: _setToken,
            notification,
            setNotification: _setNotification
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext) 
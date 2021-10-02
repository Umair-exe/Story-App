import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import { isLoggedIn } from '../services/AuthServices'

const Auth = ({children}) => {
    const history = useHistory();
    useEffect(() => {
        if(!isLoggedIn()) {
            return history.push('/');
        }
    },[history])
    return (
        <div>
            {children}
        </div>
    )
}

export default Auth

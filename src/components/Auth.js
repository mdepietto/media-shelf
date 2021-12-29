import React from 'react'
import LoginButton from '../auth/LoginButton'
import LogoutButton from '../auth/LogoutButton'
import Profile from '../auth/Profile'

const Auth = () => {
    return (
        <div className='auth'>
            <LoginButton />
            <LogoutButton />
            <Profile />
        </div>
    )
}

export default Auth
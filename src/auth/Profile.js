import React from 'react';
import { useAuth0 } from '@auth0/auth0-react'

const Profile = () => {
    const { user } = useAuth0()
    return (
        <div
            className='ScreenSaver'
            style={{ border: '2px solid rgb(89, 245, 247)' }}
        >
            <img
                src={ user.picture }
                alt={ user.name }
                style={{ marginBottom: '15px' }}
            />
            <p style={{ marginBottom: '3px' }}>Name: { user.name }</p>
            <p style={{ marginBottom: '3px' }}>Email: { user.email }</p>
        </div>
    )
}

export default Profile;
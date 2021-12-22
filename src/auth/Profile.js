import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react'

const Profile = () => {
    const [ pro, setPro ] = useState(false);
    const { user, isAuthenticated } = useAuth0();

    const info = () => {
        return (
            <div>
                <img src={ user.picture } alt={ user.name } />
                <h2>{ user.name }</h2>
                <p>{ user.email }</p>
            </div>
        )
    }

    return (
        isAuthenticated && (
            <div>
                <button onClick={ () => setPro(!pro) }>Show Profile</button>
                { pro && info() }
            </div>
        )
    );
}

export default Profile;
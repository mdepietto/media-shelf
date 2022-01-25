import React from 'react';
import { useAuth0 } from '@auth0/auth0-react'
import LogoutButton from './LogoutButton'

const Profile = (props) => {
    const { user } = useAuth0()
    return (
        <div
            className='profile'
            style={{ border: '2px solid rgb(89, 245, 247)' }}
        >
            <div>Name:<p>{ user.name }</p></div>
            <div>Email:<p>{ user.email }</p></div>
            <br />
            <h3>Library:</h3>
            <ul>
                <li>{ props.bookCount } books / { props.bookNoteCount } notes</li>
                <li>{ props.movieCount } movies / { props.movieNoteCount } notes</li>
                <li>{ props.showCount } shows / { props.showNoteCount } notes</li>
            </ul>
            <br />
            <LogoutButton />
        </div>
    )
}

export default Profile;
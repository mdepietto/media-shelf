import React from 'react';
import { useAuth0 } from '@auth0/auth0-react'

const Profile = (props) => {
    const { user } = useAuth0()
    return (
        <div
            className='ScreenSaver'
            style={{ border: '2px solid rgb(89, 245, 247)' }}
        >
            {/* <img
                src={ user.picture }
                alt={ user.name }
                style={{ marginBottom: '15px' }}
            /> */}
            <p style={{ marginBottom: '.5rem' }}>Name: { user.name }</p>
            <p style={{ marginBottom: '.5rem' }}>Email: { user.email }</p>
            <br />
            <p style={{ marginBottom: '.5rem' }}>You have:</p>
            <p style={{ marginBottom: '.5rem' }}>{ props.bookCount } books / { props.bookNoteCount } notes</p>
            <p style={{ marginBottom: '.5rem' }}>{ props.movieCount } movies / { props.movieNoteCount } notes</p>
            <p style={{ marginBottom: '.5rem' }}>{ props.showCount } shows / { props.showNoteCount } notes</p>
        </div>
    )
}

export default Profile;
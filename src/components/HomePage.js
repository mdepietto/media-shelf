import React, { useState } from 'react'

import NavMovies from './NavMovies'
import NavBooks from './NavBooks'

// import LoginButton from './LoginButton'
// import LogoutButton from './LogoutButton'
// import Profile from './Profile'

function HomePage() {

    const [ form, setForm ] = useState(false)

    return (
        <div id='homePage'>
            {/* <div id='auth'>
                <LoginButton />
                <LogoutButton />
                <Profile />
            </div> */}
            <NavMovies />
            <NavBooks />
        </div>
    )
    
}

export default HomePage
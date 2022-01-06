import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'semantic-ui-react'

const LogoutButton = () => {

    const { logout, isAuthenticated } = useAuth0()

    return (
        isAuthenticated && (
            <Button
                inverted
                color='red'
                size='big'
                className='navButton'
                style={{ margin: '0 0 0 .5rem' }}
                onClick={ () => logout({ returnTo: window.location.origin }) }
            >
                Log out
            </Button>
        )
    )
}

export default LogoutButton;
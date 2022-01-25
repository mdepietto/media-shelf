import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const HomeButton = () => {
    return (
        <Link to='/' className='homeButton'>
            <Button
                circular
                icon
                size='massive'
                color='purple'
            >
                <Icon name='home' />
            </Button>
        </Link>
    )
}

export default HomeButton
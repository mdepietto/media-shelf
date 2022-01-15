import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const HomeButton = () => {
    return (
        <Link to='/' className='homeButton'>
            <Button
                circular
                size='huge'
                color='purple'
                animated='fade'
            >
                <Button.Content visible>Home</Button.Content>
                <Button.Content hidden>
                    <Icon name='home' />
                </Button.Content>
            </Button>
        </Link>
    )
}

export default HomeButton
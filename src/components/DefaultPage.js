import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import LoginButton from '../auth/LoginButton'

const DefaultPage = () => {
    return (
        <div className='ScreenSaver'>
            <p><u>mediaShelf</u></p>
            <p>A note-taking app for:</p>
            <Button.Group>
                <Button inverted animated='fade' color='teal' size='massive' style={{ cursor: 'default' }}>
                    <Button.Content visible>Books</Button.Content>
                    <Button.Content hidden>{ <Icon name='book' /> }</Button.Content>
                </Button>
                <Button inverted animated='fade' color='teal' size='massive' style={{ cursor: 'default' }}>
                    <Button.Content visible>Movies</Button.Content>
                    <Button.Content hidden>{ <Icon name='film' /> }</Button.Content>
                </Button>
                <Button inverted animated='fade' color='teal' size='massive' style={{ cursor: 'default' }}>
                    <Button.Content visible>Shows</Button.Content>
                    <Button.Content hidden>{ <Icon name='tv' /> }</Button.Content>
                </Button>
            </Button.Group>
            <LoginButton />
        </div>
    )
}

export default DefaultPage
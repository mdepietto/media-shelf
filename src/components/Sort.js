import React, { useState } from 'react'
import { Form, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';

const Sort = (props) => {

    const { border, library, setLibrary, button, shelfForm, setShelfForm, shelf, setShelf, notes, link } = props

    const [ count, setCount ] = useState(0)

    const userName = useAuth0().user

    const getCount = async (api, count) => {
        const newData = await fetch('/apiMedia', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ api, userName })
        })
        .then(res => res.json())
        count(newData.length)
    }
    getCount(notes, setCount)

    const options = [
        { key: 0, text: 'Title', value: 0 },
        { key: 1, text: 'Rating', value: 1 }
    ]

    const newLib = (newData) => {
        setLibrary([])
        newData.map(media => setLibrary(prev => [ ...prev, media ]))
    }

    const onSort = async (e) => {
        const { innerText } = e.target
            if (!innerText) newLib(library.sort((a, b) => (a.id > b.id) ? 1 : -1))
            if (innerText === 'Title') newLib(library.sort((a, b) => (a.title > b.title) ? 1 : -1))
            if (innerText === 'Rating') newLib(library.sort((a, b) => (a.rating < b.rating) ? 1 : -1))
    }
    
    return (
        <div className='selectDrop' style={{ border: `2px solid rgb(${ border })` }}>
            <Link to={ link } className='subButton'>
                <Button inverted circular size='huge' color={ button } animated='fade'>
                    <Button.Content visible>Notes</Button.Content>
                    <Button.Content hidden>{ count }</Button.Content>
                </Button>
            </Link>
            <Form size='large'>
                <Form.Select
                    clearable
                    options={ options }
                    name='sort'
                    placeholder='Sort...'
                    onChange={ onSort }
                />
            </Form>
            <Button
                icon
                inverted
                circular
                style={{ margin: '0 0 0 15px' }}
                size='huge'
                color={ button }
                onClick={ () => {
                    setShelfForm(!shelfForm)
                    setShelf(!shelf)
                }}
            >
                <Icon name='plus' />
            </Button>
        </div>
    )
}

export default Sort
import React, { useState } from 'react'
import { Form, Input, Rating, Button } from 'semantic-ui-react'
import { useAuth0 } from '@auth0/auth0-react'

const ShelfForm = (props) => {

    const { user } = useAuth0()
    const userName = user.name

    const { name, path, border, shelf, setShelf, shelfForm, setShelfForm } = props

    const [ data, setData ] = useState({ chapters: null, pages: null, rating: null, minutes: null, seasons: null, name: userName })

    const handleChange = (e) => {
        const { name, value, ariaPosInSet } = e.target
        setData(prev => ({
            ...prev,
            [ name ]: value,
            rating: ariaPosInSet
        }))
    }

    const addMedia = async () => {
        await fetch(path, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ ...data })
        })
    }

    const EndButtons = () => {
        return (
            <div className='endButtons'>
                <Button
                    inverted
                    size='large'
                    color='teal'
                    onClick={ async () => {
                        await addMedia()
                        setShelf(!shelf)
                        setShelfForm(!shelfForm)
                        setData({ chapters: null, pages: null, rating: null, minutes: null, seasons: null, name: userName })
                    }}
                >
                    Submit
                </Button>
                <Button
                    inverted
                    size='large'
                    color='red'
                    onClick={ () => {
                        setShelf(!shelf)
                        setShelfForm(!shelfForm)
                        setData({ chapters: null, pages: null, rating: null, minutes: null, seasons: null, name: userName })
                    }}
                >
                    Cancel
                </Button>
            </div>
        )
    }

    if (name === 'books') {
        return (
            <Form className='forms' inverted style={{ position: 'fixed', border: border }}>
                <Form.Group width='equal' style={{ display: 'flex', flexDirection: 'column', marginBottom: '2rem' }}>
                    <Form.Field
                        required
                        control={ Input }
                        type='text'
                        label='Title'
                        name='title'
                        placeholder='Title'
                        onChange={ handleChange }
                    />
                    <br />
                    <Form.Field
                        required
                        control={ Input }
                        type='text'
                        label='Author'
                        name='author'
                        placeholder='Author'
                        onChange={ handleChange }
                    />
                    <br />
                    <Form.Field
                        control={ Input }
                        min={ 1 }
                        type='number'
                        label='Chapters'
                        name='chapters'
                        placeholder='#'
                        onChange={ handleChange }
                    />
                    <br />
                    <Form.Field
                        control={ Input }
                        min={ 1 }
                        type='number'
                        label='Pages'
                        name='pages'
                        placeholder='#'
                        onChange={ handleChange }
                    />
                </Form.Group>
                <Rating
                    icon='heart' 
                    size='massive' 
                    name='rating'
                    defaultRating={ 1 } 
                    maxRating={ 5 } 
                    clearable
                    onRate={ handleChange }
                />
                <br /><br />
                <EndButtons />
            </Form>
        )
    }

    if (name === 'movies') {
        return (
            <Form className='forms'  inverted style={{ position: 'fixed', border: border }}>
                <Form.Group width='equal' style={{ display: 'flex', flexDirection: 'column', marginBottom: '2rem' }}>
                    <Form.Field
                        required
                        control={ Input }
                        type='text'
                        label='Title'
                        name='title'
                        placeholder='Title'
                        onChange={ handleChange }
                    />
                    <br />
                    <Form.Field
                        required
                        control={ Input }
                        type='text'
                        label='Director'
                        name='director'
                        placeholder='Director'
                        onChange={ handleChange }
                    />
                    <br />
                    <Form.Field
                        control={ Input }
                        type='number'
                        min={ 1 }
                        label='Minutes'
                        name='minutes'
                        placeholder='#'
                        onChange={ handleChange }
                    />
                </Form.Group>
                <Rating 
                    icon='heart'
                    size='massive'
                    name='rating'
                    defaultRating={ 1 }
                    maxRating={ 5 }
                    clearable
                    onRate={ handleChange }
                />
                <br /><br />
                <EndButtons />
            </Form>
        )
    }

    if (name === 'shows') {
        return (
            <Form className='forms'  inverted style={{ position: 'fixed', border: border }}>
                <Form.Group width='equal' style={{ display: 'flex', flexDirection: 'column', marginBottom: '2rem' }}>
                    <Form.Field
                        required
                        control={ Input }
                        type='text'
                        label='Title'
                        name='title'
                        placeholder='Title'
                        onChange={ handleChange }
                    />
                    <br />
                    <Form.Field
                        control={ Input }
                        type='number'
                        min={ 1 }
                        label='Seasons'
                        name='seasons'
                        placeholder='#'
                        onChange={ handleChange }
                    />
                </Form.Group>
                <Rating 
                    icon='heart'
                    size='massive'
                    name='rating'
                    defaultRating={ 1 }
                    maxRating={ 5 }
                    clearable
                    onRate={ handleChange }
                />
                <br /><br />
                <EndButtons />
            </Form>
        )
    }
}

export default ShelfForm
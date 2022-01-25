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
            <div className='subAndCancel'>
                <Button
                    inverted
                    size='big'
                    color='grey'
                    style={{ marginRight: '15px' }}
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
                    size='big'
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
            <Form className='forms' size='huge' inverted style={{ position: 'fixed', border: border }}>
                <Form.Group style={{ display: 'flex', flexDirection: 'column' }} width='equal'>
                    <Form.Field
                        required
                        control={ Input }
                        type='text'
                        name='title'
                        placeholder='Title'
                        onChange={ handleChange }
                    />
                    <br />
                    <Form.Field
                        control={ Input }
                        type='text'
                        name='author'
                        placeholder='Author'
                        onChange={ handleChange }
                    />
                    <br />
                    <Form.Field
                        control={ Input }
                        min={ 1 }
                        type='number'
                        name='chapters'
                        placeholder='Chapters'
                        onChange={ handleChange }
                    />
                    <br />
                    <Form.Field
                        control={ Input }
                        min={ 1 }
                        type='number'
                        name='pages'
                        placeholder='Pages'
                        onChange={ handleChange }
                    />
                </Form.Group>
                <div className='rating' style={{ marginTop: '20px' }}>
                    <p>Rating</p>
                    <Rating
                        icon='heart' 
                        size='massive' 
                        name='rating'
                        defaultRating={ 1 } 
                        maxRating={ 5 } 
                        clearable
                        onRate={ handleChange }
                    />
                </div>
                <br />
                <EndButtons />
            </Form>
        )
    }

    if (name === 'movies') {
        return (
            <Form className='forms' inverted size='huge' style={{ position: 'fixed', border: border, fontFamily: 'Montagu Slab' }}>
                <Form.Group style={{ display: 'flex', flexDirection: 'column' }} width='equal'>
                    <Form.Field
                        required
                        control={ Input }
                        type='text'
                        name='title'
                        placeholder='Title'
                        onChange={ handleChange }
                    />
                    <br />
                    <Form.Field
                        control={ Input }
                        type='text'
                        name='director'
                        placeholder='Director'
                        onChange={ handleChange }
                    />
                    <br />
                    <Form.Field
                        control={ Input }
                        type='number'
                        min={ 1 }
                        name='minutes'
                        placeholder='Minutes'
                        onChange={ handleChange }
                    />
                </Form.Group>
                <div className='rating' style={{ marginTop: '20px' }}>
                    <p>Rating</p>
                    <Rating
                        icon='heart' 
                        size='massive' 
                        name='rating'
                        defaultRating={ 1 } 
                        maxRating={ 5 } 
                        clearable
                        onRate={ handleChange }
                    />
                </div>
                <br />
                <EndButtons />
            </Form>
        )
    }

    if (name === 'shows') {
        return (
            <Form className='forms' inverted size='huge' style={{ position: 'fixed', border: border }}>
                <Form.Group style={{ display: 'flex', flexDirection: 'column' }} width='equal'>
                    <Form.Field
                        required
                        control={ Input }
                        type='text'
                        name='title'
                        placeholder='Title'
                        onChange={ handleChange }
                    />
                    <br />
                    <Form.Field
                        control={ Input }
                        type='number'
                        min={ 1 }
                        name='seasons'
                        placeholder='Seasons'
                        onChange={ handleChange }
                    />
                </Form.Group>
                <div className='rating' style={{ marginTop: '20px' }}>
                    <p>Rating</p>
                    <Rating
                        icon='heart' 
                        size='massive' 
                        name='rating'
                        defaultRating={ 1 } 
                        maxRating={ 5 } 
                        clearable
                        onRate={ handleChange }
                    />
                </div>
                <br />
                <EndButtons />
            </Form>
        )
    }
}

export default ShelfForm
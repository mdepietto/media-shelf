import React, { useState } from 'react'
import { Form, Input, Rating, Button } from 'semantic-ui-react'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'

const ShelfForm = (props) => {

    const { user } = useAuth0()
    const userName = user.name

    const { name, path, border } = props

    const [ data, setData ] = useState({ chapters: null, pages: null, rating: null, minutes: null, seasons: null, name: userName })

    const handleChange = (e) => {
        const { name, value, ariaPosInSet } = e.target
        setData(prev => ({
            ...prev,
            [ name ]: value,
            rating: ariaPosInSet
        }))
    }

    var pos = {
        border: border,
        position: 'fixed'
    }

    if (window.screen.width <= 1300) {
        pos = {
            border: border,
            position: 'static'
        }
    }

    // const sqlApostrophe = () => {
    //     var newName = data.name.replace(/'/g, "''")
    //     var newTitle = data.title.replace(/'/g, "''")
    //     data.name = newName
    //     data.title = newTitle

    //     if (name === 'books') {
    //         var newAuthor = data.author.replace(/'/g, "''")
    //         data.author = newAuthor
    //     }
    //     if (name === 'movies') {
    //         var newDirector = data.director.replace(/'/g, "''")
    //         data.director = newDirector
    //     }
    // }

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
                <Link to='/'>
                    <Button
                        inverted
                        size='large'
                        color='violet'
                        style={{ marginBottom: '15px' }}
                        onClick={ async () => {
                            // sqlApostrophe()
                            await addMedia()
                            setData({ chapters: null, pages: null, rating: null, minutes: null, seasons: null, name: userName })
                            alert('Content added!')
                        }}
                    >
                        Submit
                    </Button>
                </Link>

                <Link to='/'>
                    <Button
                        inverted
                        size='large'
                        color='red'
                        onClick={ () => {
                            setData({ chapters: null, pages: null, rating: null, minutes: null, seasons: null, name: userName })
                            alert('Content discarded')
                        }}
                    >
                        Cancel
                    </Button>
                </Link>
            </div>
        )
    }

    if (name === 'books') {
        return (
            <Form className='forms'
                inverted
                style={ pos }>
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
            <Form className='forms'
                inverted
                style={ pos }>
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
            <Form className='forms'
                inverted
                style={ pos }>
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
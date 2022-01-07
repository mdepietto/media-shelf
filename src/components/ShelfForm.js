import React, { useState } from 'react'
import { Form, Input, Rating, Button } from 'semantic-ui-react'

function ShelfForm(props) {

    const userName = props.userName.name

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
        border: props.border,
        position: 'fixed'
    }

    if (window.screen.width <= 1300) {
        pos = {
            border: props.border,
            position: 'static'
        }
    }

    const sqlApostrophe = () => {
        var newName = data.name.replace(/'/g, "''")
        var newTitle = data.title.replace(/'/g, "''")

        if (props.name === 'book') {
            var newAuthor = data.author.replace(/'/g, "''")
            data.name = newName
            data.title = newTitle
            data.author = newAuthor
        }
        if (props.name === 'movie') {
            var newDirector = data.director.replace(/'/g, "''")
            data.name = newName
            data.title = newTitle
            data.director = newDirector
        }
        if (props.name === 'show') {
            data.name = newName
            data.title = newTitle
        }
    }

    var addMedia = async () => {
        await fetch(props.path, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ ...data })
        })
        .then(res => res.json())
    }

    const EndButtons = (props) => {
        return (
            <div className='endButtons'>
                <Button
                    inverted
                    size='large'
                    color='violet'
                    style={{ marginBottom: '15px' }}
                    onClick={ async () => {
                        sqlApostrophe()
                        console.log(data);
                        await addMedia()
                        setData({ chapters: null, pages: null, rating: null, minutes: null, seasons: null, name: userName })
                        props.setForm(false)
                        props.setLib([])
                        alert('Content added!')
                    }}
                >Submit</Button>
                <Button
                    inverted
                    size='large'
                    color='red'
                    onClick={ () => {
                        props.setForm(false)
                        alert('Content discarded')
                    }}
                >Cancel</Button>
            </div>
        )
    }

    if (props.name === 'book') {
        return (
            <Form className='mediaForm'
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
                <EndButtons setForm={ props.setForm } setLib={ props.setLib } />
            </Form>
        )
    }

    if (props.name === 'movie') {
        return (
            <Form className='mediaForm'
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
                <EndButtons setForm={ props.setForm } setLib={ props.setLib } />
            </Form>
        )
    }

    if (props.name === 'show') {
        return (
            <Form className='mediaForm'
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
                <EndButtons setForm={ props.setForm } setLib={ props.setLib } />
            </Form>
        )
    }
}

export default ShelfForm
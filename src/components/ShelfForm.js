import React, { useState } from 'react'
import { Form, Input, Rating, Button } from 'semantic-ui-react'

function ShelfForm(props) {

    const [ data, setData ] = useState({ title: '', author: '' })

    const handleChange = (e) => {
        const { name, value } = e.target
        setData(prev => ({
            ...prev,
            [ name ]: value
        }))
    }

    const getRating = (e) => {
        const { ariaPosInSet } = e.target
        setData(prev => ({
            ...prev,
            rating: ariaPosInSet
        }))
    }

    const sqlApostrophe = () => {
        var newTitle = data.title.replace(/'/g, "''")
        var newDirector = data.author.replace(/'/g, "''")
        data.title = newTitle
        data.author = newDirector
    }

    var addMedia = async () => {
        await fetch(props.path, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                ...data
            })
        })
        .then(res => res.json())
    }

    const EndButtons = (props) => {
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Button
                    inverted
                    size='large'
                    color='violet'
                    style={{ marginBottom: '15px' }}
                    onClick={ async () => {
                        sqlApostrophe()
                        await addMedia()
                        setData({ title: '', author: '' })
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
            <Form className='mediaForm' inverted style={{ border: '2px solid rgb(202, 237, 114)' }}>
                <Form.Group width='equal' style={{ display: 'flex', flexDirection: 'column', marginBottom: '2rem' }}>
                    <Form.Field
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
                    onRate={ getRating }
                />
                <br /><br />
                <EndButtons setForm={ props.setForm } setLib={ props.setLib } />
            </Form>
        )
    }

    if (props.name === 'movie') {
        return (
            <Form className='mediaForm' inverted style={{ border: '2px solid rgb(235, 229, 52)' }}>
                <Form.Group width='equal' style={{ display: 'flex', flexDirection: 'column', marginBottom: '2rem' }}>
                    <Form.Field
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
                    onRate={ getRating }
                />
                <br /><br />
                <EndButtons setForm={ props.setForm } setLib={ props.setLib } />
            </Form>
        )
    }

    if (props.name === 'show') {
        return (
            <Form className='mediaForm' inverted style={{ border: '2px solid rgb(242, 129, 7)' }}>
                <Form.Group width='equal' style={{ display: 'flex', flexDirection: 'column', marginBottom: '2rem' }}>
                    <Form.Field
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
                    onRate={ getRating }
                />
                <br /><br />
                <EndButtons setForm={ props.setForm } setLib={ props.setLib } />
            </Form>
        )
    }
}

export default ShelfForm
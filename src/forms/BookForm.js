import React, { useState } from 'react'
import { Form, Input, Rating, Button } from 'semantic-ui-react'

function BookForm() {
    
    const [ data, setData ] = useState({ title: '', author: '', pages: 0, rating: 0 })
    
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

    var addBook = async () => {
        await fetch('/addBook', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                ...data
            })
        })
        .then(res => res.json())
    }

    return (
        <div>
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
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Button
                        inverted
                        size='large'
                        color='violet'
                        style={{ marginBottom: '15px' }}
                        onClick={ async () => {
                            sqlApostrophe()
                            await addBook()
                            setData({ title: '', author: '', pages: 0, rating: 0 })
                            window.location.reload()
                        }}
                    >Submit</Button>
                    <Button
                        inverted
                        size='large'
                        color='red'
                        onClick={ () => window.location.reload() }
                    >Cancel</Button>
                </div>
            </Form>
        </div>
    )
}

export default BookForm
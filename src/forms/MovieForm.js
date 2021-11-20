import React, { useState } from 'react'
import { Form, Input, Rating, Button } from 'semantic-ui-react'

function MovieForm(props) {

    const [ data, setData ] = useState({ title: '', director: '', minutes: 0, rating: 0 })

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
        var newDirector = data.director.replace(/'/g, "''")
        data.title = newTitle
        data.director = newDirector
    }

    var addMov = async () => {
        await fetch('/addMov', {
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
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Button
                        inverted
                        size='large'
                        color='violet'
                        style={{ marginBottom: '15px' }}
                        onClick={ async () => {
                            sqlApostrophe()
                            await addMov()
                            setData({ title: '', director: '', minutes: 0, rating: 0 })
                            props.setMovieForm(false)
                            props.setMovieLib([])
                            alert('Movie added!')
                        }}
                    >Submit</Button>
                    <Button
                        inverted
                        size='large'
                        color='red'
                        onClick={ () => {
                            props.setMovieForm(false)
                            alert('Movie discarded')
                        }}
                    >Cancel</Button>
                </div>
            </Form>
        </div>
    )
}

export default MovieForm
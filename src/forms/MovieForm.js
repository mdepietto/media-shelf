import React, { useState } from 'react'
import { Form, Input, Rating } from 'semantic-ui-react'

function MovieForm() {

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

    const testForm = (name, label, placeholder, type) => {
        if (type === 'number') {
            return (
                <Form.Field
                    control={ Input }
                    type={ type }
                    min={ 1 }
                    label={ label }
                    name={ name }
                    placeholder={ placeholder }
                    onChange={ handleChange }
                />
            )
        }
        return (
            <Form.Field
                control={ Input }
                type={ type }
                label={ label }
                name={ name }
                placeholder={ placeholder }
                onChange={ handleChange }
            />
        )
    }

        return (
            <div>
                <Form className='movieForm' inverted>
                    <Form.Group width='equal' style={{ display: 'flex', flexDirection: 'column' }}>
                        { testForm('title', 'Title', 'Title', 'text') }
                        { testForm('director', 'Director', 'Director', 'text') }
                        { testForm('minutes', 'Minutes', '#', 'number') }
                    </Form.Group>
                    <Rating 
                        icon='heart' 
                        size='huge' 
                        name='rating'
                        defaultRating={ 1 } 
                        maxRating={ 5 } 
                        clearable
                        onRate={ getRating }
                    />
                    <br /><br />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <button
                            className="ui inverted violet button"
                            style={{ marginBottom: '15px' }}
                            onClick={ async () => {
                                sqlApostrophe()
                                await addMov()
                                setData({ title: '', director: '', minutes: 0, rating: 0 })
                                window.location.reload()
                            }}
                        >Submit</button>
                        <button
                            className='ui inverted red button'
                            onClick={ () => window.location.reload() }
                        >Cancel</button>
                    </div>
                </Form>
            </div>
        )
}

export default MovieForm
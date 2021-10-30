import React, { useState } from 'react'
import { Rating } from 'semantic-ui-react'
import { Form, Input } from 'semantic-ui-react'

function MovieForm() {

    const [ form, setForm ] = useState(false)
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

    function mForm() {
        return (
            <Form>
                <Form.Group width='equal'>
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
                <button
                    className="ui inverted violet button"
                    onClick={ () => {
                        addMov()
                        setData({ title: '', director: '', minutes: 0, rating: 0 })
                        setForm(false)
                    }}
                    >Submit</button>
                <button
                    className="ui inverted red button" 
                    onClick={ () => {
                        setForm(false)
                        setData({ title: '', director: '', minutes: 0, rating: 0 })
                    }}
                    >Cancel
                </button>
            </Form>
        )
    }

    return (
        <div>
            <button
                className="ui olive button"
                onClick={ () => setForm(!form) }
                >Add Movie
            </button>
            { form && mForm() }
        </div>
    )
}

export default MovieForm
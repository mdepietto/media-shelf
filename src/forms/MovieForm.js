import React, { useState } from 'react'
import { Rating } from 'semantic-ui-react'
import { Form, Input } from 'semantic-ui-react'

function MovieForm() {

    const [ form, setForm ] = useState(false)
    const [ count, setCount ] = useState(0)
    const [ data, setData ] = useState({ title: '', director: '', minutes: 0, rating: 0 })

    var api = async () => {
        const newData = await fetch('/api', { method: 'GET' }).then(res => res.json())
        await setCount(newData.length)
    }
    api()

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
        const newMovie = await fetch('/addMov', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                ...data
            })
        })
        .then(res => res.json())
        setData(newMovie[0])
    }

    function mForm() {
        return (
            <Form>
                <Form.Group width='equal'>
                    <Form.Field
                        control={ Input }
                        type='text'
                        label='Title'
                        name='title'
                        placeholder='Title'
                        onChange={ handleChange }
                    />
                    <Form.Field
                        control={ Input }
                        type='text'
                        label='Director'
                        name='director'
                        placeholder='Director'
                        onChange={ handleChange }
                    />
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
                    size='huge' 
                    name='rating'
                    defaultRating={ 1 } 
                    maxRating={ 5 } 
                    clearable
                    onRate={ getRating }
                />
                <br /><br />
                <button className="ui inverted violet button" onClick={ addMov }>Submit</button>
                <button onClick={() => setForm(false)} className="ui inverted red button">Cancel</button>
            </Form>
        )
    }

    return (
        <div>
            <button className="ui olive fade animated button" onClick={() => setForm(!form)}>
                <div className="visible content">Add Movie</div>
                <div className="hidden content">{ count }</div>
            </button>
                { form && mForm() }
        </div>
    )
}

export default MovieForm
import React, { useState } from 'react'
import { Form, Input, TextArea } from 'semantic-ui-react'

function MovieNote() {

    const [ note, setNote ] = useState(false)
    const [ count, setCount ] = useState(0)
    const [ movies, setMovies ] = useState([])
    const [ data, setData ] = useState({ movie: '', minute: 0, type: '', note: '' })
    
    var mNotes = async () => {
        const newData = await fetch('/apiNotes', { method: 'GET' }).then(res => res.json())
        await setCount(newData.length)
    }
    mNotes()

    const api = async () => await fetch('/api', { method: 'GET' }).then(res => res.json())

    const getMovies = async () => {
        var newData = await api()
        newData.map(m => {
            return setMovies(prev => [ ...prev, { key: m.id, text: m.title, value: m.id } ])
        })
    }

    const optionsNote = [
        { key: 1, text: 'Note', value: 1 },
        { key: 2, text: 'Quote', value: 2 },
        { key: 3, text: 'Summary', value: 3 }
    ]

    const handleChange = (e) => {
        const { name, value } = e.target
        setData(prev => ({
            ...prev,
            [ name ]: value
        }))
    }

    const getType = (e) => {
        const { innerText } = e.target
        setData(prev => ({
            ...prev,
            type: innerText
        }))
    }

    const getMovie = (e) => {
        const { innerText } = e.target
        setData(prev => ({
            ...prev,
            movie: innerText
        }))
    }

    var addMovNote = async () => {
        const newMovieNote = await fetch('/addMovNote', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                ...data
            })
        })
        .then(res => res.json())
        setData(newMovieNote[0])
    }

    function mNote() {
        return (
            <Form>
                <Form.Group width='equal'>
                    <Form.Select
                        label='Movie'
                        options={ movies }
                        name='movie'
                        placeholder='Movie'
                        onChange={ getMovie }
                    />
                    <Form.Field
                        control={ Input }
                        type='number'
                        min={ 1 }
                        label='Minute'
                        name='minute'
                        placeholder='#'
                        onChange={ handleChange }
                    />
                    <Form.Select
                        label='Type of Note'
                        options={ optionsNote }
                        name='type'
                        placeholder='Note'
                        onChange={ getType }
                    />
                </Form.Group>
                <Form.Field
                    control={ TextArea }
                    label='Your Note'
                    name='note'
                    width={ 6 }
                    onChange={ handleChange }
                />
                <button onClick={ addMovNote } className="ui inverted violet button">Submit</button>
                <button onClick={ () => setNote(false) } className="ui inverted red button">Cancel</button>
            </Form>
        )
    }

    return (
        <div>
            <button 
                className="ui olive fade animated button"
                onClick={ () => {
                        setNote(!note)
                        getMovies()
                    }
                }
            >
                <div className="visible content">Movie Note</div>
                <div className="hidden content">{ count }</div>
            </button>
            { note && mNote() }
        </div>
    )
}

export default MovieNote
import React, { useState } from 'react'
import { Form, Input, TextArea } from 'semantic-ui-react'
import { api } from '../serverCalls/movieCalls'

function MovieNote() {

    const [ note, setNote ] = useState(false)
    const [ movies, setMovies ] = useState([])
    const [ data, setData ] = useState({ title: '', note_minute: 0, note_type: '', note_body: '' })

    const getMovies = async () => {
        if (!movies[0]) {
            var newData = await api()
            newData.map(m => {
                return setMovies(prev => [ ...prev, { key: m.id, text: m.title, value: m.id } ])
            })
        }
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
            note_type: innerText
        }))
    }

    const getMovie = (e) => {
        const { innerText } = e.target
        setData(prev => ({
            ...prev,
            title: innerText
        }))
    }

    const sqlApostrophe = () => {
        var newBody = data.note_body.replace(/'/g, "''")
        data.note_body = newBody
    }

    var addMovNote = async () => {
        await fetch('/addMovNote', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ ...data })
        })
        .then(res => res.json())
    }

    function mNote() {
        return (
            <Form>
                <Form.Group width='equal'>
                    <Form.Select
                        label='Movie'
                        options={ movies }
                        name='title'
                        placeholder='Movie'
                        onChange={ getMovie }
                    />
                    <Form.Field
                        control={ Input }
                        type='number'
                        min={ 1 }
                        label='Minute'
                        name='note_minute'
                        placeholder='#'
                        onChange={ handleChange }
                    />
                    <Form.Select
                        label='Type of Note'
                        options={ optionsNote }
                        name='note_type'
                        placeholder='Note'
                        onChange={ getType }
                    />
                </Form.Group>
                <Form.Field
                    control={ TextArea }
                    label='Your Note'
                    name='note_body'
                    width={ 6 }
                    onChange={ handleChange }
                />
                <button 
                    className="ui inverted violet button"
                    onClick={ () => {
                        sqlApostrophe()
                        addMovNote()
                        setData({ title: '', note_minute: 0, note_type: '', note_body: '' })
                    }}>Submit</button>
                <button
                    className="ui inverted red button" 
                    onClick={ () => {
                        setNote(false)
                        setData({ title: '', note_minute: 0, note_type: '', note_body: '' })
                    }}>Cancel</button>
            </Form>
        )
    }

    return (
        <div>
            <button 
                className="ui olive button"
                onClick={ () => {
                    setNote(!note)
                    getMovies()
                }}
            >Add Note</button>
            { note && mNote() }
        </div>
    )
}

export default MovieNote
import React, { useState } from 'react'
import { api, apiNotes } from '../serverCalls/movieCalls'
import { Form } from 'semantic-ui-react'

const MovieNoteShelf = () => {
    const [ count, setCount ] = useState(0)
    const [ notes, setNotes ] = useState([])
    const [ movies, setMovies ] = useState([])
    const [ selected, setSelected ] = useState({ title: '' })
    const [ shelf, setShelf ] = useState(false)
    var toBeDeleted = ''
    
    var getShelf = async () => {
        const newData = await apiNotes()
        setCount(newData.length)
    }
    getShelf()
    
    const getMovieNotesByAll = async () => {
        const newData = await apiNotes()
        newData.map(m => {
            return setNotes(prev => [ ...prev, m ])
        })
    }

    const getMovies = async () => {
        if (!movies[0]) {
            var newData = await api()
            newData.map(m => {
                return setMovies(prev => [ ...prev, { key: m.id, text: m.title, value: m.id } ])
            })
        }
    }

    const getMovieNotesByTitle = async () => {
        const newData = await fetch('/apiNotesByTitle', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ ...selected })
        })
        .then(res => res.json())
        setNotes(newData)
    }
    
    const selectedMovie = async (e) => {
        const { innerText } = await e.target
        setSelected({ title: innerText })
    }

    const deleteMovieNote = async () => {
        await fetch('/deleteMovieNote', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ toBeDeleted })
        })
        .then(res => res.json())
    }

    const confirmation = (func) => {
        if (window.confirm('Are you sure?')) {
            return func()
        }
    }

    const selectMovie = () => {
        return (
            <Form>
                <Form.Group width='equal'>
                    <Form.Select
                        label='Movie'
                        options={ movies }
                        name='movie'
                        placeholder='Movie'
                        onChange={ selectedMovie }
                    />
                </Form.Group>
                <button className='ui green button' onClick={ getMovieNotesByTitle }>Search</button>
            </Form>
        )
    }

    const mNoteShelf = () => {
        return (
            notes.map(note => {
                return (
                    <div className='shelf' key={ note.id }>
                        <p>Created on: { note.note_date }</p>
                        <p>{ note.note_type } for '{ note.title }' at { note.note_minute } minutes</p>
                        <p>'{ note.note_body }'</p>
                        <button
                            className='ui red button tiny'
                            onClick={ () => {
                                toBeDeleted = note.id
                                confirmation(deleteMovieNote)
                        }}>Delete</button>
                    </div>
                )
            })
        )
    }

    return (
        <div>
            <button
                className="ui olive fade animated button"
                onClick={ () => {
                    getMovies()
                    setNotes([])
                    getMovieNotesByAll()
                    setShelf(!shelf)
                }}>
                <div className='visible content'>Open Notes</div>
                <div className='hidden content'>{ count }</div>
            </button>
            { shelf && selectMovie() }
            { shelf && mNoteShelf() }
        </div>
    )
}

export default MovieNoteShelf
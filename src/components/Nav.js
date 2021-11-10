import React, { useState } from 'react'
import { Button, Icon, Form } from 'semantic-ui-react'
import MovieForm from '../forms/MovieForm'
import MovieShelf from '../shelves/MovieShelf'
import MovieNoteShelf from '../shelves/MovieNoteShelf'
import MovieNote from '../notes/MovieNote'
import { api, apiNotes } from '../serverCalls/movieCalls'

const Nav = () => {

    const [ shelf, setShelf ] = useState(false)
    const [ count, setCount ] = useState(0)
    const [ lib, setLib ] = useState([])

    const [ form, setForm ] = useState(false)

    const [ noteShelf, setNoteShelf ] = useState(false)
    const [ noteCount, setNoteCount ] = useState(0)
    const [ notes, setNotes ] = useState([])
    const [ movies, setMovies ] = useState([])
    const [ notesFor, setNotesFor ] = useState('')

    const [ noteForm, setNoteForm ] = useState(false)

    var getShelf = async () => {
        const newData = await api()
        const newDataNotes = await apiNotes()
        if (!lib[0]) {
            newData.map(m => {
                return setLib(prev => [ ...prev, m ])
            })
        }
        setCount(newData.length)
        setNoteCount(newDataNotes.length)
    }
    getShelf()

    const getMovies = async () => {
        if (!movies[0]) {
            var newData = await api()
            newData.map(m => {
                return setMovies(prev => [ ...prev, { key: m.id, text: m.title, value: m.id } ])
            })
        }
    }
    getMovies()

    const getMovieNotesByAll = async () => {
        const newData = await apiNotes()
        // if (!notes[0]) {
            newData.map(m => {
                return setNotes(prev => [ ...prev, m ])
            })
        // }
    }

    const getMovieNotesByTitle = async (e) => {
        const { innerText } = await e.target
        const newData = await fetch('/apiNotesByTitle', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ innerText })
        })
        .then(res => res.json())
        setNotes(newData)
        setNotesFor(innerText)
    }

    const SelectMovie = () => {
        return (
            <div className='selectMovie'>
                <Form style={{ display: 'flex', flexDirection: 'row' }}>
                    <Form.Group width='equal'>
                        <Form.Select
                            options={ movies }
                            name='movie'
                            placeholder='Movie'
                            onChange={ getMovieNotesByTitle }
                        />
                    </Form.Group>
                    <Button
                        color='blue' 
                        style={{ height: '38px', marginLeft: '5px' }}
                        onClick={ getMovieNotesByAll }
                        >All</Button>
                </Form>
                <h3 style={{ margin: '0' }}>Showing notes for:</h3><br />
                <h3 style={{ margin: '0' }}>{ notesFor }</h3>
            </div>
        )
    }

    return (
        <div>
            <div className='nav'>
                <button
                    className="ui olive fade animated button"
                    onClick={ () => {
                        setShelf(!shelf)
                        setForm(false)
                        setNoteShelf(false)
                        setNoteForm(false)
                    }}>
                    <div className='visible content'>Open Movies</div>
                    <div className='hidden content'>{ count }</div>
                </button>
                <Button
                    icon
                    color='olive'
                    onClick={ () => {
                        setForm(!form)
                        setShelf(false)
                        setNoteShelf(false)
                        setNoteForm(false)
                    }}>
                    <Icon name='plus' />
                </Button>
                <button
                    className="ui olive fade animated button"
                    onClick={ () => {
                        // getMovieNotesByAll()
                        setNoteShelf(!noteShelf)
                        setNoteForm(false)
                        setForm(false)
                        setShelf(false)
                    }}>
                    <div className='visible content'>Open Notes</div>
                    <div className='hidden content'>{ noteCount }</div>
                </button>
                <Button 
                    icon
                    color='olive'
                    onClick={ () => {
                        getMovies()
                        setNoteForm(!noteForm)
                        setForm(false)
                        setShelf(false)
                        setNoteShelf(false)
                    }}>
                    <Icon name='plus' />
                </Button>
            </div>
            <div className='body'>
                { form && <MovieForm /> }
                { shelf && <MovieShelf lib={ lib } /> }
                { noteShelf && <SelectMovie /> }
                { noteShelf && <MovieNoteShelf notes={ notes } /> }
                { noteForm && <MovieNote movies={ movies } /> }
            </div>
        </div>
    )
}

export default Nav
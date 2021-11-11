import React, { useState } from 'react'
import { Button, Icon, Form } from 'semantic-ui-react'
import MovieForm from '../forms/MovieForm'
import MovieShelf from '../shelves/MovieShelf'
import MovieNoteShelf from '../shelves/MovieNoteShelf'
import MovieNote from '../notes/MovieNote'
import { api, apiNotes } from '../serverCalls/movieCalls'

const NavMovies = () => {

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

    const getCount = async () => {
        const newData = await api()
        setCount(newData.length)
        const newDataNotes = await apiNotes()
        setNoteCount(newDataNotes.length)
    }
    getCount()

    const getShelf = async () => {
        const newData = await api()
        if (!lib[0]) {
            newData.map(m => {
                return setLib(prev => [ ...prev, m ])
            })
        }
    }

    const getMovies = async () => {
        if (!movies[0]) {
            const newData = await api()
            newData.map(m => {
                return setMovies(prev => [ ...prev, { key: m.id, text: m.title, value: m.id } ])
            })
        }
    }

    const getMovieNotesByAll = async () => {
        const newData = await apiNotes()
        newData.map(m => {
            return setNotes(prev => [ ...prev, m ])
        })
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
                        onClick={ () => {
                            setNotes([])
                            getMovieNotesByAll()
                        }}
                        >All
                    </Button>
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
                        getShelf()
                    }}>
                    <div className='visible content'>Movies</div>
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
                <br />
                    <button
                    className="ui olive fade animated button"
                    onClick={ () => {
                        setNoteShelf(!noteShelf)
                        setNoteForm(false)
                        setForm(false)
                        setShelf(false)
                        getMovies()
                        getMovieNotesByAll()
                    }}>
                    <div className='visible content'>Movie Notes</div>
                    <div className='hidden content'>{ noteCount }</div>
                </button>
                <Button 
                    icon
                    color='olive'
                    onClick={ () => {
                        setNoteForm(!noteForm)
                        setForm(false)
                        setShelf(false)
                        setNoteShelf(false)
                        getMovies()
                    }}>
                    <Icon name='plus' />
                </Button>
            </div>
            <div className='body'>
                { shelf && <MovieShelf lib={ lib } /> }
                { form && <MovieForm /> }
                { noteShelf && <SelectMovie /> }
                { noteShelf && <MovieNoteShelf notes={ notes } /> }
                { noteForm && <MovieNote movies={ movies } /> }
            </div>
        </div>
    )
}

export default NavMovies
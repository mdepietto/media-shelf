import React, { useState } from 'react'
import { Button, Icon, Form } from 'semantic-ui-react'

import MovieForm from '../forms/MovieForm'
import MovieShelf from '../shelves/MovieShelf'
import MovieNoteShelf from '../shelves/MovieNoteShelf'
import MovieNote from '../notes/MovieNote'

import BookShelf from '../shelves/BookShelf'
import BookForm from '../forms/BookForm'
import BookNote from '../notes/BookNote'
import BookNoteShelf from '../shelves/BookNoteShelf'

import ShowShelf from '../shelves/ShowShelf'
import ShowForm from '../forms/ShowForm'
import ShowNote from '../notes/ShowNote'
import ShowNoteShelf from '../shelves/ShowNoteShelf'

import { api, apiNotes, apiBooks, apiBookNotes, apiShows, apiShowNotes } from '../serverCalls/movieCalls'

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

    const [ bookShelf, setBookShelf ] = useState(false)
    const [ bookCount, setBookCount ] = useState(0)
    const [ bookLib, setBookLib ] = useState([])
    const [ bookForm, setBookForm ] = useState(false)
    const [ bookNoteForm, setBookNoteForm ] = useState(false)
    const [ books, setBooks ] = useState([])
    const [ bookNoteShelf, setBookNoteShelf ] = useState(false)
    const [ bookNoteCount, setBookNoteCount ] = useState(0)
    const [ bookNotes, setBookNotes ] = useState([])
    const [ bookNotesFor, setBookNotesFor ] = useState('')

    const [ showShelf, setShowShelf ] = useState(false)
    const [ showCount, setShowCount ] = useState(0)
    const [ showLib, setShowLib ] = useState([])
    const [ showForm, setShowForm ] = useState(false)
    const [ showNoteForm, setShowNoteForm ] = useState(false)
    const [ shows, setShows ] = useState([])
    const [ showNoteShelf, setShowNoteShelf ] = useState(false)
    const [ showNoteCount, setShowNoteCount ] = useState(0)
    const [ showNotes, setShowNotes ] = useState([])
    const [ showNotesFor, setShowNotesFor ] = useState('')

    const getCount = async () => {
        const newData = await api()
        setCount(newData.length)
        const newDataNotes = await apiNotes()
        setNoteCount(newDataNotes.length)
        const newDataBooks = await apiBooks()
        setBookCount(newDataBooks.length)
        const newDataBookNotes = await apiBookNotes()
        setBookNoteCount(newDataBookNotes.length)
        const newDataShows = await apiShows()
        setShowCount(newDataShows.length)
        const newDataShowNotes = await apiShowNotes()
        setShowNoteCount(newDataShowNotes.length)
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
    
    const getBooks = async () => {
        const newData = await apiBooks()
        if (!bookLib[0]) {
            newData.map(m => {
                return setBookLib(prev => [ ...prev, m ])
            })
        }
    }
    
    const getBooksDropdown = async () => {
        if (!books[0]) {
            const newData = await apiBooks()
            newData.map(b => {
                return setBooks(prev => [ ...prev, { key: b.id, text: b.title, value: b.id } ])
            })
        }
    }
    
    const getShows = async () => {
        const newData = await apiShows()
        if (!showLib[0]) {
            newData.map(s => {
                return setShowLib(prev => [ ...prev, s ])
            })
        }
    }
    
    const getShowsDropdown = async () => {
        if (!shows[0]) {
            const newData = await apiShows()
            newData.map(s => {
                return setShows(prev => [ ...prev, { key: s.id, text: s.title, value: s.id } ])
            })
        }
    }

    const getMovieNotesByAll = async () => {
        const newData = await apiNotes()
        if (!notes[0]) {
            newData.map(m => {
                return setNotes(prev => [ ...prev, m ])
            })
        }
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

    const getBookNotesByAll = async () => {
        const newData = await apiBookNotes()
        if (!bookNotes[0]) {
            newData.map(b => {
                return setBookNotes(prev => [ ...prev, b ])
            })
        }
    }

    const getBookNotesByTitle = async (e) => {
        const { innerText } = await e.target
        const newData = await fetch('/apiBookNotesByTitle', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ innerText })
        })
        .then(res => res.json())
        setBookNotes(newData)
        setBookNotesFor(innerText)
    }

    const getShowNotesByAll = async () => {
        const newData = await apiShowNotes()
        if (!showNotes[0]) {
            newData.map(s => {
                return setShowNotes(prev => [ ...prev, s ])
            })
        }
    }

    const getShowNotesByTitle = async (e) => {
        const { innerText } = await e.target
        const newData = await fetch('/apiShowNotesByTitle', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ innerText })
        })
        .then(res => res.json())
        setShowNotes(newData)
        setShowNotesFor(innerText)
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
                        color='inverted blue' 
                        style={{ height: '38px', marginLeft: '5px' }}
                        onClick={ () => {
                            setNotes([])
                            getMovieNotesByAll()
                        }}
                        >All
                    </Button>
                </Form>
                <h3 style={{ margin: '0' }}>Showing movie notes for:</h3><br />
                <h3 style={{ margin: '0' }}>{ notesFor }</h3>
            </div>
        )
    }

    const SelectBook = () => {
        return (
            <div className='selectMovie'>
                <Form style={{ display: 'flex', flexDirection: 'row' }}>
                    <Form.Group width='equal'>
                        <Form.Select
                            options={ books }
                            name='book'
                            placeholder='Book'
                            onChange={ getBookNotesByTitle }
                        />
                    </Form.Group>
                    <Button
                        color='inverted blue' 
                        style={{ height: '38px', marginLeft: '5px' }}
                        onClick={ () => {
                            setBookNotes([])
                            getBookNotesByAll()
                        }}
                        >All
                    </Button>
                </Form>
                <h3 style={{ margin: '0' }}>Showing book notes for:</h3><br />
                <h3 style={{ margin: '0' }}>{ bookNotesFor }</h3>
            </div>
        )
    }

    const SelectShow = () => {
        return (
            <div className='selectMovie'>
                <Form style={{ display: 'flex', flexDirection: 'row' }}>
                    <Form.Group width='equal'>
                        <Form.Select
                            options={ shows }
                            name='show'
                            placeholder='Show'
                            onChange={ getShowNotesByTitle }
                        />
                    </Form.Group>
                    <Button
                        color='inverted blue' 
                        style={{ height: '38px', marginLeft: '5px' }}
                        onClick={ () => {
                            setShowNotes([])
                            getShowNotesByAll()
                        }}
                        >All
                    </Button>
                </Form>
                <h3 style={{ margin: '0' }}>Showing show notes for:</h3><br />
                <h3 style={{ margin: '0' }}>{ showNotesFor }</h3>
            </div>
        )
    }

    return (
        <div className='mainPage'>
            <div className='nav'>
                <div className='sbsButtons'>
                    <button
                        className="ui inverted olive fade animated button"
                        style={{ width: '80%' }}
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
                        color='inverted olive'
                        onClick={ () => {
                            setForm(!form)
                            setShelf(false)
                            setNoteShelf(false)
                            setNoteForm(false)
                        }}>
                        <Icon name='plus' />
                    </Button>
                </div>
                <div className='sbsButtons'>
                    <button
                        className="ui inverted olive fade animated button"
                        style={{ width: '80%' }}
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
                        color='inverted olive'
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
                <br /><br />
                <div className='sbsButtons'>
                    <button
                        className="ui inverted olive fade animated button"
                        style={{ width: '80%' }}
                        onClick={ () => {
                            setBookShelf(!bookShelf)
                            getBooks()
                        }}>
                        <div className='visible content'>Books</div>
                        <div className='hidden content'>{ bookCount }</div>
                    </button>
                    <Button
                        icon
                        color='inverted olive'
                        onClick={ () => {
                            setBookForm(!bookForm)
                        }}>
                        <Icon name='plus' />
                    </Button>
                </div>
                <div className='sbsButtons'>
                    <button
                        className="ui inverted olive fade animated button"
                        style={{ width: '80%' }}
                        onClick={ () => {
                            setBookNoteShelf(!bookNoteShelf)
                            getBooksDropdown()
                            getBookNotesByAll()
                        }}>
                        <div className='visible content'>Book Notes</div>
                        <div className='hidden content'>{ bookNoteCount }</div>
                    </button>
                    <Button 
                        icon
                        color='inverted olive'
                        onClick={ () => {
                            setBookNoteForm(!bookNoteForm)
                            getBooksDropdown()
                        }}>
                        <Icon name='plus' />
                    </Button>
                </div>
                <br /><br />
                <div className='sbsButtons'>
                    <button
                        className="ui inverted olive fade animated button"
                        style={{ width: '80%' }}
                        onClick={ () => {
                            setShowShelf(!showShelf)
                            getShows()
                        }}>
                        <div className='visible content'>Shows</div>
                        <div className='hidden content'>{ showCount }</div>
                    </button>
                    <Button
                        icon
                        color='inverted olive'
                        onClick={ () => {
                            setShowForm(!showForm)
                        }}>
                        <Icon name='plus' />
                    </Button>
                </div>
                <div className='sbsButtons'>
                    <button
                        className="ui inverted olive fade animated button"
                        style={{ width: '80%' }}
                        onClick={ () => {
                            setShowNoteShelf(!showNoteShelf)
                            getShowsDropdown()
                            getShowNotesByAll()
                        }}>
                        <div className='visible content'>Show Notes</div>
                        <div className='hidden content'>{ showNoteCount }</div>
                    </button>
                    <Button 
                        icon
                        color='inverted olive'
                        onClick={ () => {
                            setShowNoteForm(!showNoteForm)
                            getShowsDropdown()
                        }}>
                        <Icon name='plus' />
                    </Button>
                </div>
            </div>
            <div className='body'>
                { shelf && <MovieShelf lib={ lib } /> }
                { form && <MovieForm /> }
                { noteShelf && <SelectMovie /> }
                { noteShelf && <MovieNoteShelf notes={ notes } /> }
                { noteForm && <MovieNote movies={ movies } /> }

                { bookShelf && <BookShelf bookLib={ bookLib } /> }
                { bookForm && <BookForm /> }
                { bookNoteShelf && <SelectBook /> }
                { bookNoteShelf && <BookNoteShelf bookNotes={ bookNotes } /> }
                { bookNoteForm && <BookNote books={ books } />}

                { showShelf && <ShowShelf showLib={ showLib } /> }
                { showForm && <ShowForm /> }
                { showNoteShelf && <SelectShow /> }
                { showNoteShelf && <ShowNoteShelf showNotes={ showNotes } /> }
                { showNoteForm && <ShowNote shows={ shows } />}
            </div>
        </div>
    )
}

export default NavMovies
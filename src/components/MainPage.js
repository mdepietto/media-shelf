import React, { useState } from 'react'
import { Button, Icon } from 'semantic-ui-react'

import BookForm from '../forms/BookForm'

import MovieForm from '../forms/MovieForm'

import ShowForm from '../forms/ShowForm'

import Dropdown from './Dropdown'
import Shelf from '../shelves/Shelf'
import NoteShelf from '../shelves/NoteShelf'
import NoteForm from '../notes/NoteForm'

import { apiBooks, apiBookNotes, apiMovies, apiMovieNotes, apiShows, apiShowNotes } from '../serverCalls'

const NavMovies = () => {

    const [ bookShelf, setBookShelf ] = useState(false)
    const [ bookCount, setBookCount ] = useState(0)
    const [ bookLib, setBookLib ] = useState([])
    const [ bookForm, setBookForm ] = useState(false)
    const [ bookNoteForm, setBookNoteForm ] = useState(false)
    const [ books, setBooks ] = useState([{ key: 0, text: 'All', value: 0 }])
    const [ bookNoteShelf, setBookNoteShelf ] = useState(false)
    const [ bookNoteCount, setBookNoteCount ] = useState(0)
    const [ bookNotes, setBookNotes ] = useState([])

    const [ movieShelf, setMovieShelf ] = useState(false)
    const [ movieCount, setMovieCount ] = useState(0)
    const [ movieLib, setMovieLib ] = useState([])
    const [ movieForm, setMovieForm ] = useState(false)
    const [ movieNoteShelf, setMovieNoteShelf ] = useState(false)
    const [ movieNoteCount, setMovieNoteCount ] = useState(0)
    const [ movieNotes, setMovieNotes ] = useState([])
    const [ movies, setMovies ] = useState([{ key: 0, text: 'All', value: 0 }])
    const [ movieNoteForm, setMovieNoteForm ] = useState(false)

    const [ showShelf, setShowShelf ] = useState(false)
    const [ showCount, setShowCount ] = useState(0)
    const [ showLib, setShowLib ] = useState([])
    const [ showForm, setShowForm ] = useState(false)
    const [ showNoteForm, setShowNoteForm ] = useState(false)
    const [ shows, setShows ] = useState([{ key: 0, text: 'All', value: 0 }])
    const [ showNoteShelf, setShowNoteShelf ] = useState(false)
    const [ showNoteCount, setShowNoteCount ] = useState(0)
    const [ showNotes, setShowNotes ] = useState([])

    const getCount = async (api, count) => {
        const newData = await api()
        count(newData.length)
    }
    getCount(apiBooks, setBookCount)
    getCount(apiBookNotes, setBookNoteCount)
    getCount(apiMovies, setMovieCount)
    getCount(apiMovieNotes, setMovieNoteCount)
    getCount(apiShows, setShowCount)
    getCount(apiShowNotes, setShowNoteCount)

    const getMedia = async (api, lib, setLib) => {
        const newData = await api()
        if (!lib[0]) {
            newData.map(media => {
                return setLib(prev => [ ...prev, media ])
            })
        }
    }
    
    const getDropdown = async (lib, api, setLib) => {
        if (!lib[1]) {
            const newData = await api()
            newData.map(media => {
                return setLib(prev => [ ...prev, { key: media.id, text: media.title, value: media.id }])
            })
        }
    }

    const getNotesByAll = async (api, notes, noteLib) => {
        const newData = await api()
        if (!notes[0]) {
            newData.map(media => {
                media.note_date = media.note_date.slice(0, 10);
                return noteLib(prev => [ ...prev, media ])
            })
        }
    }

    return (
        <div className='mainPage'>
            <div className='nav'>
                <div className='sbsButtons'>
                    <Button
                        inverted
                        size='big'
                        color='olive'
                        style={{ width: '80%' }}
                        animated='fade'
                        onClick={ () => {
                            setBookShelf(!bookShelf)
                            setMovieShelf(false)
                            setMovieForm(false)
                            setMovieNoteShelf(false)
                            setMovieNoteForm(false)
                            setBookForm(false)
                            setBookNoteShelf(false)
                            setBookNoteForm(false)
                            setShowShelf(false)
                            setShowForm(false)
                            setShowNoteShelf(false)
                            setShowNoteForm(false)
                            getMedia(apiBooks, bookLib, setBookLib)
                        }}>
                        <Button.Content visible>Books</Button.Content>
                        <Button.Content hidden>{ bookCount }</Button.Content>
                    </Button>
                    <Button
                        icon
                        inverted
                        size='big'
                        color='olive'
                        onClick={ () => {
                            setBookForm(!bookForm)
                            setMovieShelf(false)
                            setMovieForm(false)
                            setMovieNoteShelf(false)
                            setMovieNoteForm(false)
                            setBookShelf(false)
                            setBookNoteShelf(false)
                            setBookNoteForm(false)
                            setShowShelf(false)
                            setShowForm(false)
                            setShowNoteShelf(false)
                            setShowNoteForm(false)
                        }}>
                        <Icon name='plus' />
                    </Button>
                </div>
                <div className='sbsButtons'>
                    <Button
                        inverted
                        size='big'
                        color='olive'
                        style={{ width: '80%' }}
                        animated='fade'
                        onClick={ () => {
                            setBookNoteShelf(!bookNoteShelf)
                            setMovieShelf(false)
                            setMovieForm(false)
                            setMovieNoteShelf(false)
                            setMovieNoteForm(false)
                            setBookShelf(false)
                            setBookForm(false)
                            setBookNoteForm(false)
                            setShowShelf(false)
                            setShowForm(false)
                            setShowNoteShelf(false)
                            setShowNoteForm(false)
                            getDropdown(books, apiBooks, setBooks)
                            getNotesByAll(apiBookNotes, bookNotes, setBookNotes)
                        }}>
                        <Button.Content visible>Book Notes</Button.Content>
                        <Button.Content hidden>{ bookNoteCount }</Button.Content>
                    </Button>
                    <Button 
                        icon
                        inverted
                        size='big'
                        color='olive'
                        onClick={ () => {
                            setBookNoteForm(!bookNoteForm)
                            setMovieShelf(false)
                            setMovieForm(false)
                            setMovieNoteShelf(false)
                            setMovieNoteForm(false)
                            setBookShelf(false)
                            setBookForm(false)
                            setBookNoteShelf(false)
                            setShowShelf(false)
                            setShowForm(false)
                            setShowNoteShelf(false)
                            setShowNoteForm(false)
                            getDropdown(books, apiBooks, setBooks)
                        }}>
                        <Icon name='plus' />
                    </Button>
                </div>

                <br /><br />

                <div className='sbsButtons'>
                    <Button
                        inverted
                        size='big'
                        color='yellow'
                        style={{ width: '80%' }}
                        animated='fade'
                        onClick={ () => {
                            setMovieShelf(!movieShelf)
                            setMovieForm(false)
                            setMovieNoteShelf(false)
                            setMovieNoteForm(false)
                            setBookShelf(false)
                            setBookForm(false)
                            setBookNoteShelf(false)
                            setBookNoteForm(false)
                            setShowShelf(false)
                            setShowForm(false)
                            setShowNoteShelf(false)
                            setShowNoteForm(false)
                            getMedia(apiMovies, movieLib, setMovieLib)
                        }}>
                        <Button.Content visible>Movies</Button.Content>
                        <Button.Content hidden>{ movieCount }</Button.Content>
                    </Button>
                    <Button
                        icon
                        inverted
                        size='big'
                        color='yellow'
                        onClick={ () => {
                            setMovieForm(!movieForm)
                            setMovieShelf(false)
                            setMovieNoteShelf(false)
                            setMovieNoteForm(false)
                            setBookShelf(false)
                            setBookForm(false)
                            setBookNoteShelf(false)
                            setBookNoteForm(false)
                            setShowShelf(false)
                            setShowForm(false)
                            setShowNoteShelf(false)
                            setShowNoteForm(false)
                        }}>
                        <Icon name='plus' />
                    </Button>
                </div>
                <div className='sbsButtons'>
                    <Button
                        inverted
                        size='big'
                        color='yellow'
                        style={{ width: '80%' }}
                        animated='fade'
                        onClick={ () => {
                            setMovieNoteShelf(!movieNoteShelf)
                            setMovieShelf(false)
                            setMovieForm(false)
                            setMovieNoteForm(false)
                            setBookShelf(false)
                            setBookForm(false)
                            setBookNoteShelf(false)
                            setBookNoteForm(false)
                            setShowShelf(false)
                            setShowForm(false)
                            setShowNoteShelf(false)
                            setShowNoteForm(false)
                            getDropdown(movies, apiMovies, setMovies)
                            getNotesByAll(apiMovieNotes, movieNotes, setMovieNotes)
                        }}>
                        <Button.Content visible>Movie Notes</Button.Content>
                        <Button.Content hidden>{ movieNoteCount }</Button.Content>
                    </Button>
                    <Button 
                        icon
                        inverted
                        size='big'
                        color='yellow'
                        onClick={ () => {
                            setMovieNoteForm(!movieNoteForm)
                            setMovieShelf(false)
                            setMovieForm(false)
                            setMovieNoteShelf(false)
                            setBookShelf(false)
                            setBookForm(false)
                            setBookNoteShelf(false)
                            setBookNoteForm(false)
                            setShowShelf(false)
                            setShowForm(false)
                            setShowNoteShelf(false)
                            setShowNoteForm(false)
                            getDropdown(movies, apiMovies, setMovies)
                        }}>
                        <Icon name='plus' />
                    </Button>
                </div>

                <br /><br />

                <div className='sbsButtons'>
                    <Button
                        inverted
                        size='big'
                        color='orange'
                        style={{ width: '80%' }}
                        animated='fade'
                        onClick={ () => {
                            setShowShelf(!showShelf)
                            setMovieShelf(false)
                            setMovieForm(false)
                            setMovieNoteShelf(false)
                            setMovieNoteForm(false)
                            setBookShelf(false)
                            setBookForm(false)
                            setBookNoteShelf(false)
                            setBookNoteForm(false)
                            setShowForm(false)
                            setShowNoteShelf(false)
                            setShowNoteForm(false)
                            getMedia(apiShows, showLib, setShowLib)
                        }}>
                        <Button.Content visible>Shows</Button.Content>
                        <Button.Content hidden>{ showCount }</Button.Content>
                    </Button>
                    <Button
                        icon
                        inverted
                        size='big'
                        color='orange'
                        onClick={ () => {
                            setShowForm(!showForm)
                            setMovieShelf(false)
                            setMovieForm(false)
                            setMovieNoteShelf(false)
                            setMovieNoteForm(false)
                            setBookShelf(false)
                            setBookForm(false)
                            setBookNoteShelf(false)
                            setBookNoteForm(false)
                            setShowShelf(false)
                            setShowNoteShelf(false)
                            setShowNoteForm(false)
                        }}>
                        <Icon name='plus' />
                    </Button>
                </div>
                <div className='sbsButtons'>
                    <Button
                        inverted
                        size='big'
                        color='orange'
                        style={{ width: '80%' }}
                        animated='fade'
                        onClick={ () => {
                            setShowNoteShelf(!showNoteShelf)
                            setMovieShelf(false)
                            setMovieForm(false)
                            setMovieNoteShelf(false)
                            setMovieNoteForm(false)
                            setBookShelf(false)
                            setBookForm(false)
                            setBookNoteShelf(false)
                            setBookNoteForm(false)
                            setShowShelf(false)
                            setShowForm(false)
                            setShowNoteForm(false)
                            getDropdown(shows, apiShows, setShows)
                            getNotesByAll(apiShowNotes, showNotes, setShowNotes)
                        }}>
                        <Button.Content visible>Show Notes</Button.Content>
                        <Button.Content hidden>{ showNoteCount }</Button.Content>
                    </Button>
                    <Button 
                        icon
                        inverted
                        size='big'
                        color='orange'
                        onClick={ () => {
                            setShowNoteForm(!showNoteForm)
                            setMovieShelf(false)
                            setMovieForm(false)
                            setMovieNoteShelf(false)
                            setMovieNoteForm(false)
                            setBookShelf(false)
                            setBookForm(false)
                            setBookNoteShelf(false)
                            setBookNoteForm(false)
                            setShowShelf(false)
                            setShowForm(false)
                            setShowNoteShelf(false)
                            getDropdown(shows, apiShows, setShows)
                        }}>
                        <Icon name='plus' />
                    </Button>
                </div>
            </div>

            <div className='body'>
                { bookShelf && <Shelf
                    name='book'
                    path='/deleteBook'
                    lib={ bookLib }
                    setLib={ setBookLib }
                    setShelf={ setBookShelf }
                /> }
                { bookForm && <BookForm 
                    setBookForm={ setBookForm } 
                    setBookLib={ setBookLib } 
                /> }
                { bookNoteShelf &&
                    <div>
                        <Dropdown
                            options={ books }
                            name='book'
                            placeholder='Book'
                            set={ setBookNotes }
                            path={ '/apiBookNotesByTitle' }
                            api={ apiBookNotes }
                            border='202, 237, 114'
                        />
                        <NoteShelf
                            path='/deleteBookNote'
                            name='book'
                            Notes={ bookNotes }
                            setNoteShelf={ setBookNoteShelf }
                            setNotes={ setBookNotes }
                        />
                    </div>
                }
                { bookNoteForm && <NoteForm
                    name='book'
                    lib={ books }
                    path='/addBookNote'
                    setNotes={ setBookNotes }
                    setNoteForm={ setBookNoteForm }
                /> }

                { movieShelf && <Shelf
                    name='movie'
                    path='/deleteMovie'
                    lib={ movieLib }
                    setLib={ setMovieLib }
                    setShelf={ setMovieShelf }
                /> }
                { movieForm && <MovieForm
                    setMovieForm={ setMovieForm } 
                    setMovieLib={ setMovieLib }
                /> }
                { movieNoteShelf &&
                    <div>
                        <Dropdown
                            options={ movies }
                            name='movie'
                            placeholder='Movie'
                            set={ setMovieNotes }
                            path={ '/apiMovieNotesByTitle' }
                            api={ apiMovieNotes }
                            border='235, 229, 52'
                        />
                        <NoteShelf
                            path='/deleteMovieNote'
                            name='movie'
                            Notes={ movieNotes }
                            setNoteShelf={ setMovieNoteShelf }
                            setNotes={ setMovieNotes }
                        />
                    </div>
                }
                { movieNoteForm && <NoteForm
                    name='movie'
                    lib={ movies }
                    path='/addMovieNote'
                    setNotes={ setMovieNotes }
                    setNoteForm={ setMovieNoteForm }
                /> }

                { showShelf && <Shelf
                    name='show'
                    path='/deleteShow'
                    lib={ showLib }
                    setLib={ setShowLib }
                    setShelf={ setShowShelf }
                /> }
                { showForm && <ShowForm 
                    setShowForm={ setShowForm } 
                    setShowLib={ setShowLib }
                /> }
                { showNoteShelf &&
                    <div>
                        <Dropdown
                            options={ shows }
                            name='show'
                            placeholder='Show'
                            set={ setShowNotes }
                            path={ '/apiShowNotesByTitle' }
                            api={ apiShowNotes }
                            border='242, 129, 7'
                        />
                        <NoteShelf
                            path='/deleteShowNote'
                            name='show'
                            Notes={ showNotes }
                            setNoteShelf={ setShowNoteShelf }
                            setNotes={ setShowNotes }
                        />
                    </div>
                }
                { showNoteForm && <NoteForm
                    name='show'
                    lib={ shows }
                    path='/addShowNote'
                    setNotes={ setShowNotes }
                    setNoteForm={ setShowNoteForm }
                /> }
            </div>
        </div>
    )
}

export default NavMovies
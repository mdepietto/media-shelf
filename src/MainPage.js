import React, { useState } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import PropagateLoader from "react-spinners/PropagateLoader";
import { css } from "@emotion/react";

import ScreenSaver from './components/ScreenSaver'
import Dropdown from './components/Dropdown'
import Shelf from './components/Shelf'
import ShelfForm from './components/ShelfForm'
import NoteShelf from './components/NoteShelf'
import NoteForm from './components/NoteForm'

import Sort from './components/Sort'

import NavTop from './components/NavTop'
import NavBottom from './components/NavBottom'

import { apiBooks, apiBookNotes, apiMovies, apiMovieNotes, apiShows, apiShowNotes } from './back-end-calls/serverCalls'

const MainPage = () => {

    const [ loading, setLoading ] = useState(false)
    const [ screenSaver, setScreenSaver ] = useState(true)

    const [ bookShelf, setBookShelf ] = useState(false)
    const [ bookForm, setBookForm ] = useState(false)
    const [ bookNoteShelf, setBookNoteShelf ] = useState(false)
    const [ bookNoteForm, setBookNoteForm ] = useState(false)

    const [ movieShelf, setMovieShelf ] = useState(false)
    const [ movieForm, setMovieForm ] = useState(false)
    const [ movieNoteShelf, setMovieNoteShelf ] = useState(false)
    const [ movieNoteForm, setMovieNoteForm ] = useState(false)

    const [ showShelf, setShowShelf ] = useState(false)
    const [ showForm, setShowForm ] = useState(false)
    const [ showNoteShelf, setShowNoteShelf ] = useState(false)
    const [ showNoteForm, setShowNoteForm ] = useState(false)

    const [ navButtons, setNavButtons ] = useState(false)

    const [ bookCount, setBookCount ] = useState(0)
    const [ bookNoteCount, setBookNoteCount ] = useState(0)
    const [ movieCount, setMovieCount ] = useState(0)
    const [ movieNoteCount, setMovieNoteCount ] = useState(0)
    const [ showCount, setShowCount ] = useState(0)
    const [ showNoteCount, setShowNoteCount ] = useState(0)

    const [ books, setBooks ] = useState([{ key: 0, text: 'All', value: 0 }])
    const [ movies, setMovies ] = useState([{ key: 0, text: 'All', value: 0 }])
    const [ shows, setShows ] = useState([{ key: 0, text: 'All', value: 0 }])

    const [ library, setLibrary ] = useState([])
    const [ noteLibrary, setNoteLibrary ] = useState([])

    const override = css`
        position: fixed;
        top: 50%;
        left: 63%;
    `

    const getCount = async (path, count) => {
        const newData = await path()
        count(newData.length)
    }
    getCount(apiBooks, setBookCount)
    getCount(apiBookNotes, setBookNoteCount)
    getCount(apiMovies, setMovieCount)
    getCount(apiMovieNotes, setMovieNoteCount)
    getCount(apiShows, setShowCount)
    getCount(apiShowNotes, setShowNoteCount)

    const getMedia = async (api) => {
        setLoading(true)
        setLibrary([])
        const newData = await api()
        newData.map(media => {
            return setLibrary(prev => [ ...prev, media ])
        })
        setLoading(false)
    }
    
    const getDropdown = async (lib, api, setLib) => {
        if (!lib[1]) {
            const newData = await api()
            newData.map(media => {
                return setLib(prev => [ ...prev, { key: media.id, text: media.title, value: media.id }])
            })
        }
    }

    const getNotesByAll = async (api) => {
        setLoading(true)
        setNoteLibrary([])
        const newData = await api()
        newData.map(media => {
            // media.note_date = media.note_date.slice(0, 10);
            return setNoteLibrary(prev => [ ...prev, media ])
        })
        setLoading(false)
    }

    return (
        <div className='mainPage'>

            { navButtons && <NavTop /> }
            { navButtons && <NavBottom /> }

            <div className='nav'>
                <div className='sbsButtons'>
                    <Button
                        inverted
                        size='big'
                        color='olive'
                        style={{ width: '80%' }}
                        animated='fade'
                        onClick={ () => {
                            setBookShelf(true)
                            setScreenSaver(false)
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
                            setNavButtons(true)
                            getMedia(apiBooks, setLibrary)
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
                            setBookForm(true)
                            setScreenSaver(false)
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
                            setNavButtons(false)
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
                            setBookNoteShelf(true)
                            setScreenSaver(false)
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
                            setNavButtons(true)
                            getDropdown(books, apiBooks, setBooks)
                            getNotesByAll(apiBookNotes)
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
                            setBookNoteForm(true)
                            setScreenSaver(false)
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
                            setNavButtons(false)
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
                            setMovieShelf(true)
                            setScreenSaver(false)
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
                            setNavButtons(true)
                            getMedia(apiMovies, setLibrary)
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
                            setMovieForm(true)
                            setScreenSaver(false)
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
                            setNavButtons(false)
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
                            setMovieNoteShelf(true)
                            setScreenSaver(false)
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
                            setNavButtons(true)
                            getDropdown(movies, apiMovies, setMovies)
                            getNotesByAll(apiMovieNotes)
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
                            setMovieNoteForm(true)
                            setScreenSaver(false)
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
                            setNavButtons(false)
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
                            setShowShelf(true)
                            setScreenSaver(false)
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
                            setNavButtons(true)
                            getMedia(apiShows, setLibrary)
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
                            setShowForm(true)
                            setScreenSaver(false)
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
                            setNavButtons(false)
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
                            setShowNoteShelf(true)
                            setScreenSaver(false)
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
                            setNavButtons(true)
                            getDropdown(shows, apiShows, setShows)
                            getNotesByAll(apiShowNotes)
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
                            setShowNoteForm(true)
                            setScreenSaver(false)
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
                            setNavButtons(false)
                            getDropdown(shows, apiShows, setShows)
                        }}>
                        <Icon name='plus' />
                    </Button>
                </div>
            </div>
            
            { screenSaver && <ScreenSaver /> }

            { loading ? <PropagateLoader color={ 'rgb(193, 255, 38)' } css={ override } loading={ loading } size={ 30 } /> :
                <div className='body'>
                    { bookShelf && 
                        <div>
                            <Sort
                                name='books'
                                lib={ library }
                                setLib={ setLibrary }
                                border='202, 237, 114'
                            />
                            <Shelf
                                name='book'
                                path='/deleteBook'
                                lib={ library }
                                setLib={ setLibrary }
                                setShelf={ setBookShelf }
                                sortPath='/booksByTitle'
                            />
                        </div>
                    }
                    { bookForm && <ShelfForm
                        path='/addBook'
                        name='book'
                        setForm={ setBookForm } 
                        setLib={ setLibrary }
                    /> }
                    { bookNoteShelf &&
                        <div>
                            <Dropdown
                                options={ books }
                                name='book'
                                placeholder='Book'
                                set={ setNoteLibrary }
                                path={ '/apiBookNotesByTitle' }
                                api={ apiBookNotes }
                                border='202, 237, 114'
                                setLoading= { setLoading }
                            />
                            <NoteShelf
                                path='/deleteBookNote'
                                name='book'
                                Notes={ noteLibrary }
                                setNoteShelf={ setBookNoteShelf }
                                setNotes={ setNoteLibrary }
                            />
                        </div>
                    }
                    { bookNoteForm && <NoteForm
                        name='book'
                        lib={ books }
                        path='/addBookNote'
                        setNotes={ setNoteLibrary }
                        setNoteForm={ setBookNoteForm }
                    /> }

                    { movieShelf && 
                        <div>
                            <Sort
                                name='movies'
                                lib={ library }
                                setLib={ setLibrary }
                                border='235, 229, 52'
                            />
                            <Shelf
                                name='movie'
                                path='/deleteMovie'
                                lib={ library }
                                setLib={ setLibrary }
                                setShelf={ setMovieShelf }
                            />
                        </div>
                    }
                    { movieForm && <ShelfForm
                        path='/addMovie'
                        name='movie'
                        setForm={ setMovieForm } 
                        setLib={ setLibrary }
                    /> }
                    { movieNoteShelf &&
                        <div>
                            <Dropdown
                                options={ movies }
                                name='movie'
                                placeholder='Movie'
                                set={ setNoteLibrary }
                                path={ '/apiMovieNotesByTitle' }
                                api={ apiMovieNotes }
                                border='235, 229, 52'
                                setLoading= { setLoading }
                            />
                            <NoteShelf
                                path='/deleteMovieNote'
                                name='movie'
                                Notes={ noteLibrary }
                                setNoteShelf={ setMovieNoteShelf }
                                setNotes={ setNoteLibrary }
                            />
                        </div>
                    }
                    { movieNoteForm && <NoteForm
                        name='movie'
                        lib={ movies }
                        path='/addMovieNote'
                        setNotes={ setNoteLibrary }
                        setNoteForm={ setMovieNoteForm }
                    /> }

                    { showShelf && 
                        <div>
                            <Sort
                                name='shows'
                                lib={ library }
                                setLib={ setLibrary }
                                border='242, 129, 7'
                            />
                            <Shelf
                                name='show'
                                path='/deleteShow'
                                lib={ library }
                                setLib={ setLibrary }
                                setShelf={ setShowShelf }
                            />
                        </div>
                    }
                    { showForm && <ShelfForm
                        path='/addShow'
                        name='show'
                        setForm={ setShowForm } 
                        setLib={ setLibrary }
                    /> }
                    { showNoteShelf &&
                        <div>
                            <Dropdown
                                options={ shows }
                                name='show'
                                placeholder='Show'
                                set={ setNoteLibrary }
                                path={ '/apiShowNotesByTitle' }
                                api={ apiShowNotes }
                                border='242, 129, 7'
                                setLoading= { setLoading }
                            />
                            <NoteShelf
                                path='/deleteShowNote'
                                name='show'
                                Notes={ noteLibrary }
                                setNoteShelf={ setShowNoteShelf }
                                setNotes={ setNoteLibrary }
                            />
                        </div>
                    }
                    { showNoteForm && <NoteForm
                        name='show'
                        lib={ shows }
                        path='/addShowNote'
                        setNotes={ setNoteLibrary }
                        setNoteForm={ setShowNoteForm }
                    /> }
                </div>
            }

        </div>
    )
}

export default MainPage
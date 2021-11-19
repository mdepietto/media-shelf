import React, { useState } from 'react'
import { Button, Icon, Form } from 'semantic-ui-react'

import BookShelf from '../shelves/BookShelf'
import BookForm from '../forms/BookForm'
import BookNote from '../notes/BookNote'
import BookNoteShelf from '../shelves/BookNoteShelf'

import MovieForm from '../forms/MovieForm'
import MovieShelf from '../shelves/MovieShelf'
import MovieNoteShelf from '../shelves/MovieNoteShelf'
import MovieNote from '../notes/MovieNote'

import ShowShelf from '../shelves/ShowShelf'
import ShowForm from '../forms/ShowForm'
import ShowNote from '../notes/ShowNote'
import ShowNoteShelf from '../shelves/ShowNoteShelf'

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
    const [ bookNotesFor, setBookNotesFor ] = useState('')

    const [ movieShelf, setMovieShelf ] = useState(false)
    const [ movieCount, setMovieCount ] = useState(0)
    const [ movieLib, setMovieLib ] = useState([])
    const [ movieForm, setMovieForm ] = useState(false)
    const [ movieNoteShelf, setMovieNoteShelf ] = useState(false)
    const [ movieNoteCount, setMovieNoteCount ] = useState(0)
    const [ movieNotes, setMovieNotes ] = useState([])
    const [ movies, setMovies ] = useState([{ key: 0, text: 'All', value: 0 }])
    const [ movieNotesFor, setMovieNotesFor ] = useState('')
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
    const [ showNotesFor, setShowNotesFor ] = useState('')

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

    const getNotesByTitle = async (title, path, noteLib, noteFor) => {
        noteLib([])
        const newData = await fetch(path, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ title })
        })
        .then(res => res.json())
        newData.map(media => {
            media.note_date = media.note_date.slice(0, 10)
            return noteLib(prev => [ ...prev, media ])
        })
        noteFor(title)
    }

    // const Select = (options, name, placeholder, onChange, all1, all2, noteTitle) => {
    //     return (
    //         <div className='selectDrop'>
    //             <Form style={{ display: 'flex', flexDirection: 'row' }}>
    //                 <Form.Group width='equal'>
    //                     <Form.Select
    //                         options={ options }
    //                         name={ name }
    //                         placeholder={ placeholder }
    //                         onChange={ onChange }
    //                     />
    //                 </Form.Group>
    //                 <Button
    //                     inverted
    //                     color='blue' 
    //                     style={{ height: '38px', marginLeft: '5px' }}
    //                     onClick={ () => {
    //                         all1([])
    //                         all2()
    //                     }}
    //                     >All
    //                 </Button>
    //             </Form>
    //             <h3 style={{ margin: '0' }}>Showing { name } notes for:</h3>
    //             <br />
    //             <h3 style={{ margin: '0' }}>{ noteTitle }</h3>
    //         </div>
    //     )
    // }

    const SelectBook = () => {
        return (
            <div className='selectDrop'>
                <Form style={{ display: 'flex', flexDirection: 'row' }}>
                    <Form.Group width='equal'>
                        <Form.Select
                            options={ books }
                            name='book'
                            placeholder='Book'
                            onChange={ async (e) => {
                                var text = e.target.innerText
                                var newTitle = text.replace(/'/g, "''")
                                setBookNotes([])
                                if (newTitle === 'All') {
                                    const newData = await apiBookNotes()
                                    setBookNotes(newData)
                                    return setBookNotesFor(newTitle)
                                }
                                getNotesByTitle(newTitle, '/apiBookNotesByTitle', setBookNotes, setBookNotesFor)
                            }}
                        />
                    </Form.Group>
                    {/* <Button
                        inverted
                        color='blue' 
                        style={{ height: '38px', marginLeft: '5px' }}
                        onClick={ () => {
                            setBookNotes([])
                            getNotesByAll(apiBookNotes, bookNotes, setBookNotes)
                        }}
                        >All
                    </Button> */}
                </Form>
                <h3 style={{ margin: '0' }}>Showing book notes for:</h3>
                <br />
                <h3 style={{ margin: '0' }}>{ bookNotesFor }</h3>
            </div>
        )
    }

    const SelectMovie = () => {
        return (
            <div className='selectDrop'>
                <Form style={{ display: 'flex', flexDirection: 'row' }}>
                    <Form.Group width='equal'>
                        <Form.Select
                            options={ movies }
                            name='movie'
                            placeholder='Movies'
                            onChange={ async (e) => {
                                var text = e.target.innerText
                                var newTitle = text.replace(/'/g, "''")
                                if (newTitle === 'All') {
                                    const newData = await apiMovieNotes()
                                    setMovieNotes(newData)
                                    return setMovieNotesFor(newTitle)
                                }
                                getNotesByTitle(newTitle, '/apiMovieNotesByTitle', setMovieNotes, setMovieNotesFor)
                            }}
                        />
                    </Form.Group>
                    {/* <Button
                        inverted
                        color='blue' 
                        style={{ height: '38px', marginLeft: '5px' }}
                        onClick={ () => {
                            setMovieNotes([])
                            getNotesByAll(apiMovieNotes, movieNotes, setMovieNotes)
                        }}
                        >All
                    </Button> */}
                </Form>
                <h3 style={{ margin: '0' }}>Showing movie notes for:</h3>
                <br />
                <h3 style={{ margin: '0' }}>{ movieNotesFor }</h3>
            </div>
        )
    }

    const SelectShow = () => {
        return (
            <div className='selectDrop'>
                <Form style={{ display: 'flex', flexDirection: 'row' }}>
                    <Form.Group width='equal'>
                        <Form.Select
                            options={ shows }
                            name='show'
                            placeholder='Show'
                            onChange={ async (e) => {
                                var text = e.target.innerText
                                var newTitle = text.replace(/'/g, "''")
                                if (newTitle === 'All') {
                                    const newData = await apiShowNotes()
                                    setShowNotes(newData)
                                    return setShowNotesFor(newTitle)
                                }
                                getNotesByTitle(newTitle, '/apiShowNotesByTitle', setShowNotes, setShowNotesFor)
                            }}
                        />
                    </Form.Group>
                    {/* <Button
                        inverted
                        color='blue' 
                        style={{ height: '38px', marginLeft: '5px' }}
                        onClick={ () => {
                            setShowNotes([])
                            getNotesByAll(apiShowNotes, showNotes, setShowNotes)
                        }}
                        >All
                    </Button> */}
                </Form>
                <h3 style={{ margin: '0' }}>Showing show notes for:</h3>
                <br />
                <h3 style={{ margin: '0' }}>{ showNotesFor }</h3>
            </div>
        )
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
                { bookShelf && <BookShelf bookLib={ bookLib } /> }
                { bookForm && <BookForm /> }
                { bookNoteShelf && <SelectBook /> }
                { bookNoteShelf && <BookNoteShelf bookNotes={ bookNotes } /> }
                { bookNoteForm && <BookNote books={ books } />}

                { movieShelf && <MovieShelf movieLib={ movieLib } /> }
                { movieForm && <MovieForm /> }
                { movieNoteShelf && <SelectMovie /> }
                { movieNoteShelf && <MovieNoteShelf movieNotes={ movieNotes } /> }
                { movieNoteForm && <MovieNote movies={ movies } /> }

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
import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react';

import Loader from '../components/Loader';
import Dropdown from '../components/Dropdown'
import NoteShelf from '../components/NoteShelf'
import NoteForm from '../components/NoteForm';
import NavTop from '../components/NavTop'
import NavBottom from '../components/NavBottom'

const NotePage = (props) => {

    const userName = useAuth0().user

    const [ library, setLibrary ] = useState([])

    const [ loading, setLoading ] = useState(false)

    const [ noteForm, setNoteForm ] = useState(false)

    const [ bookTitles, setBookTitles ] = useState([{ key: 0, text: 'All', value: 0 }])
    const [ movieTitles, setMovieTitles ] = useState([{ key: 0, text: 'All', value: 0 }])
    const [ showTitles, setShowTitles ] = useState([{ key: 0, text: 'All', value: 0 }])

    useEffect(() => {
        const getDropdown = async (titles, setTitles, path) => {
            if (!titles[1]) {
                const newData = await fetch(path, {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({ userName })
                })
                .then(res => res.json())
                newData.map(media => {
                    return setTitles(prev => [ ...prev, { key: media.id, text: media.title, value: media.id }])
                })
            }
        }
        if (props.name === 'books') getDropdown(bookTitles, setBookTitles, '/apiBooks')
        if (props.name === 'movies') getDropdown(movieTitles, setMovieTitles, '/apiMovies')
        if (props.name === 'shows') getDropdown(showTitles, setShowTitles, '/apiShows')
    }, [ bookTitles, movieTitles, showTitles, props.name, userName ])

    const getData = async (path) => {
        setLoading(true)
        setLibrary([])
        const newData = await fetch(path, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ userName })
        })
        .then(res => res.json())
        newData.map(media => {
            media.note_date = media.note_date.slice(0, 10)
            return setLibrary(prev => [ ...prev, media ])
        })
        setLoading(false)
    }

    if (props.name === 'books') {
        return (
            <div className='body'>

                { loading && <Loader color={ 'rgb(202, 237, 114)' } /> }

                <button onClick={() => setNoteForm(!noteForm)}>Add Book Note</button>

                { noteForm && <NoteForm name='books' path='/addBookNote' border='2px solid rgb(202, 237, 114)' titles={ bookTitles } /> }

                <Dropdown
                    border='202, 237, 114'
                    path='apiBookNotes'
                    titles={ bookTitles }
                    titlePath='apiBookNotesByTitle'
                    name='books'
                    getData={ getData }
                    library={ library }
                    setLibrary={ setLibrary }
                />
                <NoteShelf
                    name='books'
                    getData={ getData }
                    library={ library }
                />
                <NavTop />
                <NavBottom />
            </div>
        )
    }
    if (props.name === 'movies') {
        return (
            <div className='body'>

                { loading && <Loader color={ 'rgb(235, 229, 52)' } /> }

                <button onClick={() => setNoteForm(!noteForm)}>Add Movie Note</button>

                { noteForm && <NoteForm name='movies' path='/addMovieNote' border='2px solid rgb(235, 229, 52)' titles={ movieTitles } /> }

                <Dropdown
                    border='235, 229, 52'
                    path='apiMovieNotes'
                    titles={ movieTitles }
                    titlePath='apiMovieNotesByTitle'
                    name='movies'
                    getData={ getData }
                    library={ library }
                    setLibrary={ setLibrary }
                />
                <NoteShelf
                    name='movies'
                    getData={ getData }
                    library={ library }
                />
                <NavTop />
                <NavBottom />
            </div>
        )
    }
    if (props.name === 'shows') {
        return (
            <div className='body'>

                { loading && <Loader color={ 'rgb(242, 129, 7)' } /> }

                <button onClick={() => setNoteForm(!noteForm)}>Add Movie Note</button>

                { noteForm && <NoteForm name='shows' path='/addShowNote' border='2px solid rgb(242, 129, 7)' titles={ showTitles } /> }

                <Dropdown
                    border='242, 129, 7'
                    path='apiShowNotes'
                    titles={ showTitles }
                    titlePath='apiShowNotesByTitle'
                    name='shows'
                    getData={ getData }
                    library={ library }
                    setLibrary={ setLibrary }
                />
                <NoteShelf
                    name='shows'
                    getData={ getData }
                    library={ library }
                />
                <NavTop />
                <NavBottom />
            </div>
        )
    }
}

export default NotePage
import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import HomeButton from '../components/HomeButton';
import Loader from '../components/Loader';
import Dropdown from '../components/Dropdown'
import NoteShelf from '../components/NoteShelf'
import NoteForm from '../components/NoteForm';
import NavTop from '../components/NavTop'
import NavBottom from '../components/NavBottom'
import EditWindow from '../components/EditWindow';

const NotePage = (props) => {

    const { table, name } = props

    const userName = useAuth0().user

    const [ library, setLibrary ] = useState([])

    const [ loading, setLoading ] = useState(false)
    const [ noteShelf, setNoteShelf ] = useState(true)
    const [ noteForm, setNoteForm ] = useState(false)
    const [ editWindow, setEditWindow ] = useState(false)

    const [ newNote, setNewNote ] = useState('')
    const [ id, setId ] = useState()

    const [ bookTitles, setBookTitles ] = useState([{ key: 0, text: 'All', value: 0 }])
    const [ movieTitles, setMovieTitles ] = useState([{ key: 0, text: 'All', value: 0 }])
    const [ showTitles, setShowTitles ] = useState([{ key: 0, text: 'All', value: 0 }])

    useEffect(() => {
        const getDropdown = async (titles, setTitles, api) => {
            if (!titles[1]) {
                const newData = await fetch('/apiMedia', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({ api, userName })
                })
                .then(res => res.json())
                newData.map(media => {
                    return setTitles(prev => [ ...prev, { key: media.id, text: media.title, value: media.id }])
                })
            }
        }
        if (name === 'books') getDropdown(bookTitles, setBookTitles, 'Books')
        if (name === 'movies') getDropdown(movieTitles, setMovieTitles, 'Movies')
        if (name === 'shows') getDropdown(showTitles, setShowTitles, 'Shows')
    }, [ bookTitles, movieTitles, showTitles, name, userName ])

    const getData = async (api) => {
        setLoading(true)
        setLibrary([])
        const newData = await fetch('apiMedia', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ api, userName })
        })
        .then(res => res.json())
        newData.map(media => {
            media.note_date = media.note_date.slice(0, 10)
            return setLibrary(prev => [ ...prev, media ])
        })
        setLoading(false)
    }

    const editMedia = async () => {
        await fetch('/editNote', {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ table, newNote, id })
        })
        setNewNote('')
        setEditWindow(false)
        if (name === 'books') getData('Book_Notes')
        if (name === 'movies') getData('Movie_Notes')
        if (name === 'shows') getData('Show_Notes')
    }

    const EditButtons = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                <Button
                    inverted
                    color='grey'
                    size='big'
                    style={{ marginRight: '15px' }}
                    onClick={ editMedia }
                >Submit</Button>
                <Button
                    inverted
                    color='red'
                    size='big'
                    onClick={ () => setEditWindow(false) }
                >Cancel</Button>
            </div>
        )
    }

    if (name === 'books') {
        return (
            <div className='body'>

                { loading && <Loader color={ 'rgb(202, 237, 114)' } /> }

                { editWindow && 
                    <div className='forms' style={{ position: 'fixed', border: '2px solid rgb(202, 237, 114)' }}>
                        <EditWindow newNote={ newNote } setNewNote={ setNewNote } />
                        <EditButtons />
                    </div>
                }

                { noteForm && <NoteForm
                    name='books'
                    path='/addBookNote'
                    border='2px solid rgb(202, 237, 114)'
                    titles={ bookTitles }
                    user={ userName }
                    noteForm={ noteForm }
                    setNoteForm={ setNoteForm }
                    noteShelf={ noteShelf }
                    setNoteShelf={ setNoteShelf }
                /> }

                { noteShelf && <div>
                    <Dropdown
                        border='202, 237, 114'
                        api='Book_Notes'
                        titles={ bookTitles }
                        titlePath='Book_Notes'
                        name='books'
                        getData={ getData }
                        library={ library }
                        setLibrary={ setLibrary }
                        noteForm={ noteForm }
                        setNoteForm={ setNoteForm }
                        noteShelf={ noteShelf }
                        setNoteShelf={ setNoteShelf }
                        button='olive'
                    />

                    <NoteShelf
                        name='books'
                        getData={ getData }
                        library={ library }
                        editWindow={ editWindow }
                        setEditWindow={ setEditWindow }
                        newNote={ newNote }
                        setId={ setId }
                    />
                </div> }
                <HomeButton />
                <NavTop />
                <NavBottom />
            </div>
        )
    }

    if (name === 'movies') {
        return (
            <div className='body'>

                { loading && <Loader color={ 'rgb(235, 229, 52)' } /> }

                { editWindow && 
                    <div className='forms' style={{ position: 'fixed', border: '2px solid rgb(235, 229, 52)' }}>
                        <EditWindow newNote={ newNote } setNewNote={ setNewNote } />
                        <EditButtons />
                    </div>
                }

                { noteForm && <NoteForm name='movies'
                    path='/addMovieNote'
                    border='2px solid rgb(235, 229, 52)'
                    titles={ movieTitles }
                    user={ userName }
                    noteForm={ noteForm }
                    setNoteForm={ setNoteForm }
                    noteShelf={ noteShelf }
                    setNoteShelf={ setNoteShelf }
                /> }

                { noteShelf && <div>
                    <Dropdown
                        border='235, 229, 52'
                        api='Movie_Notes'
                        titles={ movieTitles }
                        titlePath='Movie_Notes'
                        name='movies'
                        getData={ getData }
                        library={ library }
                        setLibrary={ setLibrary }
                        noteForm={ noteForm }
                        setNoteForm={ setNoteForm }
                        noteShelf={ noteShelf }
                        setNoteShelf={ setNoteShelf }
                        button='yellow'
                    />
                    <NoteShelf
                        name='movies'
                        getData={ getData }
                        library={ library }
                        editWindow={ editWindow }
                        setEditWindow={ setEditWindow }
                        newNote={ newNote }
                        setId={ setId }
                        noteShelf={ noteShelf }
                        setNoteShelf={ setNoteShelf }
                    /> 
                </div> }
                <HomeButton />
                <NavTop />
                <NavBottom />
            </div>
        )
    }

    if (name === 'shows') {
        return (
            <div className='body'>

                { loading && <Loader color={ 'rgb(242, 129, 7)' } /> }

                { editWindow && 
                    <div className='forms' style={{ position: 'fixed', border: '2px solid rgb(242, 129, 7)' }}>
                        <EditWindow newNote={ newNote } setNewNote={ setNewNote } />
                        <EditButtons />
                    </div>
                }

                { noteForm && <NoteForm
                    name='shows'
                    path='/addShowNote'
                    border='2px solid rgb(242, 129, 7)'
                    titles={ showTitles }
                    user={ userName }
                    noteForm={ noteForm }
                    setNoteForm={ setNoteForm }
                    noteShelf={ noteShelf }
                    setNoteShelf={ setNoteShelf }
                /> }

                { noteShelf && <div>
                    <Dropdown
                        border='242, 129, 7'
                        api='Show_Notes'
                        titles={ showTitles }
                        titlePath='Show_Notes'
                        name='shows'
                        getData={ getData }
                        library={ library }
                        setLibrary={ setLibrary }
                        noteForm={ noteForm }
                        setNoteForm={ setNoteForm }
                        noteShelf={ noteShelf }
                        setNoteShelf={ setNoteShelf }
                        button='orange'
                    />
                    <NoteShelf
                        name='shows'
                        getData={ getData }
                        library={ library }
                        editWindow={ editWindow }
                        setEditWindow={ setEditWindow }
                        newNote={ newNote }
                        setId={ setId }
                        noteShelf={ noteShelf }
                        setNoteShelf={ setNoteShelf }
                    />
                </div> }
                <HomeButton />
                <NavTop />
                <NavBottom />
            </div>
        )
    }
}

export default NotePage
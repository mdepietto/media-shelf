import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Icon } from 'semantic-ui-react'
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

    const userName = useAuth0().user

    const [ library, setLibrary ] = useState([])

    const [ loading, setLoading ] = useState(false)
    const [ noteForm, setNoteForm ] = useState(false)
    const [ editWindow, setEditWindow ] = useState(false)

    const [ table, setTable ] = useState('')
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
        if (props.name === 'books') {
            setTable('Book_Notes')
            getDropdown(bookTitles, setBookTitles, 'Books')
        }
        if (props.name === 'movies') {
            setTable('Movie_Notes')
            getDropdown(movieTitles, setMovieTitles, 'Movies')
        }
        if (props.name === 'shows') {
            setTable('Show_Notes')
            getDropdown(showTitles, setShowTitles, 'Shows')
        }
    }, [ bookTitles, movieTitles, showTitles, props.name, userName ])

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
    }

    if (props.name === 'books') {
        return (
            <div className='body'>

                { loading && <Loader color={ 'rgb(202, 237, 114)' } /> }

                { editWindow && 
                    <div className='editWindow'>
                        <EditWindow newNote={ newNote } setNewNote={ setNewNote } />
                        <Button onClick={ editMedia }><Link to='/'>Submit</Link></Button>
                    </div>
                }

                { noteForm && <NoteForm
                    name='books'
                    path='/addBookNote'
                    border='2px solid rgb(202, 237, 114)'
                    titles={ bookTitles }
                /> }
                <div>
                    <Dropdown
                        border='202, 237, 114'
                        api='Book_Notes'
                        titles={ bookTitles }
                        titlePath='Book_Notes'
                        name='books'
                        getData={ getData }
                        library={ library }
                        setLibrary={ setLibrary }
                    />
                    <Button
                        icon
                        circular
                        size='massive'
                        color='olive'
                        onClick={() => setNoteForm(!noteForm)}
                    >
                        <Icon name='plus' />
                    </Button>
                </div>

                <NoteShelf
                    name='books'
                    getData={ getData }
                    library={ library }
                    editWindow={ editWindow }
                    setEditWindow={ setEditWindow }
                    newNote={ newNote }
                    setId={ setId }
                />
                <HomeButton />
                <NavTop />
                <NavBottom />
            </div>
        )
    }

    if (props.name === 'movies') {
        return (
            <div className='body'>

                { loading && <Loader color={ 'rgb(235, 229, 52)' } /> }

                { editWindow && <EditWindow /> }

                { noteForm && <NoteForm name='movies'
                    path='/addMovieNote'
                    border='2px solid rgb(235, 229, 52)'
                    titles={ movieTitles }
                /> }
                <div>
                    <Dropdown
                        border='235, 229, 52'
                        api='Movie_Notes'
                        titles={ movieTitles }
                        titlePath='Movie_Notes'
                        name='movies'
                        getData={ getData }
                        library={ library }
                        setLibrary={ setLibrary }
                    />
                    <Button
                        icon
                        circular
                        size='massive'
                        color='yellow'
                        onClick={() => setNoteForm(!noteForm)}
                    >
                        <Icon name='plus' />
                    </Button>
                </div>
                <NoteShelf
                    name='movies'
                    getData={ getData }
                    library={ library }
                    editWindow={ editWindow }
                    setEditWindow={ setEditWindow }
                    newNote={ newNote }
                    setId={ setId }
                />
                <HomeButton />
                <NavTop />
                <NavBottom />
            </div>
        )
    }

    if (props.name === 'shows') {
        return (
            <div className='body'>

                { loading && <Loader color={ 'rgb(242, 129, 7)' } /> }

                { editWindow && <EditWindow /> }

                { noteForm && <NoteForm
                    name='shows'
                    path='/addShowNote'
                    border='2px solid rgb(242, 129, 7)'
                    titles={ showTitles }
                /> }
                <div>
                    <Dropdown
                        border='242, 129, 7'
                        api='Show_Notes'
                        titles={ showTitles }
                        titlePath='Show_Notes'
                        name='shows'
                        getData={ getData }
                        library={ library }
                        setLibrary={ setLibrary }
                    />
                    <Button
                        icon
                        circular
                        size='massive'
                        color='orange'
                        onClick={() => setNoteForm(!noteForm)}
                    >
                        <Icon name='plus' />
                    </Button>
                </div>
                <NoteShelf
                    name='shows'
                    getData={ getData }
                    library={ library }
                    editWindow={ editWindow }
                    setEditWindow={ setEditWindow }
                    newNote={ newNote }
                    setId={ setId }
                />
                <HomeButton />
                <NavTop />
                <NavBottom />
            </div>
        )
    }
}

export default NotePage
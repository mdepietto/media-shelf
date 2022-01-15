import React, { useEffect } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const NoteShelf = (props) => {

    const { name, getData, library } = props

    useEffect(() => {
        if (name === 'books') getData('Book_Notes')
        if (name === 'movies') getData('Movie_Notes')
        if (name === 'shows') getData('Show_Notes')
    }, [ name ])

    const deleteNote = async (api, media) => {
        await fetch('/deleteMedia', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ api, media })
        })
    }

    const confirmation = (func) => {
        if (window.confirm('Are you sure?')) {
            return func()
        }
    }
    
    // const editMedia = async (path, col, edit, id) => {
    //     await fetch(path, {
    //         method: 'POST',
    //         headers: { 'content-type': 'application/json' },
    //         body: JSON.stringify({ col, edit, id })
    //     })
    // }

    const EditButton = (props) => {
        return (
            <Button
                icon
                color='grey'
                size='tiny'
                onClick={ () => {
                    // editMedia('/editBook', props.col, 69, props.id)
                    console.log('test');
                }}
            >
                <Icon name='edit outline' />
            </Button>
        )
    }

    const DeleteButton = (props) => {
        return (
            <Link to='/'>
                <Button
                    inverted
                    color='red'
                    size='large'
                    onClick={ () => confirmation(() => deleteNote(props.api, props.note)) }
                >
                    Delete
                </Button>
            </Link>
        )
    }
    
    if (props.name === 'books') {
        return (
            library.map(note => {
                return (
                    <div className='shelf' key={ note.id } style={{ border: '2px solid rgb(202, 237, 114)' }}>
                        <p style={{ fontSize: '1.1rem' }}>{ note.note_date }</p>
                        <p style={{ margin: '.5rem' }}>Type: <i>{ note.note_type }</i></p>
                        <p style={{ margin: '.5rem' }}>Title: <i>{ note.title }</i></p>
                        <p style={{ margin: '.5rem' }}>Chapter: { note.note_chapter }</p>
                        <p style={{ margin: '.5rem' }}>Page: { note.note_page }</p>
                        <p style={{ margin: '2rem' }}>"{ note.note_body }"</p>
                        <DeleteButton api='Book_Notes' note={ note.id } />
                    </div>
                )
            })
        )
    }

    if (props.name === 'movies') {
        return (
            library.map(note => {
                return (
                    <div className='shelf' key={ note.id } style={{ border: '2px solid rgb(235, 229, 52)' }}>
                        <p style={{ fontSize: '1.1rem' }}>{ note.note_date }</p>
                        <p style={{ margin: '.5rem' }}>Type: <i>{ note.note_type }</i></p>
                        <p style={{ margin: '.5rem' }}>Title: <i>{ note.title }</i></p>
                        <p style={{ margin: '.5rem' }}>Minute: { note.note_minute }</p>
                        <p style={{ margin: '2rem' }}>"{ note.note_body }"</p>
                        <DeleteButton api='Movie_Notes' note={ note.id } />
                    </div>
                )
            })
        )
    }

    if (props.name === 'shows') {
        return (
            library.map(note => {
                return (
                    <div className='shelf' key={ note.id } style={{ border: '2px solid rgb(242, 129, 7)' }}>
                        <p style={{ fontSize: '1.1rem' }}>{ note.note_date }</p>
                        <p style={{ margin: '.5rem' }}>Type: <i>{ note.note_type }</i></p>
                        <p style={{ margin: '.5rem' }}>Title: <i>{ note.title }</i></p>
                        <p style={{ margin: '.5rem' }}>Season: { note.note_season }</p>
                        <p style={{ margin: '.5rem' }}>Episode: { note.note_episode }</p>
                        <p style={{ margin: '2rem' }}>"{ note.note_body }"</p>
                        <DeleteButton api='Show_Notes' note={ note.id } />
                    </div>
                )
            })
        )
    }
}

export default NoteShelf
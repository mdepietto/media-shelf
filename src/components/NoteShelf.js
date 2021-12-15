import React from 'react'
import { Button } from 'semantic-ui-react'

const NoteShelf = (props) => {

    var toBeDeleted = 0

    const deleteNote = async () => {
        await fetch(props.path, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ toBeDeleted })
        })
        .then(res => res.json())
    }

    const confirmation = (func) => {
        if (window.confirm('Are you sure?')) {
            return func()
        }
    }

    const DeleteButton = (props) => {
        return (
            <Button
                inverted
                color='red'
                size='large'
                onClick={ () => {
                    toBeDeleted = props.note.id
                    confirmation(deleteNote)
                    props.setNoteShelf(false)
                    props.setNotes([])
            }}>Delete</Button>
        )
    }

    
    if (props.name === 'book') {
        return (
            props.Notes.map(note => {
                return (
                    <div className='shelf' key={ note.id } style={{ border: '2px solid rgb(202, 237, 114)' }}>
                        <p style={{ fontSize: '1.1rem' }}>{ note.note_date }</p>
                        <p style={{ margin: '.5rem' }}>Type: <i>{ note.note_type }</i></p>
                        <p style={{ margin: '.5rem' }}>Title: <i>{ note.title }</i></p>
                        <p style={{ margin: '.5rem' }}>Chapter: { note.note_chapter }</p>
                        <p style={{ margin: '.5rem' }}>Page: { note.note_page }</p>
                        <p style={{ margin: '2rem' }}>"{ note.note_body }"</p>
                        <DeleteButton note={ note } setNoteShelf={ props.setNoteShelf } setNotes={ props.setNotes } />
                    </div>
                )
            })
        )
    }

    if (props.name === 'movie') {
        return (
            props.Notes.map(note => {
                return (
                    <div className='shelf' key={ note.id } style={{ border: '2px solid rgb(235, 229, 52)' }}>
                        <p style={{ fontSize: '1.1rem' }}>{ note.note_date }</p>
                        <p style={{ margin: '.5rem' }}>Type: <i>{ note.note_type }</i></p>
                        <p style={{ margin: '.5rem' }}>Title: <i>{ note.title }</i></p>
                        <p style={{ margin: '.5rem' }}>Minute: { note.note_minute }</p>
                        <p style={{ margin: '2rem' }}>"{ note.note_body }"</p>
                        <DeleteButton note={ note } setNoteShelf={ props.setNoteShelf } setNotes={ props.setNotes } />
                    </div>
                )
            })
        )
    }

    if (props.name === 'show') {
        return (
            props.Notes.map(note => {
                return (
                    <div className='shelf' key={ note.id } style={{ border: '2px solid rgb(242, 129, 7)' }}>
                        <p style={{ fontSize: '1.1rem' }}>{ note.note_date }</p>
                        <p style={{ margin: '.5rem' }}>Type: <i>{ note.note_type }</i></p>
                        <p style={{ margin: '.5rem' }}>Title: <i>{ note.title }</i></p>
                        <p style={{ margin: '.5rem' }}>Season: { note.note_season }</p>
                        <p style={{ margin: '.5rem' }}>Episode: { note.note_episode }</p>
                        <p style={{ margin: '2rem' }}>"{ note.note_body }"</p>
                        <DeleteButton note={ note } setNoteShelf={ props.setNoteShelf } setNotes={ props.setNotes } />
                    </div>
                )
            })
        )
    }
}

export default NoteShelf
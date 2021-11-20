import React from 'react'
import { Button } from 'semantic-ui-react'

const BookNoteShelf = (props) => {

    var toBeDeleted = 0

    const deleteBookNote = async () => {
        await fetch('/deleteBookNote', {
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

    return (
        props.bookNotes.map(note => {
            return (
                <div className='shelf' key={ note.id } style={{ border: '2px solid rgb(202, 237, 114)' }}>
                    <p style={{ fontSize: '1.1rem' }}>{ note.note_date }</p>
                    <p style={{ margin: '.5rem' }}><i>{ note.note_type }</i> for <i>{ note.title }</i> on page { note.note_page }</p>
                    <p>"{ note.note_body }"</p>
                    <Button
                        inverted
                        color='red'
                        size='large'
                        onClick={ () => {
                            toBeDeleted = note.id
                            confirmation(deleteBookNote)
                            props.setBookNoteShelf(false)
                            props.setBookNotes([])
                    }}>Delete</Button>
                </div>
            )
        })
    )
}

export default BookNoteShelf
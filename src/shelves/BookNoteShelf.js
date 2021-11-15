import React from 'react'

const BookNoteShelf = (props) => {

    var toBeDeleted = 0

    const deleteBookNote = async () => {
        await fetch('/deleteBookNote', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ toBeDeleted })
        })
        .then(res => res.json())
        window.location.reload()
    }

    const confirmation = (func) => {
        if (window.confirm('Are you sure?')) {
            return func()
        }
    }

    return (
        props.bookNotes.map(note => {
            return (
                <div className='shelf' key={ note.id }>
                    <p>Created on: { note.note_date }</p>
                    <p>{ note.note_type } for '{ note.title }' on { note.note_page } page</p>
                    <p>'{ note.note_body }'</p>
                    <button
                        className='ui red button tiny'
                        onClick={ () => {
                            toBeDeleted = note.id
                            confirmation(deleteBookNote)
                            window.location.reload()
                    }}>Delete</button>
                </div>
            )
        })
    )
}

export default BookNoteShelf
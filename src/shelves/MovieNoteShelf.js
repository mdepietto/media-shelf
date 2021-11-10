import React from 'react'

const MovieNoteShelf = (props) => {

    var toBeDeleted = 0

    const deleteMovieNote = async () => {
        await fetch('/deleteMovieNote', {
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
        props.notes.map(note => {
            return (
                <div className='shelf' key={ note.id }>
                    <p>Created on: { note.note_date }</p>
                    <p>{ note.note_type } for '{ note.title }' at { note.note_minute } minutes</p>
                    <p>'{ note.note_body }'</p>
                    <button
                        className='ui red button tiny'
                        onClick={ () => {
                            toBeDeleted = note.id
                            confirmation(deleteMovieNote)
                            window.location.reload()
                    }}>Delete</button>
                </div>
            )
        })
    )
}

export default MovieNoteShelf
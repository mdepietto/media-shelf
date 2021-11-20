import React from 'react'
import { Button } from 'semantic-ui-react'

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
        props.movieNotes.map(note => {
            return (
                <div className='shelf' key={ note.id } style={{ border: '2px solid rgb(235, 229, 52)' }}>
                    <p style={{ fontSize: '1.1rem' }}>{ note.note_date }</p>
                    <p style={{ margin: '.5rem' }}><i>{ note.note_type }</i> for <i>{ note.title }</i> at { note.note_minute } minutes</p>
                    <p>"{ note.note_body }"</p>
                    <Button
                        inverted
                        color='red'
                        size='large'
                        onClick={ () => {
                            toBeDeleted = note.id
                            confirmation(deleteMovieNote)
                            window.location.reload()
                    }}>Delete</Button>
                </div>
            )
        })
    )
}

export default MovieNoteShelf
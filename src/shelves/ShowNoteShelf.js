import React from 'react'

const ShowNoteShelf = (props) => {

    var toBeDeleted = 0

    const deleteShowNote = async () => {
        await fetch('/deleteShowNote', {
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
        props.showNotes.map(note => {
            return (
                <div className='shelf' key={ note.id }>
                    <p>Created on: { note.note_date }</p>
                    <p>{ note.note_type } for '{ note.title }' for episode { note.note_episode } season { note.note_season }</p>
                    <p>'{ note.note_body }'</p>
                    <button
                        className='ui red inverted button tiny'
                        onClick={ () => {
                            toBeDeleted = note.id
                            confirmation(deleteShowNote)
                            window.location.reload()
                    }}>Delete</button>
                </div>
            )
        })
    )
}

export default ShowNoteShelf
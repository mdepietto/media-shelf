import React from 'react'
import { Button } from 'semantic-ui-react'

const ShowNoteShelf = (props) => {

    var toBeDeleted = 0

    const deleteShowNote = async () => {
        await fetch('/deleteShowNote', {
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
        props.showNotes.map(note => {
            return (
                <div className='shelf' key={ note.id } style={{ border: '2px solid rgb(242, 129, 7)' }}>
                    <p style={{ fontSize: '1.1rem' }}>{ note.note_date }</p>
                    <p style={{ margin: '.5rem' }}><i>{ note.note_type }</i> for <i>{ note.title }</i> for episode <i>{ note.note_episode }</i> season { note.note_season }</p>
                    <p>"{ note.note_body }"</p>
                    <Button
                        inverted
                        color='red'
                        size='large'
                        onClick={ () => {
                            toBeDeleted = note.id
                            confirmation(deleteShowNote)
                            props.setShowNoteShelf(false)
                            props.setShowNotes([])
                    }}>Delete</Button>
                </div>
            )
        })
    )
}

export default ShowNoteShelf
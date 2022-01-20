import React, { useEffect } from 'react'
import { Button } from 'semantic-ui-react'

const NoteShelf = (props) => {

    const { name, getData, library, editWindow, setEditWindow, setId, setNewNote } = props

    useEffect(() => {
        if (name === 'books') getData('Book_Notes')
        if (name === 'movies') getData('Movie_Notes')
        if (name === 'shows') getData('Show_Notes')
    }, [ name ])

    const deleteNote = async (api, media) => {
        await fetch('/deleteMedia', {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ api, media })
        })
        getData(api)
    }

    const confirmation = (func) => {
        if (window.confirm('Are you sure?')) {
            return func()
        }
    }

    const EditButton = (props) => {
        const { id, body } = props
        return (
            <Button
                inverted
                color='grey'
                size='big'
                onClick={ () => {
                    setId(id)
                    setNewNote(body)
                    setEditWindow(!editWindow)
                }}
            >
                Edit
            </Button>
        )
    }

    const DeleteButton = (props) => {
        const { api, note } = props
        return (
            <Button inverted color='red' size='big'
                onClick={ () => confirmation(() => deleteNote(api, note)) }
            >
                Delete
            </Button>
        )
    }
    
    if (name === 'books') {
        return (
            library.map(note => {
                return (
                    <div className='shelf' key={ note.id } style={{ border: '2px solid rgb(202, 237, 114)' }}>
                        <p>{ note.note_date }</p>
                        <p>Type: <i>{ note.note_type }</i></p>
                        <p>Title: <i>{ note.title }</i></p>
                        <p>Chapter: { note.note_chapter }</p>
                        <p>Page: { note.note_page }</p>
                        <p>"{ note.note_body }"</p>
                        <EditButton id={ note.id } body={ note.note_body } />
                        <DeleteButton api='Book_Notes' note={ note.id } />
                    </div>
                )
            })
        )
    }

    if (name === 'movies') {
        return (
            library.map(note => {
                return (
                    <div className='shelf' key={ note.id } style={{ border: '2px solid rgb(235, 229, 52)' }}>
                        <p>{ note.note_date }</p>
                        <p>Type: <i>{ note.note_type }</i></p>
                        <p>Title: <i>{ note.title }</i></p>
                        <p>Minute: { note.note_minute }</p>
                        <p>"{ note.note_body }"</p>
                        <EditButton id={ note.id } body={ note.note_body } />
                        <DeleteButton api='Movie_Notes' note={ note.id } />
                    </div>
                )
            })
        )
    }

    if (name === 'shows') {
        return (
            library.map(note => {
                return (
                    <div className='shelf' key={ note.id } style={{ border: '2px solid rgb(242, 129, 7)' }}>
                        <p>{ note.note_date }</p>
                        <p>Type: <i>{ note.note_type }</i></p>
                        <p>Title: <i>{ note.title }</i></p>
                        <p>Season: { note.note_season }</p>
                        <p>Episode: { note.note_episode }</p>
                        <p>"{ note.note_body }"</p>
                        <EditButton id={ note.id } body={ note.note_body } />
                        <DeleteButton api='Show_Notes' note={ note.id } />
                    </div>
                )
            })
        )
    }
}

export default NoteShelf
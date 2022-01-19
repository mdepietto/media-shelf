import React, { useEffect } from 'react'
import { Button } from 'semantic-ui-react'

const NoteShelf = (props) => {

    const { name, getData, library, editWindow, setEditWindow, setId } = props

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
        const { id } = props
        return (
            <Button
                inverted
                color='grey'
                size='big'
                style={{ marginRight: '15px' }}
                onClick={ () => {
                    setId(id)
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
            <Button
                inverted
                color='red'
                size='big'
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
                        <p style={{ fontSize: '1.1rem' }}>{ note.note_date }</p>
                        <p style={{ margin: '.5rem' }}>Type: <i>{ note.note_type }</i></p>
                        <p style={{ margin: '.5rem' }}>Title: <i>{ note.title }</i></p>
                        <p style={{ margin: '.5rem' }}>Chapter: { note.note_chapter }</p>
                        <p style={{ margin: '.5rem' }}>Page: { note.note_page }</p>
                        <p style={{ margin: '1.5rem' }}>"{ note.note_body }"</p>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <EditButton id={ note.id } />
                            <DeleteButton api='Book_Notes' note={ note.id } />
                        </div>
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
                        <p style={{ fontSize: '1.1rem' }}>{ note.note_date }</p>
                        <p style={{ margin: '.5rem' }}>Type: <i>{ note.note_type }</i></p>
                        <p style={{ margin: '.5rem' }}>Title: <i>{ note.title }</i></p>
                        <p style={{ margin: '.5rem' }}>Minute: { note.note_minute }</p>
                        <p style={{ margin: '1.5rem' }}>"{ note.note_body }"</p>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <EditButton id={ note.id } />
                            <DeleteButton api='Movie_Notes' note={ note.id } />
                        </div>
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
                        <p style={{ fontSize: '1.1rem' }}>{ note.note_date }</p>
                        <p style={{ margin: '.5rem' }}>Type: <i>{ note.note_type }</i></p>
                        <p style={{ margin: '.5rem' }}>Title: <i>{ note.title }</i></p>
                        <p style={{ margin: '.5rem' }}>Season: { note.note_season }</p>
                        <p style={{ margin: '.5rem' }}>Episode: { note.note_episode }</p>
                        <p style={{ margin: '1.5rem' }}>"{ note.note_body }"</p>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <EditButton id={ note.id } />
                            <DeleteButton api='Show_Notes' note={ note.id } />
                        </div>
                    </div>
                )
            })
        )
    }
}

export default NoteShelf
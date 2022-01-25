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
            <Button inverted color='grey' size='big'
                style={{ marginRight: '15px' }}
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
                            <h4>{ note.note_date }</h4>
                        <ul>
                            <li>Type:<p>{ note.note_type }</p></li>
                            <li>Title:<p>{ note.title }</p></li>
                            <li>Chapter:<p>{ note.note_chapter }</p></li>
                            <li>Page:<p>{ note.note_page }</p></li>
                        </ul>
                        <p>"{ note.note_body }"</p>
                        <div>
                            <EditButton id={ note.id } body={ note.note_body } />
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
                        <h4>{ note.note_date }</h4>
                        <ul>
                            <li>Type:<p>{ note.note_type }</p></li>
                            <li>Title:<p>{ note.title }</p></li>
                            <li>Minute:<p>{ note.note_minute }</p></li>
                        </ul>
                        <p>"{ note.note_body }"</p>
                        <div>
                            <EditButton id={ note.id } body={ note.note_body } />
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
                        <h4>{ note.note_date }</h4>
                        <ul>
                            <li>Type:<p>{ note.note_type }</p></li>
                            <li>Title:<p>{ note.title }</p></li>
                            <li>Season:<p>{ note.note_season }</p></li>
                            <li>Episode:<p>{ note.note_episode }</p></li>
                        </ul>
                        <p>"{ note.note_body }"</p>
                        <div>
                            <EditButton id={ note.id } body={ note.note_body } />
                            <DeleteButton api='Show_Notes' note={ note.id } />
                        </div>
                    </div>
                )
            })
        )
    }
}

export default NoteShelf
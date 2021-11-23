import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'

const Dropdown = (props) => {

    const [ notesFor, setNotesFor ] = useState('')

    const getAll = async (title, path, setPath, setPathFor) => {
        if (title === 'All') {
            const newData = await path()
            newData.map(media => {
                media.note_date = media.note_date.slice(0, 10)
                return setPath(prev => [ ...prev, media ])
            })
            setPathFor(title)
            return setPath(newData)
        }
    }

    const getNotesByTitle = async (title, path, noteLib, noteFor) => {
        noteLib([])
        const newData = await fetch(path, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ title })
        })
        .then(res => res.json())
        newData.map(media => {
            media.note_date = media.note_date.slice(0, 10)
            return noteLib(prev => [ ...prev, media ])
        })
        noteFor(title)
    }

    return (
        <div className='selectDrop' style={{ border: `2px solid rgb(${ props.border })` }}>
            <Form style={{ display: 'flex', flexDirection: 'row' }}>
                <Form.Group width='equal'>
                    <Form.Select
                        options={ props.options }
                        name={ props.name }
                        placeholder={ props.placeholder}
                        onChange={ async (e) => {
                            var text = e.target.innerText
                            var newTitle = text.replace(/'/g, "''")
                            props.set([])
                            getAll(text, props.api, props.set, setNotesFor)
                            getNotesByTitle(newTitle, props.path, props.set, setNotesFor)
                        }}
                    />
                </Form.Group>
            </Form>
            <h3 style={{ margin: '0 0 6px 0', fontFamily: "'Montagu Slab', serif" }}>Showing { props.name } notes for:</h3>
            <p style={{ margin: '0' }}>{ notesFor }</p>
        </div>
    )
}

export default Dropdown
import React, { useState, useEffect } from 'react'
import { Form } from 'semantic-ui-react'
import Loader from './Loader';

const Dropdown = (props) => {

    const [ loading, setLoading ] = useState(false)

    const [ notesFor, setNotesFor ] = useState('')

    const [ openSort, setOpenSort ] = useState(false)

    const [ options, setOptions ] = useState([
        { key: 0, text: 'Type', value: 0 },
        { key:1, text: 'Chapter', value: 1 }
    ])

    useEffect(() => {
        if (props.name === 'movie') {
            setOptions([
                { key: 0, text: 'Type', value: 0 },
                { key:1, text: 'Minute', value: 1 }
            ])
            return
        }
        if (props.name === 'show') {
            setOptions([
                { key: 0, text: 'Type', value: 0 },
                { key:1, text: 'Season', value: 1 }
            ])
            return
        }
    }, [ props ])

    const userName = props.userName

    const newLib = (newData) => {
        props.set([])
        newData.map(media => {
            media.note_date = media.note_date.slice(0, 10)
            return props.set(prev => [ ...prev, media ])
        })
    }

    const getNotesByTitle = async (title) => {
        setLoading(true)
        props.set([])
        setNotesFor(title)
        if (!title || title === 'All') {
            await props.getContent(props.api, props.set)
            setOpenSort(false)
            setLoading(false)
            return
        }
        if (!title || title === 'All') return
        setOpenSort(true)
        const newData = await fetch(props.path, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ title, userName })
        })
        .then(res => res.json())
        newLib(newData)
        setLoading(false)
    }

    const onSort = async (e) => {
        setLoading(true)
        const { innerText } = e.target
        if (!innerText) {
            getNotesByTitle(notesFor)
        }
        if (innerText === 'Chapter'){
            const newData = props.noteLibrary.sort((a, b) => (a.note_chapter < b.note_chapter) ? 1 : -1)
            newLib(newData)
        }
        if (innerText === 'Minute'){
            const newData = props.noteLibrary.sort((a, b) => (a.note_minute > b.note_minute) ? 1 : -1)
            newLib(newData)
        }
        if (innerText === 'Season'){
            const newData = props.noteLibrary.sort((a, b) => (a.note_season > b.note_season) ? 1 : -1)
            newLib(newData)
        }
        if (innerText === 'Type'){
            const newData = props.noteLibrary.sort((a, b) => (a.note_type > b.note_type) ? 1 : -1)
            newLib(newData)
        }
        setLoading(false)
    }

    return (
        <div className='selectDrop' style={{ border: `2px solid rgb(${ props.border })` }}>

        { loading && <Loader color={ `rgb(${ props.border })` } loading={ loading } /> }
        
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h3 style={{ fontFamily: "'Montagu Slab', serif" }}>Showing { props.name } notes for:</h3>
                <Form>
                    <Form.Group width='equal'>
                        <Form.Select
                            clearable
                            options={ props.options }
                            name={ props.name }
                            placeholder={ props.placeholder}
                            onChange={ async (e) => {
                                var text = e.target.innerText
                                var newTitle = text.replace(/'/g, "''")
                                getNotesByTitle(newTitle)
                            }}
                        />
                    </Form.Group>
                </Form>
            </div>

            { openSort &&
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h3 style={{ fontFamily: "'Montagu Slab', serif" }}>Sorted by:</h3>
                    <Form>
                        <Form.Group width='equal'>
                            <Form.Select
                                clearable
                                options={ options }
                                name='sortNotes'
                                placeholder='Sort by'
                                onChange={ onSort }
                            />
                        </Form.Group>
                    </Form>
                </div>
            }
        </div>
    )
}

export default Dropdown
import React, { useState, useEffect } from 'react'
import { Form } from 'semantic-ui-react'
import PropagateLoader from "react-spinners/PropagateLoader";
import { css } from "@emotion/react";

const Dropdown = (props) => {

    const [ loading, setLoading ] = useState(false)

    const override = css`
        position: fixed;
        top: 50%;
        left: 50%;
    `

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

    const getAll = async (title, path, setPath, setPathFor) => {
        setOpenSort(false)
        setLoading(true)
        if (title === 'All') {
            const newData = await path()
            newData.map(media => {
                media.note_date = media.note_date.slice(0, 10)
                return setPath(prev => [ ...prev, media ])
            })
            setPathFor(title)
            setPath(newData)
        }
        setLoading(false)
    }

    const getNotesByTitle = async (title, path, noteLib) => {
        setLoading(true)
        setNotesFor(title)
        await props.set([])
        if (!title) {
            getAll('All', props.api, props.set, setNotesFor)
            return
        }
        if (title === 'All') {
            setOpenSort(false)
            return
        }
        setOpenSort(true)
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
        if (notesFor !== 'All') setOpenSort(true)
        setLoading(false)
    }

    const getNotesBySort = async (path) => {
        setLoading(true)
        const newData = await fetch(path, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ notesFor })
        })
        .then(res => res.json())
        newData.map(media => {
            media.note_date = media.note_date.slice(0, 10)
            return props.set(prev => [ ...prev, media ])
        })
        setLoading(false)
    }

    const onSort = async (e) => {
        setLoading(true)
        props.set([])
        const { innerText } = e.target
        if (!innerText) {
            getNotesByTitle(notesFor, props.path, props.set)
        }
        if (props.name === 'book') {
            if (innerText === 'Type') await getNotesBySort('/booksByType')
            if (innerText === 'Chapter') await getNotesBySort('/booksByChapter')
        }
        if (props.name === 'movie') {
            if (innerText === 'Type') await getNotesBySort('/moviesByType')
            if (innerText === 'Minute') await getNotesBySort('/moviesByMinute')
        }
        if (props.name === 'show') {
            if (innerText === 'Type') await getNotesBySort('/showsByType')
            if (innerText === 'Season') await getNotesBySort('/showsBySeason')
        }
        setLoading(false)
    }

    return (
        <div className='selectDrop' style={{ border: `2px solid rgb(${ props.border })` }}>

        { loading && <PropagateLoader color={ `rgb(${ props.border })` } css={ override } loading={ loading } size={ 30 } /> }
        
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
                                props.set([])
                                getAll(text, props.api, props.set, setNotesFor)
                                getNotesByTitle(newTitle, props.path, props.set)
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
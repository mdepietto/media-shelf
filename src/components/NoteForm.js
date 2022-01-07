import React, { useState } from 'react'
import { Form, Input, TextArea, Button } from 'semantic-ui-react'

function NoteForm(props) {

    const userName = props.userName.name

    const [ data, setData ] = useState({ note_chapter: null, note_page: null, note_minute: null, note_episode: null, note_season: null, name: userName })

    var noAll = [ ...props.lib ]
    noAll.shift()

    const optionsNote = [
        { key: 1, text: 'Note', value: 1 },
        { key: 2, text: 'Quote', value: 2 },
        { key: 3, text: 'Summary', value: 3 }
    ]

    const handleChange = (e) => {
        const { name, value } = e.target
        if ( name === 'note_chapter' || name === 'note_page') {
            setData(prev => ({
                ...prev,
                [ name ]: parseInt(value)
            }))
            return
        }
        setData(prev => ({
            ...prev,
            [ name ]: value
        }))
    }

    const getType = (e) => {
        const { innerText } = e.target
        setData(prev => ({
            ...prev,
            note_type: innerText
        }))
    }

    const getTitle = (e) => {
        const { innerText } = e.target
        setData(prev => ({
            ...prev,
            title: innerText
        }))
    }

    const sqlApostrophe = () => {
        const newBody = data.note_body.replace(/'/g, "''")
        const newTitle = data.title.replace(/'/g, "''")
        const newName = data.name.replace(/'/g, "''")
        data.note_body = newBody
        data.title = newTitle
        data.name = newName
    }

    var addNote = async () => {
        await fetch(props.path, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ ...data })
        })
        .then(res => res.json())
    }

    var pos = {
        border: props.border,
        position: 'fixed'
    }

    if (window.screen.width <= 1300) {
        pos = {
            border: props.border,
            position: 'static'
        }
    }

    const EndButtons = (props) => {
        return (
            <div className='endButtons'>
                <Button
                    inverted
                    color='violet'
                    size='large'
                    style={{ margin: '15px 0' }}
                    onClick={ () => {
                        sqlApostrophe()
                        addNote()
                        setData({ note_chapter: null, note_page: null, note_minute: null, note_episode: null, note_season: null, name: userName })
                        props.setNoteForm(false)
                        props.setNotes([])
                        alert('Note added!')
                }}>Submit</Button>
                <Button
                    inverted
                    color='red'
                    size='large'
                    onClick={ () => {
                        setData({ note_chapter: null, note_page: null, note_minute: null, note_episode: null, note_season: null, name: userName })
                        props.setNoteForm(false)
                        alert('Note discarded')
                }}>Cancel</Button>
            </div>
        )
    }

    if (props.name === 'book') {
        return (
            <Form className='mediaForm'
                inverted
                style={ pos }>
                <Form.Group width='equal' style={{ display: 'flex', flexDirection: 'column' }}>
                    <Form.Select
                        label='Book'
                        options={ noAll }
                        name='title'
                        placeholder='Book'
                        onChange={ getTitle }
                        required
                    />
                    <br />
                    <Form.Field
                        control={ Input }
                        type='number'
                        min={ 1 }
                        label='Chapter'
                        name='note_chapter'
                        placeholder='#'
                        onChange={ handleChange }
                    />
                    <br />
                    <Form.Field
                        control={ Input }
                        type='number'
                        min={ 1 }
                        label='Page'
                        name='note_page'
                        placeholder='#'
                        onChange={ handleChange }
                    />
                    <br />
                    <Form.Select
                        label='Type of Note'
                        options={ optionsNote }
                        name='note_type'
                        placeholder='Note'
                        onChange={ getType }
                        required
                    />
                </Form.Group>
                <Form.Field
                    style={{ height: '10rem' }}
                    control={ TextArea }
                    label='Your Note'
                    name='note_body'
                    onChange={ handleChange }
                    required
                />
                <EndButtons setNotes={ props.setNotes } setNoteForm={ props.setNoteForm } />
            </Form>
        )
    }

    if (props.name === 'movie') {
        return (
            <Form className='mediaForm'
                inverted
                style={ pos }>
                <Form.Group width='equal' style={{ display: 'flex', flexDirection: 'column' }}>
                    <Form.Select
                        label='Movie'
                        options={ noAll }
                        name='title'
                        placeholder='Movie'
                        onChange={ getTitle }
                        required
                    />
                    <br />
                    <Form.Field
                        control={ Input }
                        type='number'
                        min={ 1 }
                        label='Minute'
                        name='note_minute'
                        placeholder='#'
                        onChange={ handleChange }
                    />
                    <br />
                    <Form.Select
                        label='Type of Note'
                        options={ optionsNote }
                        name='note_type'
                        placeholder='Note'
                        onChange={ getType }
                        required
                    />
                </Form.Group>
                <Form.Field
                    style={{ height: '10rem' }}
                    control={ TextArea }
                    label='Your Note'
                    name='note_body'
                    onChange={ handleChange }
                    required
                />
                <EndButtons setNotes={ props.setNotes } setNoteForm={ props.setNoteForm } />
            </Form>
        )
    }

    if (props.name === 'show') {
        return (
            <Form className='mediaForm'
                inverted
                style={ pos }>
                <Form.Group width='equal' style={{ display: 'flex', flexDirection: 'column' }}>
                    <Form.Select
                        label='Show'
                        options={ noAll }
                        name='title'
                        placeholder='Show'
                        onChange={ getTitle }
                        required
                    />
                    <br />
                    <Form.Field
                        control={ Input }
                        type='number'
                        min={ 1 }
                        label='Episode'
                        name='note_episode'
                        placeholder='#'
                        onChange={ handleChange }
                    />
                    <br />
                    <Form.Field
                        control={ Input }
                        type='number'
                        min={ 1 }
                        label='Season'
                        name='note_season'
                        placeholder='#'
                        onChange={ handleChange }
                    />
                    <br />
                    <Form.Select
                        label='Type of Note'
                        options={ optionsNote }
                        name='note_type'
                        placeholder='Note'
                        onChange={ getType }
                        required
                    />
                </Form.Group>
                <Form.Field
                    style={{ height: '10rem' }}
                    control={ TextArea }
                    label='Your Note'
                    name='note_body'
                    onChange={ handleChange }
                    required
                />
                <EndButtons setNotes={ props.setNotes } setNoteForm={ props.setNoteForm } />
            </Form>
        )
    }
}

export default NoteForm
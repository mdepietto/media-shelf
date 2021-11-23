import React, { useState } from 'react'
import { Form, Input, TextArea, Button } from 'semantic-ui-react'

function NoteForm(props) {

    const [ data, setData ] = useState([])

    var noAll = [ ...props.lib ]
    noAll.shift()

    const optionsNote = [
        { key: 1, text: 'Note', value: 1 },
        { key: 2, text: 'Quote', value: 2 },
        { key: 3, text: 'Summary', value: 3 }
    ]

    const handleChange = (e) => {
        const { name, value } = e.target
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
        data.note_body = newBody
        const newTitle = data.title.replace(/'/g, "''")
        data.title = newTitle
    }

    var addNote = async () => {
        await fetch(props.path, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ ...data })
        })
        .then(res => res.json())
    }

    const NoteType = () => {
        return (
            <Form.Select
                label='Type of Note'
                options={ optionsNote }
                name='note_type'
                placeholder='Note'
                onChange={ getType }
            />
        )
    }

    const NoteBody = () => {
        return (
            <Form.Field
                style={{ height: '10rem' }}
                control={ TextArea }
                label='Your Note'
                name='note_body'
                onChange={ handleChange }
            />
        )
    }

    const EndButtons = (props) => {
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Button
                    inverted
                    color='violet'
                    size='large'
                    style={{ margin: '15px 0' }}
                    onClick={ () => {
                        sqlApostrophe()
                        addNote()
                        setData([])
                        props.setNoteForm(false)
                        props.setNotes([])
                        alert('Note added!')
                }}>Submit</Button>
                <Button
                    inverted
                    color='red' 
                    size='large'
                    onClick={ () => {
                        setData([])
                        props.setNoteForm(false)
                        alert('Note discarded')
                }}>Cancel</Button>
            </div>
        )
    }

    if (props.name === 'book') {
        return (
            <Form className='noteForm' inverted style={{ border: '2px solid rgb(202, 237, 114)' }}>
                <Form.Group width='equal' style={{ display: 'flex', flexDirection: 'column' }}>
                    <Form.Select
                        label='Book'
                        options={ noAll }
                        name='title'
                        placeholder='Book'
                        onChange={ getTitle }
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
                    <NoteType />
                </Form.Group>
                <NoteBody />
                <EndButtons setNotes={ props.setNotes } setNoteForm={ props.setNoteForm } />
            </Form>
        )
    }

    if (props.name === 'movie') {
        return (
            <Form className='noteForm' inverted style={{ border: '2px solid rgb(235, 229, 52)' }}>
                <Form.Group width='equal' style={{ display: 'flex', flexDirection: 'column' }}>
                    <Form.Select
                        label='Movie'
                        options={ noAll }
                        name='title'
                        placeholder='Movie'
                        onChange={ getTitle }
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
                    <NoteType />
                </Form.Group>
                <NoteBody />
                <EndButtons setNotes={ props.setNotes } setNoteForm={ props.setNoteForm } />
            </Form>
        )
    }

    if (props.name === 'show') {
        return (
            <Form className='noteForm' inverted style={{ border: '2px solid rgb(242, 129, 7)' }}>
                <Form.Group width='equal' style={{ display: 'flex', flexDirection: 'column' }}>
                    <Form.Select
                        label='Show'
                        options={ noAll }
                        name='title'
                        placeholder='Show'
                        onChange={ getTitle }
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
                    <NoteType />
                </Form.Group>
                <NoteBody />
                <EndButtons setNotes={ props.setNotes } setNoteForm={ props.setNoteForm } />
            </Form>
        )
    }
}

export default NoteForm
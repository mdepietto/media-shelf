import React, { useState } from 'react'
import { Form, Input, TextArea, Button } from 'semantic-ui-react'

function ShowNote(props) {

    const [ data, setData ] = useState({ title: '', note_episode: 0, note_season: 0, note_type: '', note_body: '' })

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

    var addShowNote = async () => {
        await fetch('/addShowNote', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ ...data })
        })
        .then(res => res.json())
    }

    return (
        <Form className='noteForm' inverted style={{ border: '2px solid rgb(242, 129, 7)' }}>
            <Form.Group width='equal' style={{ display: 'flex', flexDirection: 'column' }}>
                <Form.Select
                    label='Show'
                    options={ props.shows }
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
                <Form.Select
                    label='Type of Note'
                    options={ optionsNote }
                    name='note_type'
                    placeholder='Note'
                    onChange={ getType }
                />
            </Form.Group>
            <Form.Field
                style={{ height: '10rem' }}
                control={ TextArea }
                label='Your Note'
                name='note_body'
                onChange={ handleChange }
            />
            <Button
                inverted
                color='violet'
                size='large'
                style={{ margin: '15px 0' }}
                onClick={ () => {
                    sqlApostrophe()
                    addShowNote()
                    setData({ title: '', note_episode: 0, note_season: 0, note_type: '', note_body: '' })
                    props.setShowNoteForm(false)
                    props.setShowNotes([])
                    alert('Note added!')
                }}>Submit</Button>
            <Button
                inverted
                color='red'
                size='large'
                onClick={ () => {
                    setData({ title: '', note_episode: 0, note_season: 0, note_type: '', note_body: '' })
                    setData({ title: '', note_minute: 0, note_type: '', note_body: '' })
                    props.setShowNoteForm(false)
                    alert('Note discarded')
                }}>Cancel</Button>
        </Form>
    )
}

export default ShowNote
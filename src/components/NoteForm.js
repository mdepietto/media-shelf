import React, { useState } from 'react'
import { Form, Input, TextArea, Button } from 'semantic-ui-react'

function NoteForm(props) {

    const { name, path, border, titles, user, noteForm, setNoteForm, noteShelf, setNoteShelf } = props
    const userName = user.name

    const [ data, setData ] = useState({ note_chapter: null, note_page: null, note_minute: null, note_episode: null, note_season: null, name: userName })

    const noAll = [ ...titles ]
    noAll.shift()

    const optionsNote = [
        { key: 1, text: 'Note', value: 1 },
        { key: 2, text: 'Quote', value: 2 },
        { key: 3, text: 'Summary', value: 3 }
    ]

    var addNote = async () => {
        await fetch(path, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ ...data })
        })
    }

    const EndButtons = () => {
        return (
            <div className='subAndCancel'>
                <Button
                    inverted
                    color='grey'
                    size='big'
                    style={{ marginRight: '15px' }}
                    onClick={ async () => {
                        await addNote()
                        setNoteShelf(!noteShelf)
                        setNoteForm(!noteForm)
                        setData({ note_chapter: null, note_page: null, note_minute: null, note_episode: null, note_season: null, name: userName })
                    }}
                >
                    Submit
                </Button>
                <Button
                    inverted
                    color='red'
                    size='big'
                    onClick={ () => {
                        setNoteShelf(!noteShelf)
                        setNoteForm(!noteForm)
                        setData({ note_chapter: null, note_page: null, note_minute: null, note_episode: null, note_season: null, name: userName })
                    }}
                >
                    Cancel
                </Button>
            </div>
        )
    }

    if (name === 'books') {
        return (
            <Form className='forms' inverted size='huge' style={{ position: 'fixed', border: border }}>
                <Form.Group style={{ display: 'flex', flexDirection: 'column' }} width='equal'>
                    <Form.Select
                        options={ noAll }
                        name='title'
                        placeholder='Book'
                        onChange={ (e) => setData(prev => ({ ...prev, title: e.target.innerText })) }
                        required
                    />
                    <br />
                    <Form.Field
                        control={ Input }
                        type='number'
                        min={ 1 }
                        name='note_chapter'
                        placeholder='Chapter'
                        onChange={ (e) => setData(prev => ({ ...prev, [ e.target.name ]: e.target.value })) }
                    />
                    <br />
                    <Form.Field
                        control={ Input }
                        type='number'
                        min={ 1 }
                        name='note_page'
                        placeholder='Page'
                        onChange={ (e) => setData(prev => ({ ...prev, [ e.target.name ]: e.target.value })) }
                    />
                    <br />
                    <Form.Select
                        options={ optionsNote }
                        name='note_type'
                        placeholder='Note Type'
                        onChange={ (e) => setData(prev => ({ ...prev, note_type: e.target.innerText })) }
                        required
                    />
                </Form.Group>
                <Form.Field
                    style={{ height: '10rem' }}
                    control={ TextArea }
                    placeholder='Your Note...'
                    name='note_body'
                    onChange={ (e) => setData(prev => ({ ...prev, [ e.target.name ]: e.target.value })) }
                    required
                />
                <EndButtons />
            </Form>
        )
    }

    if (name === 'movies') {
        return (
            <Form className='forms' inverted size='huge' style={{ position: 'fixed', border: border }}>
                <Form.Group style={{ display: 'flex', flexDirection: 'column' }} width='equal'>
                    <Form.Select
                        options={ noAll }
                        name='title'
                        placeholder='Movie'
                        onChange={ (e) => setData(prev => ({ ...prev, title: e.target.innerText })) }
                        required
                    />
                    <br />
                    <Form.Field
                        control={ Input }
                        type='number'
                        min={ 1 }
                        name='note_minute'
                        placeholder='Minute'
                        onChange={ (e) => setData(prev => ({ ...prev, [ e.target.name ]: e.target.value })) }
                    />
                    <br />
                    <Form.Select
                        options={ optionsNote }
                        name='note_type'
                        placeholder='Note Type'
                        onChange={ (e) => setData(prev => ({ ...prev, note_type: e.target.innerText })) }
                        required
                    />
                </Form.Group>
                <Form.Field
                    style={{ height: '10rem' }}
                    control={ TextArea }
                    placeholder='Your Note...'
                    name='note_body'
                    onChange={ (e) => setData(prev => ({ ...prev, [ e.target.name ]: e.target.value })) }
                    required
                />
                <EndButtons />
            </Form>
        )
    }

    if (name === 'shows') {
        return (
            <Form className='forms' inverted size='huge' style={{ position: 'fixed', border: border }}>
                <Form.Group style={{ display: 'flex', flexDirection: 'column' }} width='equal'>
                    <Form.Select
                        options={ noAll }
                        name='title'
                        placeholder='Show'
                        onChange={ (e) => setData(prev => ({ ...prev, title: e.target.innerText })) }
                        required
                    />
                    <br />
                    <Form.Field
                        control={ Input }
                        type='number'
                        min={ 1 }
                        name='note_episode'
                        placeholder='Episode'
                        onChange={ (e) => setData(prev => ({ ...prev, [ e.target.name ]: e.target.value })) }
                    />
                    <br />
                    <Form.Field
                        control={ Input }
                        type='number'
                        min={ 1 }
                        name='note_season'
                        placeholder='Season'
                        onChange={ (e) => setData(prev => ({ ...prev, [ e.target.name ]: e.target.value })) }
                    />
                    <br />
                    <Form.Select
                        options={ optionsNote }
                        name='note_type'
                        placeholder='Note Type'
                        onChange={ (e) => setData(prev => ({ ...prev, note_type: e.target.innerText })) }
                        required
                    />
                </Form.Group>
                <Form.Field
                    style={{ height: '10rem' }}
                    control={ TextArea }
                    placeholder='Your Note...'
                    name='note_body'
                    onChange={ (e) => setData(prev => ({ ...prev, [ e.target.name ]: e.target.value })) }
                    required
                />
                <EndButtons />
            </Form>
        )
    }
}

export default NoteForm
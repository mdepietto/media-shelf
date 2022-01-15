import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'
import { useAuth0 } from '@auth0/auth0-react'

import Loader from './Loader'
import NoContent from '../components/NoContent'

const Dropdown = (props) => {

    const { border, name, api, titlePath, library, setLibrary, getData, titles } = props

    const [ loading, setLoading ] = useState(false)
    
    const [ noContent, setNoContent ] = useState(false)

    const userName = useAuth0().user
    
    var sortOptions = [{ key: 0, text: 'Type', value: 0 }, { key:1, text: 'Chapter', value: 1 }]

    if (name === 'movies') sortOptions[1].text = 'Minute'
    if (name === 'shows') sortOptions[1].text = 'Season'

    const newLib = (newData) => {
        setLibrary([])
        newData.map(media => {
            media.note_date = media.note_date.slice(0, 10)
            return setLibrary(prev => [ ...prev, media ])
        })
    }
    
    const onSort = async (e) => {
        const { innerText } = e.target
        if (!innerText) newLib(library.sort((a, b) => (a.id > b.id) ? 1 : -1))
        if (innerText === 'Chapter') newLib(library.sort((a, b) => (a.note_chapter < b.note_chapter) ? 1 : -1))
        if (innerText === 'Minute') newLib(library.sort((a, b) => (a.note_minute < b.note_minute) ? 1 : -1))
        if (innerText === 'Season') newLib(library.sort((a, b) => (a.note_season > b.note_season) ? 1 : -1))
        if (innerText === 'Type') newLib(library.sort((a, b) => (a.note_type > b.note_type) ? 1 : -1))
    }

    const getNotesByTitle = async (title) => {
        setLoading(true)
        setNoContent(false)
        setLibrary([])
        if (!title || title === 'All') {
            setLoading(false)
            return await getData(api)
        }
        const newData = await fetch('/notesByTitle', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ titlePath, title, userName })
        })
        .then(res => res.json())
        if (!newData[0]) setNoContent(true)
        newLib(newData)
        setLoading(false)
    }

    return (
        <div className='selectDrop' style={{ border: `2px solid rgb(${ border })` }}>
        
            { loading && <Loader color={ `rgb(${ border })` } /> }
    
            { noContent && <NoContent style={{ border: `2px solid rgb(${ border })` }} /> }

            <div>
                <Form>
                    <Form.Group width='equal'>
                        <Form.Select
                            clearable
                            options={ sortOptions }
                            name='sortNotes'
                            placeholder='Sort...'
                            onChange={ onSort }
                        />
                    </Form.Group>
                </Form>
            </div>

            <div>
                <Form>
                    <Form.Group width='equal'>
                        <Form.Select
                            clearable
                            options={ titles }
                            name={ name }
                            placeholder='Title...'
                            onChange={ async (e) => {
                                const text = e.target.innerText
                                const newTitle = text.replace(/'/g, "''")
                                getNotesByTitle(newTitle)
                            }}
                        />
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}

export default Dropdown
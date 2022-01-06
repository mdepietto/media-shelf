import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'
import Loader from './Loader'

const Sort = (props) => {

    const [ loading, setLoading ] = useState(false)

    const userName = props.userName

    const options = [
        { key: 0, text: 'Title', value: 0 },
        { key: 1, text: 'Rating', value: 1 }
    ]

    const getLib = async (path) => {
        setLoading(true)
        const newData = await fetch(path, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                userName
            })
        })
        .then(res => res.json())
        newData.map(media => {
            return props.setLib(prev => [ ...prev, media ])
        })
        setLoading(false)
    }

    const onSort = async (e) => {
        const { innerText } = e.target
        props.setLib([])
        if (props.name === 'books') {
            if (!innerText) getLib('/apiBooks')
            if (innerText === 'Title') getLib('/booksByTitle')
            if (innerText === 'Rating') getLib('/booksByRating')
        }
        if (props.name === 'movies') {
            if (!innerText) getLib('/apiMovies')
            if (innerText === 'Title') getLib('/moviesByTitle')
            if (innerText === 'Rating') getLib('/moviesByRating')
        }
        if (props.name === 'shows') {
            if (!innerText) getLib('/apiShows')
            if (innerText === 'Title') getLib('/showsByTitle')
            if (innerText === 'Rating') getLib('/showsByRating')
        }
    }
    
    return (
        <div className='selectDrop' style={{ border: `2px solid rgb(${ props.border })` }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                { loading && <Loader color={ `rgb(${ props.border })` } loading={ loading } /> }
                <h3 style={{ margin: '0 0 15px 0', fontFamily: "'Montagu Slab', serif" }}>Sort by:</h3>
                <Form style={{ display: 'flex', flexDirection: 'row' }}>
                    <Form.Group width='equal'>
                        <Form.Select
                            clearable
                            options={ options }
                            name='sort'
                            placeholder='Sort by'
                            onChange={ onSort }
                        />
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}

export default Sort